import { unstable_getServerSession } from 'next-auth';

import mongo from '../../../lib/mongo';
import { authOptions } from '../auth/[...nextauth]';
import {
  post,
  protectCsrf,
  sendBadRequest,
  sendInternalServerError,
} from '../../../lib/http';

async function handler(req, res) {
  // --- Save the security questions for the authenticated user ---

  const qArray = Object.entries(req.body)
    // Keep only the questions and answers from the request body
    .filter(([key]) => key.startsWith('question') || key.startsWith('answer'))

    // Map entries to --> [{questionId: <n>}, {answer: <text>}]
    .map(([key, value]) => {
      if (key.startsWith('question')) return { questionId: value };
      return { answer: value };
    })

    // Finally reduce to [{questionId: <n>, answer: <text>}]
    .reduce((array, current) => {
      if (Object.prototype.hasOwnProperty.call(current, 'questionId')) {
        return array.concat(current);
      }

      Object.assign(array[array.length - 1], current);
      return array;
    }, []);

  // Get the amount of questions required
  const { securityQuestionsRequired } = await mongo.config.get({
    securityQuestionsRequired: 1,
  });

  // Send a Bad Request response if there are duplicated questions
  // and if the length is different from the amount of questions required
  if (
    new Set(qArray.map((q) => q.questionId)).size !== qArray.length ||
    qArray.length !== securityQuestionsRequired
  ) {
    return sendBadRequest(res);
  }

  // Save the questions for the authenticated user
  try {
    const { user } = await unstable_getServerSession(req, res, authOptions);
    await mongo.users.setSecurityQuestions({ email: user.email }, qArray);
    return res.send({ message: 'Las respuestas se guardaron exitósamente' });
  } catch (err) {
    return sendInternalServerError(res);
  }
}

export default post(protectCsrf(handler));
