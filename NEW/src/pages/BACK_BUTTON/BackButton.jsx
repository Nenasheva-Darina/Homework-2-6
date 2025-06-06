import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BackButton.module.css';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [historyStack, setHistoryStack] = useState([]); // История посещенных страниц
  const [canGoBack, setCanGoBack] = useState(false);

  console.log('Текущий URL', location);
  console.log('История посещения', historyStack);

  useEffect(() => {
    setHistoryStack((prev) => {
      console.log('prev', prev);
      const newStack = [...prev, location.pathname];

      return newStack.length > 5 ? newStack.slice(1) : newStack;
    });
  }, [location]);

  useEffect(() => {
    setCanGoBack(historyStack.length > 1);
  }, [historyStack]);

  const goBack = () => {
    if (historyStack.length > 1) {
      const previousPath = historyStack[historyStack.length - 2];

      setHistoryStack((prev) => prev.slice(0, -1));

      navigate(previousPath, { replace: true });
    }
  };

  return (
    <button
      onClick={goBack}
      disabled={!canGoBack}
      className={styles.backButton}
    >
      Назад
    </button>
  );
};
