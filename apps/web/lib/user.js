import { ldap, toUser } from '@ucfgos/ldap';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from '../pages/api/auth/[...nextauth]';

export const getUser = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return toUser(await ldap.fetchEntry(`mail=${session.user.email}`));
};
