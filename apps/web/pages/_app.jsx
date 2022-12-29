import { SessionProvider } from 'next-auth/react';

import { ErrorPopupMessageProvider, UserDataProvider } from '../hooks';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, user, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <UserDataProvider user={user}>
        <ErrorPopupMessageProvider>
          {getLayout(<Component {...pageProps} />)}
        </ErrorPopupMessageProvider>
      </UserDataProvider>
    </SessionProvider>
  );
}

export default MyApp;
