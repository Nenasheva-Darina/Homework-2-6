import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={styles.backButton}>
      Назад
    </button>
  );
};
