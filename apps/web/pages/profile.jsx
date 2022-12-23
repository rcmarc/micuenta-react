import { ldap, toUser } from '@ucfgos/ldap';
import { unstable_getServerSession } from 'next-auth';

import MainLayout from '../layouts/MainLayout';
import { authOptions } from './api/auth/[...nextauth]';

function Profile() {
  return <p>Profile</p>;
}

Profile.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Profile;

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const user = toUser(await ldap.fetchEntry(`mail=${session.user.email}`));
  return {
    props: { user },
  };
};
