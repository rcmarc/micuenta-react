import { SessionProvider } from 'next-auth/react';
import { UserDataProvider } from '../lib/user';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <UserDataProvider user={pageProps.user}>
        {getLayout(<Component {...pageProps} />)}
      </UserDataProvider>
    </SessionProvider>
  );
}

export default MyApp;
