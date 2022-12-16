import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { ldap, toUser } from '@ucfgos/ldap';

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
          credentials.username,
          credentials.password
        );

        if (ldapUser) {
          return toUser(ldapUser);
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/500',
  },
  secret: process.env.SECRET_KEY,
};

export default NextAuth(authOptions);
