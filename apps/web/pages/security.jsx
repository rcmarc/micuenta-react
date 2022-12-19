import MainLayout from '../layouts/MainLayout';

function Security() {
  return <p>Security</p>;
}

Security.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Security;
