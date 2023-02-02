import React from 'react';

import Card from '../../components/Card';
import SecurityQuestionsForm from '../../components/SecurityQuestionsForm';
import MainLayout from '../../layouts/MainLayout';
import mongo from '../../lib/mongo';
import { useFetch } from '../../hooks/fetch';
import csrf from '../../lib/csrf';

function SecurityQuestions({
  csrfToken,
  securityQuestions,
  securityQuestionsRequired,
}) {
  const fetch = useFetch(true);

  function onSubmit(body) {
    fetch.post('/api/security/questions', body);
  }

  return (
    <div className="mx-auto mt-10 w-10/12 md:w-9/12 lg:w-7/12 xl:w-6/12">
      <Card>
        <p>
          Usted debe responder a cada pregunta y guardar bien sus respuestas,
          estas le serviran para recuperar la contraseña si se le olvida
        </p>
      </Card>
      <div className="mt-5 rounded-lg border-2 p-5 shadow-sm">
        <SecurityQuestionsForm
          onSubmit={onSubmit}
          csrfToken={csrfToken}
          securityQuestions={securityQuestions}
          securityQuestionsRequired={securityQuestionsRequired}
        />
      </div>
    </div>
  );
}

SecurityQuestions.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default SecurityQuestions;

export async function getServerSideProps() {
  const config = await mongo.config.get({ securityQuestionsRequired: 1 });
  return {
    props: {
      securityQuestions: await mongo.securityQuestions.getAll(),
      csrfToken: csrf.create(process.env.SECRET_KEY),
      ...config,
    },
  };
}
