import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { getCsrfToken } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import CsrfToken from '../../components/CsrfToken';
import Form from '../../components/Form';
import Input from '../../components/Input';
import InputGroup from '../../components/InputGroup';
import InputSelect from '../../components/InputSelect';
import Responsive from '../../components/Responsive';
import { useFetch } from '../../hooks';
import MainLayout from '../../layouts/MainLayout';
import mongo from '../../lib/mongo';

const SecurityQuestionsContainer = ({ children }) => (
  <div className="relative my-5 h-[290px] overflow-hidden rounded-lg border p-5 shadow-sm md:my-0">
    {children}
  </div>
);

const Question = ({ show, children }) => {
  const left = show ? 'left-5' : '-left-[90%]';
  return (
    <div
      className={`absolute ${left} top-10 z-10 w-[90%] transition-[left] duration-700 [&>div]:mb-7`}
    >
      {children}
    </div>
  );
};

const QuestionIndex = ({ index }) => (
  <h2 className="mt-5 mb-2">Pregunta {index}</h2>
);

const Options = ({ values }) => {
  return values.map((q, i) => (
    <option key={i} value={q._id}>
      {q.text}
    </option>
  ));
};

const FormButtons = ({ isLast, onBack }) => (
  <div className="absolute bottom-3 flex w-[90%] justify-between">
    <Button type="button" onClick={onBack} className="p-1">
      Atrás
    </Button>
    <Button className="p-1">{isLast ? 'Terminar' : 'Siguiente'}</Button>
  </div>
);

const getResolver = (n) =>
  joiResolver(
    Joi.object(
      Object.assign(
        { csrfToken: Joi.string().required() },
        [...Array(n).keys()].reduce((p, c) => {
          p[`question_${c}`] = Joi.number().required();
          p[`answer_${c}`] = Joi.string().required();
          return p;
        }, {})
      )
    ),
    {
      abortEarly: true,
      messages: {
        'string.empty': 'Campo requerido',
        'number.base': 'Campo requerido',
      },
    }
  );

function SecurityQuestions({
  csrfToken,
  securityQuestions,
  securityQuestionsRequired,
}) {
  const [current, setCurrent] = useState(0);
  const [questionHistory, setQuestionHistory] = useState([securityQuestions]);
  const fetch = useFetch();
  const questions = questionHistory[questionHistory.length - 1];
  const isLastQuestion = current === securityQuestionsRequired - 1;
  const resolver = getResolver(securityQuestionsRequired);

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      csrfToken,
    },
  });

  const nextQuestion = () => {
    setQuestionHistory([
      ...questionHistory,
      questions.filter((q) => q._id !== +getValues()[`question_${current}`]),
    ]);
    setCurrent((c) => c + 1);
  };

  const onBack = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setQuestionHistory(questionHistory.slice(0, questionHistory.length - 1));
    }
  };

  const onSubmit = async (body) => {
    if (isLastQuestion) {
      const res = await fetch.post('/api/security/questions', body);
      console.log(res);
    } else {
      nextQuestion();
    }
  };

  const nextOrError = (data) => {
    const key = Object.keys(data)[0];
    if (+key[key.length - 1] !== current) {
      clearErrors();
      nextQuestion();
    }
  };

  return (
    <SecurityQuestionsContainer>
      <Form onSubmit={handleSubmit(onSubmit, nextOrError)}>
        <CsrfToken {...register('csrfToken')} />
        <InputGroup groupName="Preguntas de Seguridad">
          {[...Array(securityQuestionsRequired).keys()].map((i) => (
            <Question key={i} show={current === i}>
              <QuestionIndex index={i + 1} />
              <InputSelect
                error={errors[`question_${i}`]}
                placeholder="Seleccione una pregunta"
                {...register(`question_${i}`)}
              >
                <Options values={questions} />
              </InputSelect>
              <Input
                error={errors[`answer_${i}`]}
                placeholder="Respuesta"
                {...register(`answer_${i}`)}
              />
            </Question>
          ))}
        </InputGroup>
        <FormButtons isLast={isLastQuestion} onBack={onBack} />
      </Form>
    </SecurityQuestionsContainer>
  );
}

SecurityQuestions.getLayout = (page) => (
  <MainLayout>
    <Responsive>{page}</Responsive>
  </MainLayout>
);

export default SecurityQuestions;

export async function getServerSideProps(context) {
  const config = await mongo.config.get({ securityQuestionsRequired: 1 });
  return {
    props: {
      securityQuestions: await mongo.securityQuestions.getAll(),
      csrfToken: await getCsrfToken(context),
      ...config,
    },
  };
}
