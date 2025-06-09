import { useState } from 'react';

const BASE_URL = 'http://localhost:3004/toDoList';

export const UseToDo = (id) => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const todo = await response.json();

      setTodo(todo);
    } catch (error) {
      setTodo(null);
      console.log('Ошибочка...', error);
    } finally {
      setLoading(false);
    }
  };

  const requestDeleteToDo = async () => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      console.log('Дело было удалено:', id);
    } catch (error) {
      console.log('Ошибочка при удалении задачи:', error);
    }
  };

  const requestUpdateTodo = async (updatedField) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(updatedField),
      });

      const updatedToDo = await response.json();

      setTodo(updatedToDo);

      console.log('Задача обновлена:', updatedToDo);
    } catch (error) {
      console.log('Ошибочка при обновлении задачи:', error);
    }
  };

  return { todo, loading, requestUpdateTodo, requestDeleteToDo, fetchTodo };
};
