import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { getCsrfToken, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import CsrfToken from '../../components/CsrfToken';
import Form from '../../components/Form';
import InputGroup from '../../components/InputGroup';
import InputPassword from '../../components/InputPassword';
import QueryErrorMessage from '../../components/QueryErrorMessage';
import MainLayout from '../../layouts/MainLayout';
import { useState } from 'react';
import Responsive from '../../components/Responsive';

const messages = {
  currentPwd: ['Debe ser su contraseña actual'],
  newPwd: [
    'La contraseña debe tener una letra mayúscula un dígito y un caracter especial',
    'No debe ser alguna usada anteriormente',
  ],
  newPwdRepeat: ['Debe coincidir con la contraseña nueva'],
};

const required = Joi.string().required();

const resolver = joiResolver(
  Joi.object({
    csrfToken: required,
    currentPwd: required,
    newPwd: required.pattern(
      /(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&-])[\w\d@$!%*#?&-]{8,}/
    ),
    newPwdRepeat: Joi.ref('newPwd'),
  }),
  {
    abortEarly: false,
    messages: {
      'string.empty': 'Campo requerido',
      'string.pattern.base': 'La contraseña no cumple con los requerimientos',
      'any.only': 'Las contraseñas no coinciden',
    },
  }
);

const ChangePasswordContainer = ({ children }) => (
  <div className="my-5 rounded-lg border p-5 shadow-sm md:my-0">{children}</div>
);

const ErrorPopup = ({ show, onClose, children }) => {
  const location = show ? 'bottom-10' : 'bottom-[-20%]';
  return (
    <div className={`fixed z-10 ${location} w-screen transition-[bottom]`}>
      <div
        className={`mx-auto flex max-w-max rounded-3xl border-pink-400 bg-pink-400 p-3 text-white`}
      >
        {children}
        <button
          onClick={onClose}
          className="ml-2 rounded-full px-2 font-semibold transition-[color_background-color] hover:bg-white hover:text-pink-400"
        >
          X
        </button>
      </div>
    </div>
  );
};

function ChangePassword({ csrfToken }) {
  const [responseError, setResponseError] = useState();
  const [showPopup, setShowPopup] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      csrfToken,
    },
  });

  const onSubmit = async (body) => {
    // Hide popup
    if (showPopup) setShowPopup(false);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const response = await fetch('/api/security/changepwd', options);

    if (response.status === 200) {
      return signOut({ callbackUrl: '/auth/login' });
    }

    // Handle error
    const result = await response.json();

    console.log(result);
    setResponseError(result.message);
    setShowPopup(true);
  };

  return (
    <>
      <ErrorPopup show={showPopup} onClose={() => setShowPopup(false)}>
        {responseError}
      </ErrorPopup>
      <ChangePasswordContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CsrfToken {...register('csrfToken')} />
          <InputGroup groupName="Cambiar contraseña">
            <InputPassword
              {...register('currentPwd')}
              placeholder="Contraseña actual"
              error={errors.currentPwd}
              messages={messages.currentPwd}
            />
            <InputPassword
              {...register('newPwd')}
              placeholder="Contraseña nueva"
              error={errors.newPwd}
              messages={messages.newPwd}
            />
            <InputPassword
              {...register('newPwdRepeat')}
              placeholder="Repita la contraseña"
              error={errors.newPwdRepeat}
              messages={messages.newPwdRepeat}
            />
          </InputGroup>
          <div className="flex justify-between">
            <QueryErrorMessage className="pt-2" />
            <Button className={'p-2'} type="submit">
              Cambiar Contraseña
            </Button>
          </div>
        </Form>
      </ChangePasswordContainer>
    </>
  );
}

ChangePassword.getLayout = (page) => (
  <MainLayout>
    <Responsive>{page}</Responsive>
  </MainLayout>
);

export default ChangePassword;

export const getServerSideProps = async (context) => ({
  props: {
    csrfToken: await getCsrfToken(context),
  },
});
