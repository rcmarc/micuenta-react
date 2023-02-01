import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { ldap, toUser } from '@ucfgos/ldap';

import mongo from '../../../lib/mongo';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      // eslint-disable-next-line no-unused-vars
      async authorize(credentials, req) {
        if (!credentials.username || !credentials.password) {
          return null;
        }

        const ldapUser = await ldap.authenticate(
          `sAMAccountName=${credentials.username}`,
          credentials.password
        );

        if (ldapUser) {
          const user = toUser(ldapUser);
          user.name = `${user.firstName} ${user.lastName}`;
          await mongo.users.insertOneIfNotExists(user);
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/500',
  },
};

export default NextAuth(authOptions);
