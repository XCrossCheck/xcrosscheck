import { FC } from 'react';
import StudentPage from '../StudentPage';

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
];

export default pages;
