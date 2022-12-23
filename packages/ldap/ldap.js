import { createClient } from 'ldapjs';
import options from './options';

const ATTRIBUTES = Object.keys(options.attributesMap);

const userAttr = (ldapAttr) => {
  const attr = {};
  attr[options.attributesMap[ldapAttr.type]] = ldapAttr.val;
  return attr;
};

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

class Ldap {
  constructor() {
    this.client = connect();
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

export { toUser };

export default ldap;
