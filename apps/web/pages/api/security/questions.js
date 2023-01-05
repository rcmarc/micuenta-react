import { unstable_getServerSession } from 'next-auth';
import mongo from '../../../lib/mongo';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const { securityQuestionsRequired } = await mongo.config.get({
    securityQuestionsRequired: 1,
  });

  const obj = Object.entries(req.body)
    .filter(([key]) => key.startsWith('question') || key.startsWith('answer'))
    .reduce((p, c) => reduceQuestions(p, c), Array(securityQuestionsRequired));

  if (obj.length !== securityQuestionsRequired) {
    return res.status(400).send();
  }

  const { user } = await unstable_getServerSession(req, res, authOptions);

  try {
    await mongo.users.setSecurityQuestions({ email: user.email }, obj);
    return res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
}

function reduceQuestions(p, c) {
  const newObj = {};
  const questionIndex = parseInt(c[0][c[0].length - 1]);
  if (c[0].startsWith('question')) {
    newObj['questionId'] = c[1];
  } else {
    newObj['answer'] = c[1];
  }
  p[questionIndex] = Object.assign({}, p[questionIndex], newObj);
  return p;
}
