import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { getCsrfToken, signOut } from 'next-auth/react';

import Button from '../../components/Button';
import CsrfToken from '../../components/CsrfToken';
import Form from '../../components/Form';
import InputPassword from '../../components/Input/InputPassword';
import MainLayout from '../../layouts/MainLayout';
import Responsive from '../../components/Responsive';
import { useFetch } from '../../hooks/fetch';

function ChangePassword({ csrfToken }) {
  const fetch = useFetch(true);

  const onSubmit = async (body) => {
    const response = await fetch.post('/api/security/changepwd', body);

    if (response.status === 200) {
      return signOut({ callbackUrl: '/auth/login' });
    }
  };

  return (
    <div className="my-5 rounded-lg border p-5 shadow-sm md:my-0">
      <Form
        onSubmit={onSubmit}
        resolver={resolver}
        defaultValues={{ csrfToken }}
      >
        <InputPassword
          name="currentPwd"
          placeholder="Contraseña actual"
          messages={messages.currentPwd}
        />
        <InputPassword
          name="newPwd"
          placeholder="Contraseña nueva"
          messages={messages.newPwd}
        />
        <InputPassword
          name="newPwdRepeat"
          placeholder="Repita la contraseña"
          messages={messages.newPwdRepeat}
        />
        <CsrfToken name="csrfToken" />
        <div className="flex justify-end">
          <Button type="submit">Cambiar Contraseña</Button>
        </div>
      </Form>
    </div>
  );
}

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
