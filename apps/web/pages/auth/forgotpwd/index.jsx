import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useRouter } from 'next/router';

import Button from '../../../components/Button';
import Form from '../../../components/Form';
import InputUsername from '../../../components/Input/InputUsername';
import AppLink from '../../../components/Link';
import { useFetch } from '../../../hooks/fetch';
import { usePopupMessage, ERROR_POPUP } from '../../../hooks/popup';
import FormOnlyLayout from '../../../layouts/FormOnlyLayout';

function ForgotPwd() {
  const router = useRouter();
  const fetch = useFetch();
  const { setPopupMessage } = usePopupMessage();

  async function onSubmit({ username }) {
    // check if the user has the securityQuestions setup
    const res = await fetch.get(
      `/api/no-auth/has-questions?username=${username}`
    );
    if (!res.hasQuestions) {
      return setPopupMessage({
        text: res.message,
        type: ERROR_POPUP,
      });
    }

    router.push({
      pathname: 'forgotpwd/change',
      query: { username },
    });
  }

  return (
    <Form onSubmit={onSubmit} resolver={resolver}>
      <InputUsername name="username" />
      <div className="flex items-center justify-between">
        <AppLink href="login">Atrás</AppLink>
        <Button type="submit">Siguiente</Button>
      </div>
    </Form>
  );
}

const resolver = joiResolver(
  Joi.object({
    username: Joi.string().required(),
  }),
  {
    messages: {
      'string.empty': 'Campo requerido',
    },
  }
);

ForgotPwd.getLayout = (page) => (
  <FormOnlyLayout helperText="Por favor, ingrese su nombre de usuario">
    {page}
  </FormOnlyLayout>
);

export default ForgotPwd;
