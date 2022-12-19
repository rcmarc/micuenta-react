import MainLayout from '../layouts/MainLayout';

function Profile() {
  return <p>Profile</p>;
}

Profile.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Profile;
