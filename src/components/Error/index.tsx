import React from 'react';

type Props = {
  retry: () => void;
};

export const Error: React.FC<Props> = ({ retry }) => {
  return (
    <>
      <h3>There was an error.</h3>
      <p>Please try again later.</p>
      <div>
        <button onClick={retry}>Retry</button>
      </div>
    </>
  );
};
