import { useState } from 'react';

import { IQuestion, Status } from './types';

type Hook = {
  questions: IQuestion[];
  points: number;
  correct: number;
  actualQuestion: number;
  status: Status;
  level: string;
  newGame: () => void;
  assignPoints: (type: IQuestion['type']) => void;
  handleNext: () => void;
  retry: () => void;
  handleLevel: (value: string) => void;
};

export const useQuestions = (): Hook => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [points, setPoint] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [actualQuestion, setActualQuestion] = useState<number>(0);
  const [status, setStatus] = useState<Status>('INITIAL');
  const [level, setLevel] = useState<string>('');

  async function newGame() {
    if (points > 0) {
      setStatus('INITIAL');
      setPoint(0);

      return;
    }
    try {
      setStatus('LOADING');
      const selected = level ? `&difficulty=${level}` : '';
      const data = await fetch(`https://opentdb.com/api.php?&encode=base64&amount=10${selected}`);

      const { results } = await data.json();

      if (!results || results.length < 1) setStatus('ERROR');
      else {
        setPoint(0);
        setActualQuestion(0);
        setStatus('PLAYING');
        setQuestions(results);
      }
    } catch (err) {
      setStatus('ERROR');
    }
  }

  function assignPoints(type: IQuestion['type']) {
    const add = type === 'multiple' ? 10 : 5;

    setCorrect((prev) => prev + 1);
    setPoint((prev) => prev + add);
  }

  function handleNext() {
    if (actualQuestion + 1 < questions.length) {
      setActualQuestion(actualQuestion + 1);
    } else {
      setStatus('FINISHED');
      setQuestions([]);
    }
  }

  function retry() {
    setStatus('INITIAL');
  }

  function handleLevel(value: string) {
    setLevel(value.toLowerCase());
  }

  return {
    questions,
    points,
    correct,
    actualQuestion,
    status,
    level,
    newGame,
    assignPoints,
    handleNext,
    retry,
    handleLevel,
  };
};
