import React from 'react';

import { Status } from '../../types';

import styles from './Dialog.module.scss';

type Props = {
  status: Status;
  onError: React.ReactNode;
  onFinished: React.ReactNode;
  onLoading: React.ReactNode;
  onNewGame: React.ReactNode;
  newGame: () => void;
};

export const Dialog: React.FC<Props> = ({
  status,
  onError,
  onFinished,
  onLoading,
  onNewGame,
  newGame,
  children,
}) => {
  return (
    <div className={styles.dialog}>
      {status === 'INITIAL' && onNewGame}
      {status === 'FINISHED' && onFinished}
      {status === 'ERROR' && onError}
      {status === 'LOADING' && onLoading}
      {(status === 'FINISHED' || status === 'INITIAL') && (
        <div>
          <button onClick={newGame}>New game</button>
        </div>
      )}
      {status === 'PLAYING' && children}
    </div>
  );
};
