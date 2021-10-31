import React from 'react';

import { useQuestions } from '../../useQuestions';
import { Question } from '../Question';
import { NewGame } from '../Dialog/NewGame';
import { GameOver } from '../Dialog/GameOver';
import { Loading } from '../Loading';
import { Error } from '../Error';
import { Header } from '../Header';
import { Dialog } from '../Dialog';

import styles from './App.module.scss';

const App: React.FC = () => {
  const {
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
  } = useQuestions();

  return (
    <div className={styles.container}>
      <Header points={points} status={status} />
      <Dialog
        newGame={newGame}
        status={status}
        onError={<Error retry={retry} />}
        onFinished={<GameOver correct={correct} points={points} />}
        onLoading={<Loading />}
        onNewGame={<NewGame changeLevel={handleLevel} level={level} />}
      >
        {questions?.length > 0 && (
          <section>
            <h4>
              Question {actualQuestion + 1}/{questions.length}
            </h4>
            <Question
              key={questions[actualQuestion].question}
              assignPoints={assignPoints}
              data={questions[actualQuestion]}
              nextQuestion={handleNext}
            />
          </section>
        )}
      </Dialog>
    </div>
  );
};

export default App;
