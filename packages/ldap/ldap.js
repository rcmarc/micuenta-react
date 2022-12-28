import { Change, createClient } from 'ldapjs';
import options from './options';

const ATTRIBUTES = Object.keys(options.attributesMap);

const userAttr = (ldapAttr) => {
  const attr = {};
  attr[options.attributesMap[ldapAttr.type]] = ldapAttr.val;
  return attr;
};

const encodePwd = (pwd) => Buffer.from(`"${pwd}"`, 'utf16le').toString();

const toUser = (entry) => {
  return entry.attributes
    .filter((attr) => ATTRIBUTES.includes(attr.type))
    .map((attr) => ({ val: attr.vals[0], type: attr.type }))
    .map((attr) => userAttr(attr))
    .reduce((prev, current) => Object.assign(prev, current));
};

const connect = () => {
  return createClient({
    url: options.url,
    reconnect: true,
    tlsOptions: options.tlsOptions,
  });
};

const rootBind = (client, cb) => {
  client.bind(options.bindDN, options.bindCredentials, cb);
};

const searchAccount = ({ client, filter, attributes }, cb) => {
  client.search(
    options.searchBase,
    {
      scope: 'sub',
      filter,
      attributes,
    },
    cb
  );
};

class LdapBadCredentialsError extends Error {
  constructor() {
    super();
    this.name = 'LdapBadCredentialsError';
    this.message = 'Credenciales incorrectas';
  }
}

class LdapPasswordCriteriaError extends Error {
  constructor() {
    super();
    this.name = 'LdapPasswordCriteriaError';
    this.message = 'No ha sido posible cambiar la contraseña';
  }
}

class Ldap {
  constructor() {
    this.client = connect();
  }

  async changePwd(filter, oldPwd, newPwd) {
    const entry = await this.authenticate(filter, oldPwd);
    if (!entry) throw new LdapBadCredentialsError();
    return await new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      rootBind(this.client, (err, res) => {
        if (err) return reject(err);
        this.client.modify(
          entry.object.dn,
          [
            new Change({
              operation: 'delete',
              modification: {
                unicodePwd: encodePwd(oldPwd),
              },
            }),
            new Change({
              operation: 'add',
              modification: {
                unicodePwd: encodePwd(newPwd),
              },
            }),
          ],
          (err) => {
            if (err) return reject(new LdapPasswordCriteriaError());
            return resolve();
          }
        );
      });
    });
  }

  fetchEntry(filter, fetchAttributes) {
    const attributes = fetchAttributes || ATTRIBUTES;
    return new Promise((resolve, reject) => {
      let entry;
      // eslint-disable-next-line no-unused-vars
      rootBind(this.client, (err, res) => {
        if (err) {
          reject(err);
        }

        searchAccount(
          { client: this.client, filter, attributes },
          (err, res) => {
            if (err) {
              reject(err);
            }

            res.on('searchEntry', (e) => {
              entry = e;
            });

            // eslint-disable-next-line no-unused-vars
            res.on('end', (_) => {
              if (entry) {
                resolve(entry);
              } else {
                resolve(null);
              }
            });

            res.on('error', (err) => {
              reject(err);
            });
          }
        );
      });
    });
  }

  async authenticate(filter, password) {
    const entry = await this.fetchEntry(filter, ['mail', 'givenName', 'sn']);

    if (!entry) {
      return null;
    }
    return await new Promise((resolve) => {
      // eslint-disable-next-line no-unused-vars
      this.client.bind(entry.objectName, password, (err, res) => {
        if (err) {
          resolve(null);
        }
        resolve(entry);
      });
    });
  }
}

const ldap = new Ldap();

export { toUser, LdapBadCredentialsError };

export default ldap;
