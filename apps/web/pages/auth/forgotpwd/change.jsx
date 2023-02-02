import { useRouter } from 'next/router';

import AppLink from '../../../components/Link';
import SecurityQuestionsForm from '../../../components/SecurityQuestionsForm';
import FormOnlyLayout from '../../../layouts/FormOnlyLayout';
import { useFetch } from '../../../hooks/fetch';
import { getUserSecurityQuestions } from '../../../lib/mongo/utils';
import csrf from '../../../lib/csrf';

function Change({ csrfToken, securityQuestions }) {
  const fetch = useFetch(true);
  const router = useRouter();
  async function onSubmit(data) {
    const username = router.query.username;
    const res = await fetch.post(
      `/api/no-auth/answer-questions?username=${username}`,
      data
    );
    if (!res.error) {
      router.push(`/auth/forgotpwd/pwdform/${res.url}`);
    }
  }
  return (
    <div className="w-full">
      <SecurityQuestionsForm
        onSubmit={onSubmit}
        csrfToken={csrfToken}
        securityQuestions={securityQuestions}
        securityQuestionsRequired={securityQuestions.length}
      />
      <AppLink href="/auth/login">Volver al inicio</AppLink>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const securityQuestions = await getUserSecurityQuestions({
    username: ctx.query.username,
  });
  return {
    props: {
      securityQuestions,
      csrfToken: csrf.create(process.env.SECRET_KEY),
    },
  };
}

Change.getLayout = function (page) {
  return (
    <FormOnlyLayout helperText="Responda las preguntas">{page}</FormOnlyLayout>
  );
};

export default Change;
