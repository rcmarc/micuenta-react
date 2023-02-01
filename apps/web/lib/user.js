import { ldap, toUser } from '@ucfgos/ldap';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from '../pages/api/auth/[...nextauth]';
import { getUserSecurityQuestions } from './mongo/utils';

export const getUser = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return toUser(await ldap.fetchEntry(`mail=${session.user.email}`));
};

export async function getActionsToDoFor(user) {
  const actions = [];
  const questions = await getUserSecurityQuestions({ username: user.username });
  if (questions.length === 0) {
    actions.push({
      name: 'No ha configurado las preguntas de seguridad',
      description:
        'Para poder recuperar la contraseña en caso de que la haya olvidado, debe configurar primero las preguntas de seguridad',
      href: '/security/questions',
    });
  }
  return actions;
}
