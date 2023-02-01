import { SessionProvider } from 'next-auth/react';

import { LoadingProvider } from '../hooks/loading';
import { PopupMessageProvider } from '../hooks/popup';
import { UserDataProvider } from '../hooks/user';

import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, user, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <UserDataProvider user={user}>
        <LoadingProvider>
          <PopupMessageProvider>
            {getLayout(<Component {...pageProps} />)}
          </PopupMessageProvider>
        </LoadingProvider>
      </UserDataProvider>
    </SessionProvider>
  );
}

export default MyApp;
