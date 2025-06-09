import { useEffect, useState, useMemo } from 'react';

const BASE_URL = 'http://localhost:3004/toDoList';

export const UseToDos = () => {
  const [toDoList, setToDoList] = useState([]);
  const [isLoadingLoader, setIsLoadingLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [sortingOption, setSortingOption] = useState('default');

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...toDoList];

    if (search) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortingOption) {
      case 'alphabetical':
        result = [...result].sort((a, b) =>
          a.title.localeCompare(b.title, 'ru')
        );
        break;
    }

    return result;
  }, [toDoList, search, sortingOption]);

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = async () => {
    setIsLoadingLoader(true);
    try {
      const loadedToDoList = await fetch(BASE_URL).then((loadedData) =>
        loadedData.json()
      );
      setToDoList(loadedToDoList);
    } catch (error) {
      console.log('Ошибочка...', error);
    } finally {
      setIsLoadingLoader(false);
    }
  };

  const requestAddNewToDo = async (text) => {
    try {
      const newToDo = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          title: text,
          completed: false,
        }),
      }).then((response) => response.json());
      console.log('Добавленно новое дело:', newToDo);
      setToDoList([...toDoList, newToDo]);
    } catch (error) {
      console.log('Ошибочка...', error);
    } finally {
      setIsLoadingLoader(false);
    }
  };

  const onDeleteTodo = (id) => {
    setToDoList(toDoList.filter((todo) => todo.id !== id));
  };

  const onUpdateTodo = (id, completed) => {
    setToDoList(
      toDoList.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const getTodoById = (id) => {
    return toDoList.find((todo) => todo.id.toString() === id);
  };

  return {
    toDoList: filteredAndSortedTodos,
    isLoadingLoader,
    fetchToDos,
    requestAddNewToDo,
    setSearch,
    sortingOption,
    setSortingOption,
    getTodoById,
    onDeleteTodo,
    onUpdateTodo,
  };
};
