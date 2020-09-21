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
  isTab: boolean;
};

const pages: TPage[] = [
  {
    component: StudentPage,
    title: 'Home Page',
    url: '/',
    role: 'student',
    exact: true,
    isTab: true,
  },
  {
    component: StudentReviewPage,
    title: 'Review',
    url: '/review',
    role: 'student',
    exact: true,
    isTab: true,
  },
  {
    component: StudentSubmitPage,
    title: 'Submit',
    url: '/submit',
    role: 'student',
    exact: true,
    isTab: true,
  },
  {
    component: AddTask,
    title: 'Add task',
    url: '/',
    role: 'author',
    exact: true,
    isTab: true,
  },
];

export default pages;
