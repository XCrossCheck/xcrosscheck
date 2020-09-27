export interface Task {
  taskId: string;
  deadlineSubmit: string;
  deadlineReview: string;
  availableToSubmit: boolean;
  name: string;
  minReiewsAmount: number;
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

export interface Review {
  taskId: string;
  sender: string;
  recipient: string;
  crossCheckScore: string;
  reviewId: string;
  feedback: string;
}

export interface Attendees {
  githubId: string;
  taskId: string;
  reviewerOf: string[];
}

export interface Dispute {
  'items': {
    'basic_p1': {
      'comment': string;
      'suggestedScore': number;
    };
    'extra_p1': {
      'comment': string;
      'suggestedScore': number;
    };
    'fines_p1': {
      'comment': string;
      'suggestedScore': number;
    };
  };
  'taskId': string;
  'reviewId': string;
  'state': string;
}
