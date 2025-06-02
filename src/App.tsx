import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { useState } from 'react';
import { ListOfTodos } from './utils/ListOfTodos';
import { getNewId } from './utils/getNewId';
import { getUserById } from './utils/getUserById';

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleHasError, setTitleHasError] = useState(false);
  const [userHasError, setUserHasError] = useState(false);
  const [updatedTodos, setUpdatedTodos] = useState(ListOfTodos);

  const resetAfterSubmit = () => {
    setNewTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle) {
      setTitleHasError(true);

      return;
    }

    if (!selectedUserId) {
      setUserHasError(true);

      return;
    }

    const newTask = {
      id: getNewId(updatedTodos),
      completed: false,
      title: newTitle,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    setUpdatedTodos(curr => [...curr, newTask]);
    resetAfterSubmit();
  };

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

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        users={usersFromServer}
        newTitle={newTitle}
        selectedUserId={selectedUserId}
        setNewTitle={setNewTitle}
        setSelectedUserId={setSelectedUserId}
        onSubmit={handleSubmit}
        titleError={titleHasError}
        userError={userHasError}
        setTitleError={setTitleHasError}
        setUserError={setUserHasError}
      />

      <TodoList
        todos={updatedTodos}
        onDelete={handleDeleteButton}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};
