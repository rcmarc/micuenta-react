import { signIn } from 'next-auth/react';

import { useLoading } from './loading';
import { ERROR_POPUP, usePopupMessage } from './popup';
import { useCallbackUrl } from './router';
import { timeout } from './timeout';

export function useSignIn(provider) {
  const { setPopupMessage, hidePopup } = usePopupMessage();
  const callbackUrl = useCallbackUrl();
  const { setLoading } = useLoading(false);

  return async (body) => {
    setLoading(true);
    hidePopup();

    console.log('hi');

    const res = await Promise.race([
      timeout(),
      signIn(provider || 'credentials', {
        redirect: false,
        ...body,
      }),
    ]);

    console.log(res);
    if (res.error === 'CredentialsSignin') {
      setPopupMessage({ text: 'Credenciales Incorrectas', type: ERROR_POPUP });
    }

    if (res.ok) {
      window.location.replace(callbackUrl);
    }

    setLoading(false);
  };
}
