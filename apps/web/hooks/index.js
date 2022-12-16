import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useRouterEvents(events) {
  const router = useRouter();

  useEffect(() => {
    for (const [event, cb] of Object.entries(events)) {
      if (cb) {
        router.events.on(event, cb);
      }
    }

    return () => {
      for (const eventName of Object.keys(events)) {
        router.events.off(eventName);
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
