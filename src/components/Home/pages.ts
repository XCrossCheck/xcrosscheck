import { FC } from 'react';
import StudentPage from '../Student';
import StudentSubmitPage from '../Student/Submit';
import StudentReviewPage from '../Student/Review';
import Tasks from '../Tasks';
import { StudentScorePage } from '../Student/Submit/ScorePage';
import StudentsSubmitList from '../SubmitList';
import CrossCheck from '../CrossCheck';

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
    component: StudentScorePage,
    title: 'Score',
    url: '/score/:taskId',
    role: 'student',
    exact: true,
    isTab: true,
  },
  {
    component: Tasks,
    title: 'Tasks',
    url: '/',
    role: 'author',
    exact: true,
    isTab: true,
  },
  {
    component: CrossCheck,
    title: 'Cross Check',
    url: '/crosscheck',
    role: 'author',
    exact: true,
    isTab: true,
  },
  {
    component: StudentsSubmitList,
    title: 'Students submit list',
    url: '/studentssubmitlist',
    role: 'author',
    exact: true,
    isTab: true,
  },
];

export default pages;
