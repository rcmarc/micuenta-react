import fs from 'fs';

const LDAP_KEY_PATH = process.env.LDAP_KEY_PATH;
const LDAP_CERT_PATH = process.env.LDAP_CERT_PATH;
const ATTRIBUTES_MAP = {
  sAMAccountName: 'username',
  mail: 'email',
  displayName: 'name',
  givenName: 'firstName',
  accountExpires: 'accountExpirationDate',
  sn: 'lastName',
  title: 'title',
  streetAddress: 'address',
  co: 'country',
  company: 'area',
  lastLogonTimestamp: 'lastLogonTimestamp',
  postOfficeBox: 'ic',
  st: 'state',
  department: 'department',
  telephoneNumber: 'telephoneNumber',
  l: 'city',
  pwdLastSet: 'pwdLastSet',
  'msDS-UserPasswordExpiryTimeComputed': 'pwdExpirationDate',
};

const options = {
  url: process.env.LDAP_HOST,
  bindDN: process.env.LDAP_BIND_DN,
  bindCredentials: process.env.LDAP_BIND_PASSWORD,
  searchBase: process.env.LDAP_SEARCH_BASE,
  tlsOptions: {
    key: LDAP_KEY_PATH ? fs.readFileSync(LDAP_KEY_PATH) : null,
    cert: LDAP_CERT_PATH ? fs.readFileSync(LDAP_CERT_PATH) : null,
    rejectUnauthorized: Boolean(Number(process.env.LDAP_REJECT_UNAUTHORIZED)),
  },
  attributesMap: ATTRIBUTES_MAP,
};

export default options;
