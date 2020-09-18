export interface Task {
  id: string;
  deadlineSubmit: string;
  deadlineReview: string;
  availableToSubmit: boolean;
}

export interface Submission {
  taskId: string;
  userId: string;
  repoLink: string;
  demoLink: string;
  submittedAt: string;
  selfCheckScore: string;
}

export interface Links {
  demoLink: string;
  repoLink: string;
}

export interface Submission2 {
  taskId: string;
  sender: string;
  recipient: string;
  crossCheckScore: string;
  feedbackId: string;
  feedback: string;
}
