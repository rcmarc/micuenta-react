import Link from 'next/link';
import { MdCheckCircle, MdInfo } from 'react-icons/md';

import Card from '../components/Card';
import MainLayout from '../layouts/MainLayout';
import { useUserData } from '../hooks/user';
import { getActionsToDoFor, getUser } from '../lib/user';

function Home({ actions }) {
  const user = useUserData();
  return (
    <div className="mx-auto mt-5 flex w-11/12 flex-col items-center md:w-10/12 lg:w-8/12 xl:w-7/12">
      <h1 className="text-4xl font-thin">Bienvenido {user.firstName}</h1>
      <p className="my-5 text-center">
        Esta es el sitio web donde puede administrar su cuenta de la Universidad
      </p>

      {actions.length === 0 && (
        <Card>
          <div className="flex">
            <MdCheckCircle className="mr-2 text-3xl text-green-500" />
            <h2 className="text-center text-lg">
              Todo parece estar bien con su cuenta
            </h2>
          </div>
        </Card>
      )}

      {actions.map((action, index) => (
        <Card key={index}>
          <div className="flex">
            <MdInfo className="mr-2 text-3xl text-slate-700" />
            <h2 className="text-center text-lg">{action.name}</h2>
          </div>
          <p className="mt-3 mb-10 text-slate-700">{action.description}</p>
          <Link
            href={action.href}
            className="mt-5 rounded-lg border-2 border-sky-500 px-4 py-1 font-medium transition-colors hover:bg-sky-500 hover:text-white active:bg-sky-300"
          >
            Ir
          </Link>
        </Card>
      ))}
    </div>
  );
}

Home.getLayout = function (page) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  const actions = await getActionsToDoFor(user);
  return {
    props: { user, actions },
  };
};

export default Home;
