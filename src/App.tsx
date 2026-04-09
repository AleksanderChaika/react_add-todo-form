import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState<boolean>(false);
  const [errorUser, setErrorUser] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;
    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      setErrorTitle(true);
      hasError = true;
    }

    if (user === '') {
      setErrorUser(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const ids = todos.map(todo => todo.id);
    const maxId = Math.max(...ids);
    const newId = maxId + 1;

    const selectedUserId = Number(user);
    const selectedUser = usersFromServer.find(
      currentUser => currentUser.id === selectedUserId,
    );

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title: trimmedTitle,
      userId: selectedUserId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUser('');
    setErrorTitle(false);
    setErrorUser(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>

          <select
            id="user"
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setErrorUser(false);
            }}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(currentUser => (
              <option key={currentUser.id} value={currentUser.id}>
                {currentUser.name}
              </option>
            ))}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
