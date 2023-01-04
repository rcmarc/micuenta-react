import { database, isCollectionEmpty } from './mongo';

const collection = database.collection('config');
let config = {};

async function get(projection) {
  // check the config cache is empty
  // if it is then get the data from mongo and cache
  if (Object.keys(config).length === 0) {
    config = await collection.findOne({});
  }

  // if no projection fields are passed then simply return all fields
  if (!projection || Object.keys(projection).length === 0) {
    return this.config;
  }

  // Then return the fields with a mongo similar projection functionality
  let fieldsProjected = getPositiveProjection(projection);

  if (fieldsProjected.length > 0) {
    return getConfigOf(fieldsProjected);
  }

  fieldsProjected = getNonPositiveProjection(projection);

  return getInverseConfigOf(fieldsProjected);
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

function getPositiveProjection(projection) {
  return getProjection(projection, (value) => value > 0);
}

function getNonPositiveProjection(projection) {
  return getProjection(projection, (value) => value <= 0);
}

function getProjection(projection, condition) {
  return Object.entries(projection)
    .filter(([, value]) => condition(value))
    .map(([key]) => key);
}

function getConfigOf(fields) {
  return Object.fromEntries(
    Object.entries(config).filter(([key]) => fields.includes(key))
  );
}

function getInverseConfigOf(fields) {
  return Object.fromEntries(
    Object.entries(config).filter(([key]) => !fields.includes(key))
  );
}

const instance = { get };

export default instance;
