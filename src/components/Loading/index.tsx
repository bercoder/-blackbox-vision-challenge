import React from 'react';

import styles from './Loading.module.scss';

export const Loading: React.FC = () => (
  <div className={styles.loading}>
    <div className={styles.roller}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <p>Loading questions</p>
  </div>
);
