import React from 'react';

type Props = {
  points: number;
  correct: number;
};

export const GameOver: React.FC<Props> = ({ points, correct }) => {
  return (
    <>
      <h3>Game over!!</h3>
      {points ? <h2>You win</h2> : <h2>You lose.</h2>}
      <p>You have {points} points.</p>
      <p>You answered {correct} correct questions.</p>
    </>
  );
};
