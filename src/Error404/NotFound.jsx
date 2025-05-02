import React from 'react';
import styles from './NotFound.module.css';

export const NotFound = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.errorMessage}>
        {'{'} {message || 'Страница не найдена'} {'}'}
      </p>
      <p className={styles.errorDetails}>
        Похоже, вы перешли по неверной ссылке или страница была удалена.
      </p>
    </div>
  );
};
