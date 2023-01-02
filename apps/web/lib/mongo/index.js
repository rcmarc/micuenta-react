export * from './securityQuestions';
export * from './config';

import { CONFIG_COLL } from './config';
import {
  SECURITY_QUESTIONS_COLL,
  SECURITY_QUESTIONS,
} from './securityQuestions';

let setup = false;

const setUpSecurityQuestions = async () => {
  if ((await SECURITY_QUESTIONS_COLL.countDocuments()) === 0) {
    // insert the security questions
    return SECURITY_QUESTIONS_COLL.insertMany(
      SECURITY_QUESTIONS.map((q, i) => ({ _id: i, text: q }))
    );
  }
};

const setUpConfig = async () => {
  if ((await CONFIG_COLL.countDocuments()) === 0) {
    // insert the config document
    return CONFIG_COLL.insertOne({
      securityQuestionsAmountRequired: 3,
    });
  }
};

const setUpMongo = async () => {
  if (!setup) {
    await Promise.all([setUpSecurityQuestions(), setUpConfig()]);
  }
  setup = true;
};

(async () => {
  await setUpMongo();
})();
