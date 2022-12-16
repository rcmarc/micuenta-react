import { createClient } from 'ldapjs';
import options from './options';

const ATTRIBUTES = Object.keys(options.attributesMap);

const userAttr = (ldapAttr) => {
  const attr = {};
  attr[options.attributesMap[ldapAttr.type]] = ldapAttr.val;
  return attr;
};

const toUser = (entry) =>
  entry.attributes
    .filter((attr) => ATTRIBUTES.includes(attr.type))
    .map((attr) => ({ val: attr.vals[0], type: attr.type }))
    .map((attr) => userAttr(attr))
    .reduce((prev, current) => Object.assign(prev, current));

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

const searchAccount = ({ client, sAMAccountName, attributes }, cb) => {
  client.search(
    options.searchBase,
    {
      filter: `sAMAccountName=${sAMAccountName}`,
      scope: 'sub',
      attributes,
    },
    cb
  );
};

class Ldap {
  constructor() {
    this.client = connect();
  }

  fetchEntry(sAMAccountName, fetchAttributes = true) {
    const attributes = fetchAttributes ? ATTRIBUTES : ['mail'];
    return new Promise((resolve, reject) => {
      let entry;
      // eslint-disable-next-line no-unused-vars
      rootBind(this.client, (err, res) => {
        if (err) {
          reject(err);
        }

        searchAccount(
          { client: this.client, sAMAccountName, attributes },
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

  async authenticate(sAMAccountName, password) {
    const entry = await this.fetchEntry(sAMAccountName, false);
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
