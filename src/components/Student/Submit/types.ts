import { Criteria } from 'src/types/Criteria';

export interface Task {
  taskId: string;
  name: string;
  deadlineSubmit: string;
  deadlineReview: string;
  availableToSubmit: boolean;
  state: string;
  coefficient: number;
  desiredReviewersAmount: number;
  discardMaxScore: boolean;
  discardMinScore: boolean;
  minReiewsAmount: number;
  startDate: string;
  basic: Criteria[];
  extra: Criteria[];
  fines: Criteria[];
}

export interface Submission {
  taskId: string;
  githubId: string;
  repoLink: string;
  demoLink: string;
  submittedAt: string;
  selfCheckScore: string;
}

export interface Links {
  demoLink: string;
  repoLink: string;
}

export interface SubmitInfo extends Submission {
  githubId: string;
}
