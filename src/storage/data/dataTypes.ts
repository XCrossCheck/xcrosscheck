export interface IAttendee {
  githubId: string;
  reviewerOf: string[];
}
export interface ICrosscheckSessionDb {
  attendees: IAttendee[];
  coefficient: number;
  deadlineReview: Date;
  deadlineSubmit: Date;
  desiredReviewersAmount: number;
  discardMaxScore: boolean;
  discardMinScore: boolean;
  minReiewsAmount: number;
  startDate: Date;
  state: string;
  taskId: string;
}

export interface ICrosscheckSession extends ICrosscheckSessionDb {
  id: string;
}

export interface IItem {
  category: string;
  description: string;
  id: string;
  maxScore: number;
  minScore: number;
  title: string;
}

export interface ITask extends ITaskDb {
  id: string;
}


export interface ITaskDb {
  name: string;
  description: string;
  demoUrl?: string;
  repoName?: string;
  branchName?: string;
  screenshot?: string;
  author: string;
  state: string;
  categoriesOrder: string[];
  items: IItem[];
}