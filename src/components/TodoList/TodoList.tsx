import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

type Props = {
  todos: Todo[];
  users?: User[];
};

export const TodoList = ({ todos, users = [] }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const foundUser = users.find(user => user.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={foundUser} />;
      })}
    </section>
  );
};
