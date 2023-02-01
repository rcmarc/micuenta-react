import React, { useContext, useState } from 'react';

import Popup from '../components/Popup';
import { useLoading } from './loading';
import { useRouterEvents } from './router';

export function PopupMessageProvider({ children }) {
  const [popupMessage, setPopupMessage] = useState({
    type: SUCCESS_POPUP,
    text: 'Initial',
  });
  const [show, setShow] = useState(false);
  const { loading } = useLoading();

  useRouterEvents({
    routeChangeStart: () => hidePopup(),
  });

  function hidePopup() {
    setShow(false);
  }

  if (loading && show) {
    hidePopup();
  }

  return (
    <PopupMessageContext.Provider
      value={{
        popupMessage,
        hidePopup,
        setPopupMessage: (msg) => {
          setShow(true);
          setPopupMessage(Object.assign({ type: SUCCESS_POPUP }, msg));
        },
      }}
    >
      {children}
      <Popup show={show} onClose={() => hidePopup()} message={popupMessage} />
    </PopupMessageContext.Provider>
  );
}

export function usePopupMessage() {
  return useContext(PopupMessageContext);
}

const PopupMessageContext = React.createContext(null);
export const SUCCESS_POPUP = 'SUCCESS';
export const ERROR_POPUP = 'ERROR';
