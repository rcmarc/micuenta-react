import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ErrorPopup from '../components/ErrorPopup';

export function useRouterEvents(events) {
  const router = useRouter();

  useEffect(() => {
    const entries = Object.entries(events);
    for (const [event, cb] of entries) {
      if (cb) {
        router.events.on(event, cb);
      }
    }

    return () => {
      for (const [event, cb] of entries) {
        router.events.off(event, cb);
      }
    };
  }, [router.events, events]);
}

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  useRouterEvents({
    routeChangeStart: () => {
      setIsLoading(true);
    },
    routeChangeComplete: () => {
      setIsLoading(false);
    },
  });
  return isLoading;
};

const ERRORS = [
  {
    name: 'credentialssignin',
    message: 'Credenciales incorrectas',
  },
];

export const useQueryErrorMessage = () => {
  const { query } = useRouter();
  if (!query.error) {
    return null;
  }

  const error = ERRORS.filter((err) => err.name === query.error.toLowerCase());

  if (error.length > 0) {
    return error[0].message;
  }
  return null;
};

export const useDateLocale = () => {
  return (date, dateStyle = 'long') =>
    new Date(date).toLocaleDateString('es', { dateStyle });
};

export const useLdapToDate = () => {
  return (time) => new Date(time / 1e4 - 1.16444736e13);
};

const UserDataContext = React.createContext(null);

export const UserDataProvider = ({ user, children }) => (
  <UserDataContext.Provider value={user}>{children}</UserDataContext.Provider>
);

export const useUserData = () => useContext(UserDataContext);

const ErrorPopupMessageContext = React.createContext(null);

export const ErrorPopupMessageProvider = ({ children }) => {
  const [errorPopupMessage, setErrorMessage] = useState();
  const [isShowingErrorPopup, setShowingErrorPopup] = useState(false);
  const onClose = () => {
    setShowingErrorPopup(false);
  };
  return (
    <ErrorPopupMessageContext.Provider
      value={{
        errorPopupMessage,
        isShowingErrorPopup,
        setShowingErrorPopup,
        setErrorPopupMessage: (msg) => {
          setShowingErrorPopup(Boolean(msg));
          setErrorMessage(msg);
        },
      }}
    >
      {children}
      <ErrorPopup
        show={isShowingErrorPopup}
        onClose={onClose}
        message={errorPopupMessage}
      />
    </ErrorPopupMessageContext.Provider>
  );
};

export const useErrorPopupMessage = () => {
  return useContext(ErrorPopupMessageContext);
};
