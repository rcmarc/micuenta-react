import MainLayout from '../layouts/MainLayout';

function About() {
  return <p>About</p>;
}

About.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default About;
