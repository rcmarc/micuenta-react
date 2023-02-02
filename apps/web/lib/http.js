import csrf from './csrf';

export function sendInternalServerError(res) {
  res.status(500).send({ error: 'Error interno en el servidor' });
}

export function sendBadRequest(res) {
  res.status(400).send({ error: 'Petición Inválida' });
}

export function sendNotFound(res) {
  res.status(404).send({ error: 'Not Found' });
}

export function sendForbidden(res, message) {
  res.status(403).send({ error: message || 'Forbidden' });
}

export function sendMethodNotAllowed(res) {
  res.status(405).send({ error: 'Method not allowed' });
}

export function protectCsrf(next) {
  return async function (req, res) {
    if (
      !req.body.csrfToken ||
      !csrf.verify(process.env.SECRET_KEY, req.body.csrfToken)
    ) {
      return sendForbidden(res);
    }
    return next(req, res);
  };
}

export function get(next) {
  return method('GET', next);
}

export function post(next) {
  return method('POST', next);
}

function method(method, next) {
  return function (req, res) {
    if (req.method === method) {
      return next(req, res);
    }
    sendMethodNotAllowed(res);
  };
}

export function readQuestionsFromBody(body) {
  return (
    Object.entries(body)
      // Keep only the questions and answers from the request body
      .filter(([key]) => key.startsWith('question') || key.startsWith('answer'))

      // Map entries to --> [{questionId: <n>}, {answer: <text>}]
      .map(([key, value]) => {
        if (key.startsWith('question')) return { questionId: value };
        return { answer: value };
      })

      // Finally reduce to [{questionId: <n>, answer: <text>}]
      .reduce((array, current) => {
        if (Object.prototype.hasOwnProperty.call(current, 'questionId')) {
          return array.concat(current);
        }

        Object.assign(array[array.length - 1], current);
        return array;
      }, [])
  );
}
