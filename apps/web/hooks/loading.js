import React, { useContext, useState } from 'react';

import { useRouterEvents } from './router';

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  useRouterEvents({
    routeChangeStart: () => setLoading(true),
    routeChangeComplete: () => setLoading(false),
    routeChangeError: () => setLoading(false),
  });

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

const LoadingContext = React.createContext(null);
