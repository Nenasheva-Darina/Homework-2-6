import { useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import styles from './EDitDELit.module.css';

export const EDitDELit = ({
  id,
  title,
  completed,
  taskUpdate,
  refreshToDo,
}) => {
  const [editModeInputToDo, setEditModeInputToDo] = useState(false); // кнопка редактирования
  const [textValue, setTextValue] = useState(title); // Значение задачи

  const location = useLocation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (editModeInputToDo) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(title.length, textValue.length);
    }
  }, [editModeInputToDo]);

  const handleDoubleClick = () => {
    setEditModeInputToDo(true);
  };

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const requestUpdateToDoList = (newTitle) => {
    fetch(`http://localhost:3004/toDoList/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: newTitle,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log('Дело обновилось:', response);
        refreshToDo();
      })
      .catch((error) => console.log('Ошибочка при обновлении задачи:', error));
  };

  const requestDeleteToDoList = () => {
    fetch(`http://localhost:3004/toDoList/${id}`, {
      method: 'DELETE',
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log('Дело было удалено:', response);
        refreshToDo();
      })
      .catch((error) => console.log('Ошибочка при удалении задачи:', error));
  };

  const handleSave = () => {
    requestUpdateToDoList(textValue);
    taskUpdate(id, textValue);
    setEditModeInputToDo(false);
  };

  const textClasses = completed
    ? `${styles.title} ${styles.completed}`
    : styles.title;

  const isToDoListActive = location.pathname === '/todo-list';

  const renderDefaultView = () => (
    <span className={textClasses} onDoubleClick={handleDoubleClick}>
      {title}
    </span>
  );

  const renderEditView = () => (
    <input
      type="text"
      value={textValue}
      className={styles.newToDoInputList}
      onChange={handleChange}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSave();
        }
      }}
      ref={inputRef}
    />
  );

  const renderButtons = () => (
    <div className={styles.boxIMG}>
      <img
        src="/delete.png"
        alt="Mark as Complete"
        onClick={requestDeleteToDoList}
      />

      <img
        src="/edit.png"
        alt="Mark as Complete"
        onClick={() => setEditModeInputToDo(true)}
      />
    </div>
  );

  return (
    <>
      {isToDoListActive ? (
        renderDefaultView()
      ) : (
        <>
          {editModeInputToDo ? renderEditView() : renderDefaultView()}
          {renderButtons()}
        </>
      )}
    </>
  );
};
