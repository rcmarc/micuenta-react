import Error from '../components/Error';

function InternalServerErrorPage() {
  return <Error code={500} />;
}

export default InternalServerErrorPage;
