import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Button from '../../../../components/Button';
import CsrfToken from '../../../../components/CsrfToken';
import Form from '../../../../components/Form';
import InputPassword from '../../../../components/Input/InputPassword';
import AppLink from '../../../../components/Link';
import FormOnlyLayout from '../../../../layouts/FormOnlyLayout';
import mongo from '../../../../lib/mongo';
import csrf from '../../../../lib/csrf';
import { useFetch } from '../../../../hooks/fetch';
import { usePopupMessage } from '../../../../hooks/popup';

let first = true;
function PwdForm({ csrfToken }) {
  const router = useRouter();
  const fetch = useFetch(true);
  const { setPopupMessage, popupMessage } = usePopupMessage();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!popupMessage || first) {
        first = false;
        setPopupMessage({ text: 'Tiene 5 minutos para cambiar la contraseña' });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [setPopupMessage, popupMessage]);

  async function onSubmit(data) {
    const res = await fetch.post(
      `/api/no-auth/changePwd/${router.query.url}`,
      data
    );

    if (!res.error) {
      setPopupMessage({ text: 'Su contraseña fue cambiada de manera exitosa' });
    }
  }

  return (
    <Form onSubmit={onSubmit} defaultValues={{ csrfToken }} resolver={resolver}>
      <InputPassword name="newPwd" placeholder="Nueva Contraseña" />
      <InputPassword name="newPwdRepeat" placeholder="Repita la Contraseña" />
      <CsrfToken name="csrfToken" />
      <div className="flex items-center justify-between">
        <AppLink href="/auth/login">Ir al inicio</AppLink>
        <Button type="submit">Cambiar Contraseña</Button>
      </div>
    </Form>
  );
}

const required = Joi.string().required();
const resolver = joiResolver(
  Joi.object({
    csrfToken: required,
    newPwd: required.pattern(
      /(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&-])[\w\d@$!%*#?&-]{8,}/
    ),
    newPwdRepeat: Joi.ref('newPwd'),
  }),
  {
    abortEarly: false,
    messages: {
      'string.empty': 'Campo requerido',
      'string.pattern.base': 'La contraseña no cumple los requisitos',
      'any.only': 'Las contraseñas no coinciden',
    },
  }
);

PwdForm.getLayout = function (page) {
  return (
    <FormOnlyLayout helperText="Ingrese una nueva contraseña">
      {page}
    </FormOnlyLayout>
  );
};

export async function getServerSideProps({ query }) {
  const savedUrl = await mongo.changePwdUrls.findOne({ url: query.url });
  if (!savedUrl) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: csrf.create(process.env.SECRET_KEY),
    },
  };
}

export default PwdForm;
