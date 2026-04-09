import { User } from './user';

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
};
