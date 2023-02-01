import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

export function useCallbackUrl() {
  const router = useRouter();
  return router.query.callbackUrl || '/';
}
