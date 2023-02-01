import { useLoading } from './loading';
import { ERROR_POPUP, SUCCESS_POPUP, usePopupMessage } from './popup';
import { timeout } from './timeout';

export function useFetch(showPopup) {
  const { setPopupMessage } = usePopupMessage();
  const { setLoading } = useLoading();

  const doFetch = async ({ url, method, body }) => {
    setLoading(true);

    const response = await Promise.race([
      timeout(),
      fetch(url, getOptions({ method, body })),
    ]);

    const result = await response.json();

    if (result.error && showPopup) {
      setPopupMessage({ text: result.error, type: ERROR_POPUP });
    } else if (showPopup && result.message) {
      setPopupMessage({ text: result.message, type: SUCCESS_POPUP });
    }

    setLoading(false);

    return result;
  };

  const get = (url) => {
    return doFetch({ url, method: 'GET' });
  };

  const post = (url, body) => {
    return doFetch({ url, body, method: 'POST' });
  };

  return {
    get,
    post,
  };
}

function getOptions({ body, method }) {
  const base = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return Object.assign(base, { body: JSON.stringify(body), method });
}
