import { database } from './mongo';

const collection = database.collection('users');

async function insertOneIfNotExists(user) {
  const exists = await collection.findOne({ username: user.username });
  if (!exists) {
    return await insertOne(user);
  }
  return false;
}

function insertOne(user) {
  return collection.insertOne(user);
}

function setSecurityQuestions(filter, questions) {
  return collection.updateOne(filter, {
    $set: { securityQuestions: questions },
  });
}

const instance = {
  insertOne,
  insertOneIfNotExists,
  setSecurityQuestions,
};

export default instance;
