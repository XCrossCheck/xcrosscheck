import { FC } from 'react';
import StudentPage from '../Student';
import StudentSubmitPage from '../Student/Submit';
import StudentReviewPage from '../Student/Review';
import AddTask from '../AddTask';

export type TPage = {
  component: FC<any>;
  title: string;
  url: string;
  role: string;
  exact: boolean;
};

const pages: TPage[] = [
  {
    component: StudentPage,
    title: 'Student Page',
    url: '/student',
    role: 'student',
    exact: true,
  },
  {
    component: StudentReviewPage,
    title: 'Student Review Page',
    url: '/student/review',
    role: 'student',
    exact: true,
  },
  {
    component: StudentSubmitPage,
    title: 'Student Submit Page',
    url: '/student/submit',
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
