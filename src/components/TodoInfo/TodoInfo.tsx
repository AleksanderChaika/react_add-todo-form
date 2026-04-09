import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

type Props = {
  todo: Todo;
  user?: User;
};

export const TodoInfo = ({ todo, user }: Props) => {
  const todoCompleted = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  const shownUser = user || todo.user;

  return (
    <article data-id={todo.id} className={todoCompleted}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={shownUser} />
    </article>
  );
};
