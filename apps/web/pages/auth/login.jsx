import joi from 'joi';
import { getCsrfToken } from 'next-auth/react';
import { unstable_getServerSession } from 'next-auth';
import { joiResolver } from '@hookform/resolvers/joi';

import AppLink from '../../components/Link';
import FormOnlyLayout from '../../layouts/FormOnlyLayout';
import Form from '../../components/Form';
import InputUsername from '../../components/Input/InputUsername';
import InputPassword from '../../components/Input/InputPassword';
import CsrfToken from '../../components/CsrfToken';
import Button from '../../components/Button';
import { useSignIn } from '../../hooks/auth';
import { authOptions } from '../api/auth/[...nextauth]';

export default function LoginPage({ csrfToken }) {
  const signIn = useSignIn();

  return (
    <Form onSubmit={signIn} defaultValues={{ csrfToken }} resolver={resolver}>
      <InputUsername name="username" />
      <InputPassword name="password" />
      <CsrfToken name="csrfToken" />
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
    csrfToken: required,
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
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

LoginPage.getLayout = (page) => (
  <FormOnlyLayout helperText="Por favor, inicie sesión para continuar">
    {page}
  </FormOnlyLayout>
);
