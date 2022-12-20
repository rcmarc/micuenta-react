import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
