import ErrorPageComponent from '../components/ErrorPageComponent';

function InternalServerErrorPage() {
  return <ErrorPageComponent code={500} />;
}

export default InternalServerErrorPage;
