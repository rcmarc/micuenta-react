import MainLayout from '../layouts/MainLayout';

function Home() {
  return <p>Home</p>;
}

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Home;
