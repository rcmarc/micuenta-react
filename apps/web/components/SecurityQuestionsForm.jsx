import clsx from 'clsx';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from './Button';
import CsrfToken from './CsrfToken';
import InputPassword from './Input/InputPassword';
import InputSelect from './Input/InputSelect';

function SecurityQuestionsForm({
  onSubmit,
  csrfToken,
  securityQuestions,
  securityQuestionsRequired,
}) {
  const [current, setCurrent] = useState(0);
  const [questionHistory, setQuestionHistory] = useState([securityQuestions]);
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

  function nextQuestion() {
    setQuestionHistory([
      ...questionHistory,
      questions.filter((q) => q._id !== +getValues()[`question_${current}`]),
    ]);
    setCurrent((c) => c + 1);
  }

  function onBack() {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setQuestionHistory(questionHistory.slice(0, questionHistory.length - 1));
    }
  }

  function submit(body) {
    if (isLastQuestion) {
      onSubmit(body);
    } else {
      nextQuestion();
    }
  }

  function nextOrError(data) {
    const key = Object.keys(data)[0];
    if (+key[key.length - 1] !== current) {
      clearErrors();
      nextQuestion();
    }
  }

  return (
    <div className="relative my-5 h-[250px] w-full overflow-hidden md:my-0">
      <form onSubmit={handleSubmit(submit, nextOrError)}>
        <CsrfToken {...register('csrfToken')} />
        {[...Array(securityQuestionsRequired).keys()].map((i) => (
          <div
            key={i}
            className={clsx(
              'top-15 absolute z-10 w-full transition-[left] duration-700 [&>div]:mb-7',
              { 'left-0': current === i, '-left-[100%]': current !== i }
            )}
          >
            <InputSelect
              error={errors[`question_${i}`]}
              defaultValue=""
              {...register(`question_${i}`)}
            >
              <option value="" disabled hidden>
                Pregunta {i + 1}
              </option>
              {questions.map((q, i) => (
                <option key={i} value={q._id}>
                  {q.text}
                </option>
              ))}
            </InputSelect>
            <InputPassword
              error={errors[`answer_${i}`]}
              placeholder="Respuesta"
              id={`answer_${i}`}
              {...register(`answer_${i}`)}
            />
          </div>
        ))}
        <div className="absolute bottom-10 z-10 flex w-full justify-between">
          <Button type="button" onClick={onBack}>
            Atrás
          </Button>
          <Button>{isLastQuestion ? 'Terminar' : 'Siguiente'}</Button>
        </div>
      </form>
    </div>
  );
}

function getResolver(n) {
  return joiResolver(
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
}

export default SecurityQuestionsForm;
