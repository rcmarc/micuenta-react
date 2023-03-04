import { useRouter } from 'next/router';

import AppLink from '../../../components/Link';
import SecurityQuestionsForm from '../../../components/SecurityQuestionsForm';
import FormOnlyLayout from '../../../layouts/FormOnlyLayout';
import { useFetch } from '../../../hooks/fetch';
import csrf from '../../../lib/csrf';
import mongo from '../../../lib/mongo';

function Change({ csrfToken, securityQuestions, securityQuestionsRequired }) {
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
        securityQuestionsRequired={securityQuestionsRequired}
      />
      <AppLink href="/auth/login">Volver al inicio</AppLink>
    </div>
  );
}

export async function getServerSideProps() {
  const securityQuestions = await mongo.securityQuestions.getAll();
  const { securityQuestionsRequired } = await mongo.config.get({
    securityQuestionsRequired: 1,
  });
  return {
    props: {
      securityQuestions,
      securityQuestionsRequired,
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
