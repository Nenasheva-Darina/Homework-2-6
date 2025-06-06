import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UseToDos } from '../../hooks/UseToDos';
import styles from './SelectedTask.module.css';
import { CheckMark } from '../../components';

// { onDelete, id, title, completed, onEdit }

export const SelectedTask = () => {
  const { id } = useParams();
  const { getTodoById, requestUpdateToDoList } = UseToDos();
  const [todo, setTodo] = useState(null);

  //   const [editModeInputToDo, setEditModeInputToDo] = useState(false);
  //   const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      const foundTodo = getTodoById(id);
      setTodo(foundTodo);
    }
  }, [id, getTodoById]);

  const handleCheckboxChange = async () => {
    // Определяем handleCheckboxChange
    if (!todo) return; // Защита от ошибки

    const updatedTodo = { ...todo, completed: !todo.completed }; // Создаем обновленную задачу
    try {
      await requestUpdateToDoList(updatedTodo); // Вызываем requestUpdateToDoList
      setTodo(updatedTodo); // Обновляем состояние
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
      //  Обработка ошибки (например, отображение сообщения)
    }
  };

  if (!todo) {
    return <p>Задача не найдена</p>;
  }

  const requestDeleteToDo = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } finally {
      setIsDeleting(false);
    }
  };

  const requestEditToDo = async (event) => {
    event.stopPropagation();
    setEditModeInputToDo(true);
  };

  console.log('id', id);

  //     const textClasses = completed
  // 	  ? `${styles.title} ${styles.completed}`
  // 	  : styles.title;

  //    const divClasses = completed
  // 	  ? `${styles.toDoList} ${styles.completedToDo}`
  // 	  : styles.toDoList;

  return (
    <div key={id} className={styles.toDoList}>
      <CheckMark
        id={id}
        title={todo.title}
        completed={todo.completed}
        onEdit={handleCheckboxChange}
      />

      <span className={styles.title}>{todo.title}</span>

      {/* <input
			type="text"
			value={todo.title}
			// ref={inputRef}
			// defaultValue={title}
			// className={styles.newToDoInputList}
			// onBlur={handleSave}
			// onKeyDown={handleKeyDown}
			/>
			 */}

      <div className={styles.boxIMG}>
        <img
          src="/images/delete.png"
          alt="Mark as Complete"
          onClick={requestDeleteToDo}
        />

        <img
          src="/images/edit.png"
          alt="Mark as Complete"
          onClick={requestEditToDo}
        />
      </div>
    </div>
  );
};
