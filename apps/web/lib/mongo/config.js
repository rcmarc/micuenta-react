import { database } from './mongo';

export const CONFIG_COLL = database.collection('config');

export const getConfig = () => {
  return CONFIG_COLL.findOne({}, { projection: { _id: 0 } });
};
