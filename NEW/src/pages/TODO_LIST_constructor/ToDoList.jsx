import { useState } from 'react';
import styles from './ToDoList.module.css';
import { UseToDos } from '../../hooks/UseToDos';
import {
  AddForm,
  TodoItem,
  SortIMG,
  ErrorBlock,
  Search,
} from '../../components';

export const ToDoList = () => {
  const {
    toDoList,
    isLoadingLoader,
    requestAddNewToDo,
    setSearch: setSearchFilter,
    sortingOption,
    setSortingOption,
    onDeleteTodo,
    onUpdateTodo,
  } = UseToDos();

  const [searchInputValue, setSearchInputValue] = useState(''); // Значения инпута ввода поиска
  const [errorMessage, setErrorMessage] = useState(''); // Хранилище ошибок
  const [searchFlag, setSearchFlag] = useState(false);

  const [alphabetically, setAlphabetically] = useState(false);

  const newFilterArrToDo = toDoList.filter((task) => {
    const title = task.title.toLowerCase();
    const difficultTask = searchInputValue.toLowerCase();

    return title.includes(difficultTask);
  });

  const handleSearchInputChange = (newValue) => {
    setSearchInputValue(newValue);
  };

  const filtred = alphabetically
    ? sorterFilterArr()
    : searchFlag
    ? newFilterArrToDo
    : toDoList;

  return (
    <>
      <div className={styles.boxToDo}>
        <ErrorBlock errorMessage={errorMessage} />

        <h1> Мой список дел </h1>

        <div className={styles.boxToDo1Div}>
          <Search
            setSearch={handleSearchInputChange}
            searchFlag={searchFlag}
            setSearchFlag={setSearchFlag}
            searchInputValue={searchInputValue}
          />

          {!searchFlag && (
            <AddForm
              onSave={requestAddNewToDo}
              setErrorMessage={setErrorMessage}
              setSearch={setSearchFilter}
            />
          )}

          <SortIMG
            setSortingOption={setSortingOption}
            sortingOption={sortingOption}
          />
        </div>

        <div className={styles.content}>
          {isLoadingLoader ? <div className={styles.loader}></div> : null}

          {filtred.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onDelete={onDeleteTodo}
              onEdit={onUpdateTodo}
            />
          ))}
        </div>
      </div>
    </>
  );
};
