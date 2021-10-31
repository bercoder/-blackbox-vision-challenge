import React from 'react';

type Props = {
  level: string;
  changeLevel: (value: string) => void;
};

export const NewGame: React.FC<Props> = ({ level, changeLevel }) => {
  const values = ['Easy', 'Medium', 'Hard'];

  function handleLevel({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) {
    changeLevel(value);
  }

  return (
    <>
      <h2>Welcome to QuizBox Vision!</h2>
      <h3>QuizBox is a question game.</h3>
      <label htmlFor="difficulty">Select level </label>
      <select defaultValue={level} id="difficulty" name="level" onChange={handleLevel}>
        <option value="">Any</option>
        {values.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </>
  );
};
