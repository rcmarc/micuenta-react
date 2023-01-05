import users from './user';
import config, { setUpConfig } from './config';
import securityQuestions, { setUpQuestions } from './securityQuestions';

let setup = false;

export const setUpMongo = async () => {
  if (!setup) {
    await Promise.all([setUpQuestions(), setUpConfig()]);
  }
  setup = true;
};

(async () => {
  await setUpMongo();
})();

const mongo = {
  users,
  config,
  securityQuestions,
};

export default mongo;
