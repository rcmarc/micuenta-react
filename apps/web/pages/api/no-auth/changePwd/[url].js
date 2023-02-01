import { ldap } from '@ucfgos/ldap';

import mongo from '../../../../lib/mongo';
import {
  post,
  protectCsrf,
  sendForbidden,
  sendNotFound,
} from '../../../../lib/http';

async function handler(req, res) {
  if (!req.query.url) {
    return sendNotFound(res);
  }
  const savedUrl = await mongo.changePwdUrls.findOne({ url: req.query.url });
  if (!savedUrl) {
    return sendNotFound(res);
  }
  const { newPwd, newPwdRepeat } = req.body;
  if (newPwd !== newPwdRepeat) {
    return sendForbidden(res, 'Las contraseñas no coinciden');
  }
  try {
    await ldap.resetPwd(`sAMAccountName=${savedUrl.username}`, newPwd);
    res.status(200).send({ message: 'Contraseña cambiada exitosamente' });
  } catch (err) {
    res.status(500).send({ error: 'La contraseña no se ha podido cambiar' });
  }
}

export default post(protectCsrf(handler));
