import './TodoInfo.scss';
import { Task } from '../../entities/Task';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  task: Task;
  onToggle: (value: number) => void;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ task, onToggle }) => {
  return (
    <article
      data-id={task.id}
      className={`TodoInfo ${task.completed ? 'TodoInfo--completed' : ''}`}
      onClick={() => onToggle(task.id)}
    >
      <h2 className="TodoInfo__title">{task.title}</h2>

      <UserInfo user={task.user} />
    </article>
  );
};
