import { Task } from '../../entities/Task';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type TodoListProps = {
  todos: Task[];
  onDelete: (value: number) => void;
  onToggleComplete: (value: number) => void;
};

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onToggleComplete,
}) => {
  // const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <div className="TodoList__item" key={todo.id}>
          <TodoInfo task={todo} onToggle={onToggleComplete} />
          <button
            className="edit-btn"
            type="button"
            // onClick={() => setEditingId(todo.id)}
          >
            ✏️ Edit
          </button>
          <button
            className="delete-btn"
            type="button"
            onClick={() => onDelete(todo.id)}
          >
            🗑️
          </button>
        </div>
      ))}
    </section>
  );
};
