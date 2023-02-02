import mongo from '../../../lib/mongo';
import { get, sendBadRequest } from '../../../lib/http';

async function handler(req, res) {
  // endpoint that returns whether the user has set up the security questions or not
  if (!req.query.username) {
    return sendBadRequest();
  }
  const mongoUser = await mongo.users.findOne(
    { username: req.query.username },
    { securityQuestions: 1 }
  );

  if (
    mongoUser &&
    mongoUser.securityQuestions &&
    mongoUser.securityQuestions.length > 0
  ) {
    return res.status(200).send({ hasQuestions: true });
  }

  res.status(200).send({
    hasQuestions: false,
    message: 'El usuario no tiene las preguntas de seguridad configuradas',
  });
}

export default get(handler);
