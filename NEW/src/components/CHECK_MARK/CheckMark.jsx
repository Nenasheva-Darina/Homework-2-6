import styles from './CheckMark.module.css';

export const CheckMark = ({ id, title, completed, onEdit }) => {
  const handleChange = () => {
    // console.log('Вызов handleChange');
    onEdit({ id, completed: !completed, title });
  };
  //   console.log('onEdit в CheckMark:', typeof onEdit, onEdit);
  return (
    <input
      className={styles.boxCheck}
      type="checkbox"
      checked={completed}
      onChange={handleChange}
    />
  );
};
