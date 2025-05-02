import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styles from './ToDos.module.css';

import { EDitDELit } from '../EDItingDELeting/EDitDELit.Container.jsx';

export const ToDos = () => {
  const [toDoList, setToDoList] = useState([]); //Массив объектов списка дел
  const { id } = useParams();
  const location = useLocation();
  const [todoActivID, setToDoActivID] = useState(null);
  const [refreshToDoFlag, setRefreshToDoFlag] = useState(false); // Флаг обновления списка дел
  const [isLoadingLoader, setIsLoadingLoader] = useState(false); // Загрузка лоудера

  const [updateToDoList, setUpdateToDoList] = useState(false); // Флаг кнопки редактирования

  const refreshToDo = () => setRefreshToDoFlag(!refreshToDoFlag);

  useEffect(() => {
    fetch('http://localhost:3004/toDoList')
      .then((loadedData) => loadedData.json())
      .then((loadedToDoList) => {
        setToDoList(loadedToDoList);
      })
      .catch((error) => console.log('Ошибочка...', error))
      .finally(() => setIsLoadingLoader(false));
  }, [refreshToDoFlag]);

  useEffect(() => {
    const arrToDo = toDoList.find((todo) => todo.id === id);
    if (arrToDo) {
      setToDoActivID(arrToDo);
    } else {
      console.log(`Задача с ID ${id} не найдена`);
      setToDoActivID(null);
    }
  }, [toDoList, id]);

  const handleCheckboxChange = (id) => {
    setToDoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleUpdateTitle = (id, newTitle) => {
    setToDoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  return (
    <>
      <div className={styles.boxToDo}>
        {todoActivID ? (
          <div className={styles.toDoList}>
            <input
              className={styles.boxCheck}
              type="checkbox"
              checked={todoActivID.completed}
              onClick={() => handleCheckboxChange(todoActivID.id)}
            />

            <EDitDELit
              key={todoActivID.id}
              id={todoActivID.id}
              title={todoActivID.title}
              completed={todoActivID.completed}
              taskUpdate={handleUpdateTitle}
              refreshToDo={refreshToDo}
            />
          </div>
        ) : (
          <div>Задача не найдена</div>
        )}
      </div>
    </>
  );
};
