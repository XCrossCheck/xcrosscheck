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
  key: string;
}


export interface ITaskDb {
  author: string;
  availableToSubmit: boolean;
  categoriesOrder: string[];
  id: string;
  items: IItem[];
  name: string;
  state: string;
}