import { Component } from 'react';
import { TodoWithUser } from '../../entities/TodoWithUser';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  list: TodoWithUser[];
};

export class TodoList extends Component<TodoListProps> {
  render() {
    const { list } = this.props;

    return (
      <section className="TodoList">
        {list.map(todo => (
          <TodoInfo key={todo.id} todo={todo} />
        ))}
      </section>
    );
  }
}
