import { Link } from 'react-router-dom';
import styles from './TodoItem.module.css';
import { CheckMark } from '../CHECK_MARK/CheckMark';
import { UseToDo } from '../../hooks/UseToDo';

export const TodoItem = ({ id, title, completed, onEdit }) => {
  const { requestUpdateTodo } = UseToDo(id);

  const handleUpdate = () => {
    onEdit(id, !completed);
    requestUpdateTodo({ completed: !completed });
  };

  const divClasses = completed
    ? `${styles.toDoList} ${styles.completedToDo}`
    : styles.toDoList;

  return (
    <>
      <div key={id} className={divClasses}>
        <CheckMark
          id={id}
          title={title}
          completed={completed}
          onEdit={handleUpdate}
        />

        <Link to={`task/${id}`}>
          <span className={styles.title}>{title}</span>
        </Link>
      </div>
    </>
  );
};
