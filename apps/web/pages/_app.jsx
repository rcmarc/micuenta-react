import { SessionProvider } from 'next-auth/react';
import { UserDataProvider } from '../hooks';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, user, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      <UserDataProvider user={user}>
        {getLayout(<Component {...pageProps} />)}
      </UserDataProvider>
    </SessionProvider>
  );
}

export default MyApp;
