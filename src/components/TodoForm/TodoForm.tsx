import './TodoForm.scss';
import { User } from '../../entities/User';

type TodoFormProps = {
  users: User[];
  newTitle: string;
  selectedUserId: number;
  setNewTitle: (value: string) => void;
  setSelectedUserId: (value: number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleError: boolean;
  userError: boolean;
  setTitleError: (value: boolean) => void;
  setUserError: (value: boolean) => void;
};

export const TodoForm: React.FC<TodoFormProps> = ({
  users,
  newTitle,
  selectedUserId,
  setNewTitle,
  setSelectedUserId,
  onSubmit,
  titleError,
  userError,
  setTitleError,
  setUserError,
}) => {
  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserError(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value.trimStart());
    setTitleError(false);
  };

  return (
    <form onSubmit={onSubmit}>
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
        {titleError && <span className="error">Title is required</span>}
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
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span className="error">Please choose a user</span>}
      </label>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
