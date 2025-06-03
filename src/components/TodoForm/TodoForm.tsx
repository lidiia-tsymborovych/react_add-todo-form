import './TodoForm.scss';
import usersFromServer from '../../api/users';
import { useEffect, useState } from 'react';
import { Task } from '../../entities/Task';

type TodoFormProps = {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    title: string,
    userId: number,
    setNewTitle: (value: string) => void,
    setSelectedUserId: (value: number) => void,
    setTitleError: (value: boolean) => void,
    setUserHasError: (value: boolean) => void,
    taskId?: number,
  ) => void;
  onCancel?: () => void;
  todo?: Task;
};

const defaultTodo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
  user: null,
};

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onCancel,
  todo = defaultTodo,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleHasError, setTitleHasError] = useState(false);
  const [userHasError, setUserHasError] = useState(false);

  useEffect(() => {
    if (todo) {
      setNewTitle(todo.title);
      setSelectedUserId(todo.userId);
    }
  }, [todo]);

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserHasError(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value.trimStart());
    setTitleHasError(false);
  };

  return (
    <form
      onSubmit={event =>
        onSubmit(
          event,
          newTitle,
          selectedUserId,
          setNewTitle,
          setSelectedUserId,
          setTitleHasError,
          setUserHasError,
          todo.id !== 0 ? todo.id : undefined,
        )
      }
    >
      <label className="field">
        <span className="visually-hidden">Title</span>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter the title"
          aria-label="Title"
          value={newTitle}
          onChange={handleInputChange}
        />
        {titleHasError && <span className="error">Title is required</span>}
      </label>

      <label className="field">
        <span className="visually-hidden">User</span>
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={handleSelectUser}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userHasError && <span className="error">Please choose a user</span>}
      </label>

      <div className="form-buttons">
        <button type="submit" data-cy="submitButton">
          Add
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
