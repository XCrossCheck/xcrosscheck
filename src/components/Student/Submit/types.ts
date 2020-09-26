export interface Task {
  taskId: string;
  name: string;
  deadlineSubmit: string;
  deadlineReview: string;
  availableToSubmit: boolean;
}

export interface Submission {
  taskId: string;
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
