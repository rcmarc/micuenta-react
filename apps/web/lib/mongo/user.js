import { database } from './mongo';

const collection = database.collection('users');

async function insertOneIfNotExists(user) {
  return collection
    .findOne({ username: user.username })
    .then(async (exists) => {
      if (!exists) {
        return await insertOne(user);
      }
      return false;
    });
}

async function insertOne(user) {
  return collection.insertOne(user);
}

const instance = {
  insertOne,
  insertOneIfNotExists,
};

export default instance;
