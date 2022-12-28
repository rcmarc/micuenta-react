import { ldap } from '@ucfgos/ldap';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const { user } = await unstable_getServerSession(req, res, authOptions);
  try {
    await ldap.changePwd(
      `mail=${user.email}`,
      req.body.currentPwd,
      req.body.newPwd
    );
  } catch (err) {
    return res.status(403).json(err);
  }
  return res.status(200);
}
