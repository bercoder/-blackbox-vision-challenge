import React from 'react';

import logo from '../../assets/logo.png';
import { Status } from '../../types';

import styles from './Header.module.scss';

type Props = {
  points: number;
  status: Status;
};

export const Header: React.FC<Props> = ({ points, status }) => {
  React.useEffect(() => {
    if (points) {
      document.querySelector('header > p')?.classList.add('assign');
    }
  }, [points]);

  return (
    <header className={styles.header}>
      <img alt="BlackBox Vision" src={logo} width={480} />
      {status === 'PLAYING' && (
        <p onAnimationEnd={() => document.querySelector('header > p')?.classList.remove('assign')}>
          <span>points</span>
          <span>{points}</span>
        </p>
      )}
    </header>
  );
};
