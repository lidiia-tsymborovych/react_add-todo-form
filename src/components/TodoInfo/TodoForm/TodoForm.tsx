import { Component } from 'react';
import usersFromServer from '../../../api/users';

type TodoFormProps = {
  title: string;
  selectedId: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  titleError?: boolean;
  userError?: boolean;
};

export class TodoForm extends Component<TodoFormProps> {
  render() {
    const {
      title,
      selectedId,
      onChange,
      onSelect,
      onSubmit,
      titleError,
      userError,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={onChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={selectedId} onChange={onSelect}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(({ id, username }) => (
              <option key={id} value={id}>
                {username}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    );
  }
}
