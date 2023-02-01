import { database, isCollectionEmpty } from './mongo';

const collection = database.collection('securityQuestions');

function getAll() {
  return collection.find().toArray();
}

function findOne(filter, projection) {
  return collection.findOne(filter, { projection });
}

const SECURITY_QUESTIONS = [
  'Cuál es su segundo apellido?',
  'Cuál es su número de teléfono?',
  'Cuál es el nombre de su mascota?',
  'Cuál es la ciudad donde nació?',
];

export function setUpQuestions() {
  return isCollectionEmpty(collection).then((isEmpty) => {
    if (isEmpty) {
      collection.insertMany(
        SECURITY_QUESTIONS.map((q, i) => ({ _id: i, text: q }))
      );
    }
  });
}

const instance = { getAll, findOne };

export default instance;
