import { Component } from 'react';
import { TodoWithUser } from '../../entities/TodoWithUser';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: TodoWithUser;
};

export class TodoInfo extends Component<TodoInfoProps> {
  render() {
    const { todo } = this.props;

    return (
      <article
        data-id={todo.id}
        className={`TodoInfo  ${todo.completed ? 'TodoInfo--completed' : ''}`}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>

        <UserInfo user={todo.user} />
      </article>
    );
  }
}
