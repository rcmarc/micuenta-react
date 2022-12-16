import { useEffect, useState } from 'react';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { unstable_getServerSession } from 'next-auth';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import { authOptions } from '../api/auth/[...nextauth]';
import FormOnlyLayout from '../../layouts/FormOnlyLayout';
import InputUsername from '../../components/InputUsername';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import InputPassword from '../../components/InputPassword';
import CsrfToken from '../../components/CsrfToken';
import Button from '../../components/Button';
import IndeterminateProgressBar from '../../components/IndeterminateProgressBar';
import QueryErrorMessage from '../../components/QueryErrorMessage';

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

export default function LoginPage({ csrfToken }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      csrfToken,
    },
  });

  const onSubmit = (body) => {
    setIsLoading(true);

    signIn('credentials', body);
  };

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  return (
    <>
      {isLoading ? <IndeterminateProgressBar /> : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CsrfToken {...register('csrfToken')} />
        <InputGroup groupName="Credenciales">
          <InputUsername {...register('username')} error={errors.username} />
          <InputPassword {...register('password')} error={errors.password} />
        </InputGroup>
        <div className="flex justify-between">
          <QueryErrorMessage className="pt-2" />
          <Button type="submit">Iniciar Sesión</Button>
        </div>
      </Form>
    </>
  );
}

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
