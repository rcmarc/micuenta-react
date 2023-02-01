import { database, isCollectionEmpty } from './mongo';

const collection = database.collection('config');

function get(projection) {
  return collection.findOne({}, { projection: { ...projection, _id: 0 } });
}

export function setUpConfig() {
  return isCollectionEmpty(collection).then(async (isEmpty) => {
    if (isEmpty) {
      await collection.insertOne({
        securityQuestionsRequired: 3,
      });
    }
  });
}

const instance = { get };

export default instance;
