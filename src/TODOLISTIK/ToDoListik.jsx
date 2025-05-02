import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styles from './ToDoListik.module.css';
import { SortIMG } from '../SORTimg/SortIMG.jsx';
import { EDitDELit } from '../EDItingDELeting/EDitDELit.Container.jsx';

export const ToDoListik = () => {
  const [toDoList, setToDoList] = useState([]); //Массив объектов списка дел
  const [inputValue, setInputValue] = useState(''); // Значения инпута ввода задачи
  const [searchInputValue, setSearchInputValue] = useState(''); // Значения инпута ввода поиска
  const [errorMessage, setErrorMessage] = useState(''); // Хранилище ошибок

  const [isChecked, setIsChecked] = useState(false); //  Флаг для галочки инпута
  const [searchFlag, setSearchFlag] = useState(false); // Флаг кнопки поиска
  const [alphabetically, setAlphabetically] = useState(false); // Флаг по алфавиту
  const [refreshToDoFlag, setRefreshToDoFlag] = useState(false); // Флаг обновления списка дел
  const [downloadButtonActive, setDownloadButtonActive] = useState(false); // Флаг добавить дело

  //Пока не нужно
  const [updateToDoList, setUpdateToDoList] = useState(false); // Флаг кнопки редактирования
  const [isLoadingLoader, setIsLoadingLoader] = useState(false); // Загрузка лоудера

  const searchInputRef = useRef(null);
  useEffect(() => {
    if (searchFlag) {
      searchInputRef.current.focus();
    }
  }, [searchFlag]);

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

  const requestAddNewToDo = () => {
    if (inputValue === '') {
      setErrorMessage('Упс...Кажется вы забыли написать задачу');
    } else {
      setDownloadButtonActive(true);
      setIsLoadingLoader(true);
      fetch('http://localhost:3004/toDoList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          title: inputValue,
          completed: false,
        }),
      })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          console.log('Добавленно новое дело:', response);
          setToDoList([...toDoList, response]);
          // console.log(response);
          setRefreshToDoFlag(!refreshToDoFlag);
          setInputValue('');
          refreshToDo();
        })
        .catch((error) => console.log('Ошибочка...', error))
        .finally(() => setUpdateToDoList(false));
    }
  };

  const handleChange = (target) => {
    if (target.value === '') {
      setErrorMessage('Упс...Кажется вы забыли написать задачу');
      setInputValue('');
    } else {
      setInputValue(target.value);
      setErrorMessage('');
    }
  };

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

  const sorterFilterArr = () => {
    const newfilterArr = [...toDoList].sort((a, b) =>
      a.title.localeCompare(b.title, 'ru')
    );

    return newfilterArr;
  };

  const searchClasses = searchFlag ? styles.completed : null;

  const newFilterArrToDo = toDoList.filter((task) => {
    const title = task.title.toLowerCase();
    const difficultTask = searchInputValue.toLowerCase();

    return title.includes(difficultTask);
  });

  const searchToDoList = () => {
    setSearchFlag(!searchFlag);
  };
  //   console.log(searchInputValue);

  const penChangeSearch = (target) => {
    if (target.value === '') {
      setErrorMessage('Упс...Кажется вы забыли написать задачу');
      setSearchInputValue('');
    } else {
      setSearchInputValue(target.value);
      setErrorMessage('');
    }
  };

  return (
    <>
      <div className={styles.boxToDo}>
        {errorMessage ? (
          <div className={styles.errorBlock}>{errorMessage}</div>
        ) : null}

        <h1> Мой список дел </h1>

        <div className={styles.boxToDo1Div}>
          <img
            className={searchClasses}
            src="/search.png"
            alt="Perform a search"
            onClick={searchToDoList}
          />
          {searchFlag ? (
            <input
              type="text"
              placeholder="Введите название задачи"
              className={styles.newToDoInput}
              value={searchInputValue}
              ref={searchInputRef}
              onChange={(event) => penChangeSearch(event.target)}
            />
          ) : (
            <input
              type="text"
              placeholder="Новая цель: больше, чем сон!"
              className={styles.newToDoInput}
              value={inputValue}
              onChange={(event) => handleChange(event.target)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  requestAddNewToDo();
                }
              }}
            />
          )}
          <SortIMG setAlphabetically={setAlphabetically} />
          <button className={styles.button} onClick={requestAddNewToDo}>
            Добавить
          </button>
        </div>
        <div className={styles.content}>
          {isLoadingLoader ? <div className={styles.loader}></div> : null}

          {alphabetically
            ? sorterFilterArr().map(({ id, title, completed }) => (
                <NavLink key={id} to={`task/${id}`} className={styles.toDoList}>
                  <div
                    className={styles.checkboxContainer} //  Оборачиваем чекбокс в div
                    onClick={(e) => e.stopPropagation()} // Останавливаем распространение клика
                  >
                    <input
                      className={styles.boxCheck}
                      type="checkbox"
                      checked={completed}
                      onClick={() => handleCheckboxChange(id)}
                    />
                  </div>

                  <EDitDELit
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    taskUpdate={handleUpdateTitle}
                    refreshToDo={refreshToDo}
                  />
                </NavLink>
              ))
            : searchFlag
            ? newFilterArrToDo.map(({ id, title, completed }) => (
                <NavLink key={id} to={`task/${id}`} className={styles.toDoList}>
                  <div
                    className={styles.checkboxContainer} // Оборачиваем чекбокс в div
                    onClick={(e) => e.stopPropagation()} // Останавливаем распространение клика
                  >
                    <input
                      className={styles.boxCheck}
                      type="checkbox"
                      checked={completed}
                      onClick={() => handleCheckboxChange(id)}
                    />
                  </div>

                  <EDitDELit
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    taskUpdate={handleUpdateTitle}
                    refreshToDo={refreshToDo}
                  />
                </NavLink>
              ))
            : toDoList.map(({ id, title, completed }) => (
                <NavLink key={id} to={`task/${id}`} className={styles.toDoList}>
                  <div
                    className={styles.checkboxContainer} // Оборачиваем чекбокс в div
                    onClick={(e) => e.stopPropagation()} // Останавливаем распространение клика
                  >
                    <input
                      className={styles.boxCheck}
                      type="checkbox"
                      checked={completed}
                      onClick={() => handleCheckboxChange(id)}
                    />
                  </div>

                  <EDitDELit
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    taskUpdate={handleUpdateTitle}
                    refreshToDo={refreshToDo}
                  />
                </NavLink>
              ))}
        </div>
      </div>
    </>
  );
};
