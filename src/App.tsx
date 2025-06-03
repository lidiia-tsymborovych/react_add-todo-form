import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import { useState } from 'react';
import { ListOfTodos } from './utils/ListOfTodos';
import { getNewId } from './utils/getNewId';
import { getUserById } from './utils/getUserById';

export const App: React.FC = () => {
  const [updatedTodos, setUpdatedTodos] = useState(ListOfTodos);

  const resetAfterSubmit = (
    setNewTitle: (value: string) => void,
    setSelectedUserId: (value: number) => void,
  ) => {
    setNewTitle('');
    setSelectedUserId(0);
  };

  // const handleSubmit = (
  //   event: React.FormEvent<HTMLFormElement>,
  //   newTitle: string,
  //   selectedUserId: number,
  //   setNewTitle: (value: string) => void,
  //   setSelectedUserId: (value: number) => void,
  //   setTitleError: (value: boolean) => void,
  //   setUserHasError: (value: boolean) => void,
  // ) => {
  //   event.preventDefault();

  //   if (!newTitle) {
  //     setTitleError(true);

  //     return;
  //   }

  //   if (!selectedUserId) {
  //     setUserHasError(true);

  //     return;
  //   }

  //   const newTask = {
  //     id: getNewId(updatedTodos),
  //     completed: false,
  //     title: newTitle,
  //     userId: selectedUserId,
  //     user: getUserById(selectedUserId),
  //   };

  //   setUpdatedTodos(curr => [...curr, newTask]);
  //   resetAfterSubmit(setNewTitle, setSelectedUserId);
  // };

  const handleDeleteButton = (deletingTaskId: number) => {
    setUpdatedTodos(curr => curr.filter(task => task.id !== deletingTaskId));
  };

  const handleToggleComplete = (taskId: number) => {
    setUpdatedTodos(curr =>
      curr.map(todo =>
        taskId === todo.id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // const handleUpdate = (
  //   event: React.FormEvent<HTMLFormElement>,
  //   updatedTitle: string,
  //   updatedUserId: number,
  //   setNewTitle: (value: string) => void,
  //   setSelectedUserId: (value: number) => void,
  //   setTitleError: (value: boolean) => void,
  //   setUserHasError: (value: boolean) => void,
  //   taskId: number,
  // ) => {
  //   event.preventDefault();

  //   if (!updatedTitle) {
  //     setTitleError(true);

  //     return;
  //   }

  //   if (!updatedUserId) {
  //     setUserHasError(true);

  //     return;
  //   }

  //   const newTask = {
  //     id: getNewId(updatedTodos),
  //     completed: false,
  //     title: updatedTitle,
  //     userId: updatedUserId,
  //     user: getUserById(updatedUserId),
  //   };

  //   setUpdatedTodos(curr =>
  //     curr.map(todo => (todo.id === taskId ? newTask : todo)),
  //   );

  //   resetAfterSubmit(setNewTitle, setSelectedUserId);
  // };

  const handleSave = (
    event: React.FormEvent<HTMLFormElement>,
    title: string,
    userId: number,
    setNewTitle: (value: string) => void,
    setSelectedUserId: (value: number) => void,
    setTitleError: (value: boolean) => void,
    setUserHasError: (value: boolean) => void,
    taskId?: number,
  ) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);

      return;
    }

    if (!userId) {
      setUserHasError(true);

      return;
    }

    if (taskId != null) {
      const updatedTask = {
        id: getNewId(updatedTodos),
        completed: false,
        title,
        userId,
        user: getUserById(userId),
      };

      setUpdatedTodos(curr =>
        curr.map(todo => (todo.id === taskId ? updatedTask : todo)),
      );
    } else {
      const newTask = {
        id: getNewId(updatedTodos),
        completed: false,
        title,
        userId,
        user: getUserById(userId),
      };

      setUpdatedTodos(curr => [...curr, newTask]);
    }

    resetAfterSubmit(setNewTitle, setSelectedUserId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={handleSave} />

      <TodoList
        todos={updatedTodos}
        onDelete={handleDeleteButton}
        onToggleComplete={handleToggleComplete}
        onSubmit={handleSave}
      />
    </div>
  );
};
