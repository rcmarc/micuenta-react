import joi from 'joi';
import { unstable_getServerSession } from 'next-auth';
import { joiResolver } from '@hookform/resolvers/joi';

import AppLink from '../../components/Link';
import FormOnlyLayout from '../../layouts/FormOnlyLayout';
import Form from '../../components/Form';
import InputUsername from '../../components/Input/InputUsername';
import InputPassword from '../../components/Input/InputPassword';
import Button from '../../components/Button';
import { useSignIn } from '../../hooks/auth';
import { authOptions } from '../api/auth/[...nextauth]';

export default function LoginPage() {
  const signIn = useSignIn();

  return (
    <Form onSubmit={signIn} resolver={resolver}>
      <InputUsername name="username" />
      <InputPassword name="password" />
      <div className="flex items-center justify-between">
        <AppLink href="forgotpwd">Olvidó su contraseña?</AppLink>
        <Button type="submit">Iniciar Sesión</Button>
      </div>
    </Form>
  );
}

const required = joi.string().required();

const resolver = joiResolver(
  joi.object({
    username: required,
    password: required,
  }),
  {
    abortEarly: false,
    messages: {
      'string.empty': 'Campo requerido',
    },
  }
);

export async function getServerSideProps(context) {
  const token = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

LoginPage.getLayout = (page) => (
  <FormOnlyLayout helperText="Por favor, inicie sesión para continuar">
    {page}
  </FormOnlyLayout>
);
