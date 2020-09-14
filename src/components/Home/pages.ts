import { FC } from 'react';
import StudentPage from '../StudentPage';
import AddTask from '../AddTask';

export type TPage= {
  component: FC<any>,
  title: string,
  url: string,
  role: string,
  exact: boolean,
};

const pages: TPage[] = [
  {
    component: StudentPage,
    title: 'Student Page',
    url: '/',
    role: 'student',
    exact: true,
  },
  {
    component: AddTask,
    title: 'Add task',
    url: '/',
    role: 'author',
    exact: true,
  },
];

export default pages;
