import React, { useEffect, useState } from 'react';

import { IQuestion } from '../../types';

import styles from './Question.module.scss';

type Props = {
  data: IQuestion;
  assignPoints: (type: IQuestion['type']) => void;
  nextQuestion: () => void;
};

type State = {
  type: string;
  class: string;
  message: string;
};

export const Question: React.FC<Props> = ({ data, assignPoints, nextQuestion }) => {
  const { question, category, correct_answer } = data;
  const [userResponse, setResponse] = useState<string>('');
  const [incorrect, setIncorrect] = useState<string>('');
  const [correct, setCorrect] = useState<string>('');
  const [message, setMessage] = useState<State>({
    type: '',
    class: '',
    message: '',
  });
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [hints, setHints] = useState<number>(atob(data.type) === 'boolean' ? 0 : 2);

  useEffect(() => {
    setAnswers([correct_answer, ...data.incorrect_answers].sort());
  }, []);

  function handleResponse() {
    if (!userResponse) {
      setMessage({
        type: 'error',
        class: 'errormessage',
        message: 'You have to select an option',
      });

      return;
    }

    if (userResponse === correct_answer) {
      setCorrect(userResponse);
      setIncorrect('');
      setMessage({
        type: 'response',
        class: 'okmessage',
        message: 'Correct!',
      });
      assignPoints(data.type);
    } else {
      setCorrect(correct_answer);
      setIncorrect(userResponse);
      setMessage({
        type: 'response',
        class: 'errormessage',
        message: 'Wrong :(',
      });
    }
  }

  function handleNext() {
    nextQuestion();
  }

  function hint() {
    if (!hint) return;
    const index = Math.floor(Math.random() * data.incorrect_answers.length);

    const remove = data.incorrect_answers.splice(index, 1);

    setAnswers((prev) => prev.filter((answer) => answer !== remove.toString()));
    setHints((prev) => prev - 1);
  }

  return (
    <article className={styles.question}>
      <p className={styles.category}>Category: {atob(category)}</p>
      <h3>{atob(question)}</h3>
      <ul>
        {answers.map((answer, i) => (
          <li
            key={answer}
            className={`${correct === answer && styles.qcorrect} ${
              incorrect === answer && styles.qincorrect
            }`}
          >
            <input
              disabled={!!correct || !!incorrect}
              id={`${question}${i}`}
              name={question}
              type="radio"
              value={answer}
              onClick={() => setResponse(answer)}
            />
            <label htmlFor={`${question}${i}`}>
              <span>{atob(answer)}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className={`${styles.message} ${styles[message.class]}`}>
        <p>{message.message}</p>
        <button
          className={styles.hint}
          disabled={!hints || !!correct || !!incorrect}
          onClick={hint}
        >
          💡<span>{hints}</span>
        </button>
        <button disabled={!!correct || !!incorrect} onClick={handleResponse}>
          Answer
        </button>
        <button className={styles.skip} disabled={!!correct || !!incorrect} onClick={handleNext}>
          Skip
        </button>
        {(correct || incorrect) && <button onClick={handleNext}>Next</button>}
      </div>
    </article>
  );
};
