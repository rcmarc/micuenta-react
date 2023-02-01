import crypto from 'crypto';

import mongo from '../../../lib/mongo';
import { post, readQuestionsFromBody, sendForbidden } from '../../../lib/http';
import { getUserSecurityQuestions } from '../../../lib/mongo/utils';

async function handler(req, res) {
  const savedQuestions = await getUserSecurityQuestions({
    username: req.query.username,
  });

  const bodyQuestions = readQuestionsFromBody(req.body);

  const allCorrect = savedQuestions.every((savedQ) => {
    const match = bodyQuestions.find((bodyQ) => {
      return bodyQ.questionId === savedQ.questionId;
    });
    return match && savedQ.answer === match.answer;
  });

  if (!allCorrect) {
    return sendForbidden(res, 'Respuestas incorrectas');
  }

  const url = {
    url: crypto.randomUUID(),
    username: req.query.username,
  };

  await mongo.changePwdUrls.insertOne(url);

  res.status(200).send(url);
}

export default post(handler);
