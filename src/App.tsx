import { Component } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { todoList, TodoWithUser } from './entities/TodoWithUser';
import { TodoForm } from './components/TodoInfo/TodoForm/TodoForm';
import { getNewTodoId } from './utils/getNewTodoId';
import { getUser } from './utils/getUser';

type State = {
  list: TodoWithUser[];
  selectedUserId: number;
  newTitle: string;
  titleError: boolean;
  userError: boolean;
};

export class App extends Component<{}, State> {
  state: State = {
    list: todoList,
    selectedUserId: 0,
    newTitle: '',
    titleError: false,
    userError: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTitle: event.target.value });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = +event.target.value;

    this.setState({ selectedUserId: id });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.newTitle) {
      this.setState({ titleError: true });
    }

    if (!this.state.selectedUserId) {
      this.setState({ userError: true });
    }

    if (!this.state.newTitle || !this.state.selectedUserId) {
      return;
    }

    const newTodo = {
      id: getNewTodoId(this.state.list),
      title: this.state.newTitle,
      completed: false,
      userId: this.state.selectedUserId,
      user: getUser(this.state.selectedUserId),
    };

    this.setState({ list: [...this.state.list, newTodo] });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoForm
          title={this.state.newTitle}
          selectedId={this.state.selectedUserId}
          onChange={this.handleInputChange}
          onSelect={this.handleSelect}
          onSubmit={this.handleSubmit}
          titleError={this.state.titleError}
          userError={this.state.userError}
        />

        <TodoList list={this.state.list} />
      </div>
    );
  }
}
