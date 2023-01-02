import { database } from './mongo';

export const SECURITY_QUESTIONS = [
  'Cuál es su segundo apellido?',
  'Cuál es su número de teléfono?',
  'Cuál es el nombre de su mascota?',
  'Cuál es la ciudad donde nació?',
];

export const SECURITY_QUESTIONS_COLL = database.collection('securityQuestions');

export const getSecurityQuestions = () => SECURITY_QUESTIONS_COLL.find();
