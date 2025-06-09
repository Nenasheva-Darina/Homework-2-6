import { useEffect, useState, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './SelectedTask.module.css';
import { UseToDo } from '../../hooks/UseToDo';

export const SelectedTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeEdit, setActiveEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');

  if (!id) return <Navigate to="/404" />;

  const { todo, loading, requestDeleteToDo, requestUpdateTodo, fetchTodo } =
    UseToDo(id);

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);

  useEffect(() => {
    if (todo) {
      setInputValue(todo.title);
    }
  }, [todo]);

  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (activeEdit) {
      focusInput();
    }
  }, [activeEdit]);

  const handleDelete = async () => {
    await requestDeleteToDo();
    navigate('/todo-list');
  };

  const handleSave = async () => {
    await requestUpdateTodo({ title: inputValue });
    setActiveEdit(false);
  };

  if (loading) return <p>Loading...</p>;

  if (!todo) {
    return <p>Такой задачи не существует ...</p>;
  }

  const requestEditToDo = async (event) => {
    console.log(inputValue);
    event.stopPropagation();
    setActiveEdit(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    <div key={id} className={styles.toDoList}>
      {activeEdit ? (
        <input
          type="text"
          value={inputValue}
          ref={inputRef}
          defaultValue={todo.title}
          className={styles.newToDoInputList}
          onBlur={handleSave}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className={styles.title}>{todo.title}</span>
      )}
      <div className={styles.boxIMG}>
        <img
          src="/images/delete.png"
          alt="Mark as Complete"
          onClick={handleDelete}
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
