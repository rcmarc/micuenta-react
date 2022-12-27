import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';

import FormOnlyLayout from '../../layouts/FormOnlyLayout';
import InputUsername from '../../components/InputUsername';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';
import IndeterminateProgressBar from '../../components/IndeterminateProgressBar';
import QueryErrorMessage from '../../components/QueryErrorMessage';

const required = joi.string().required();

const resolver = joiResolver(
  joi.object({
    // csrfToken: required,
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver,
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
        <InputGroup groupName="Credenciales">
          <InputUsername {...register('username')} error={errors.username} />
          <InputPassword {...register('password')} error={errors.password} />
        </InputGroup>
        <div className="flex justify-between">
          <QueryErrorMessage className="pt-2" />
          <Button className={'p-2'} type="submit">
            Iniciar Sesión
          </Button>
        </div>
      </Form>
    </>
  );
}

LoginPage.getLayout = (page) => (
  <FormOnlyLayout helperText="Por favor, inicie sesión para continuar">
    {page}
  </FormOnlyLayout>
);
