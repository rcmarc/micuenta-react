import { MongoClient } from 'mongodb';

const uri = `mongodb://${process.env.MONGODB_ROOT_USER}:${process.env.MONGODB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
export const database = client.db('micuenta');

export function isCollectionEmpty(coll) {
  return coll.countDocuments().then((count) => count === 0);
}
