import styles from './CheckMark.module.css';

export const CheckMark = ({ completed, onEdit }) => {
  return (
    <input
      className={styles.boxCheck}
      type="checkbox"
      checked={completed}
      onChange={onEdit}
    />
  );
};
