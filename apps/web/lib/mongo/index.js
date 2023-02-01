import users from './user';
import config, { setUpConfig } from './config';
import securityQuestions, { setUpQuestions } from './securityQuestions';
import changePwdUrls, { setUpChangePwdUrls } from './changePwdUrl';

let setup = false;

export const setUpMongo = async () => {
  if (!setup) {
    await Promise.all([setUpQuestions(), setUpConfig(), setUpChangePwdUrls()]);
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
  changePwdUrls,
};

export default mongo;
