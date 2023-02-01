import { database } from './mongo';

const collection = database.collection('changePwdUrls');

export function setUpChangePwdUrls() {
  // expire URLs after 5 min
  return collection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 5 * 60 }
  );
}

function insertOne(obj) {
  return collection.insertOne({ createdAt: new Date(), ...obj });
}

function findOne(filter) {
  return collection.findOne(filter, { projection: { _id: 0 } });
}

const instance = {
  insertOne,
  findOne,
};

export default instance;
