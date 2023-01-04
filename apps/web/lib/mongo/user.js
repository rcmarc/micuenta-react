import { MongoServerError } from 'mongodb';
import { database } from './mongo';

const collection = database.collection('users');

async function insertOneIfNotExists(user) {
  try {
    return await insertOne(user);
  } catch (err) {
    if (err instanceof MongoServerError) {
      return false;
    }
    throw err;
  }
}

async function insertOne(user) {
  return collection.insertOne(user);
}

const instance = {
  insertOne,
  insertOneIfNotExists,
};

export default instance;
