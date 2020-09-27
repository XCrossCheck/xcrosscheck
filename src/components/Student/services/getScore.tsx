import { dbGetReq } from '../../../service/restapi-fb';
import { Dispute, Review } from '../Review/types';

export interface ScoreRes {
  'crossCheckScore': string;
  'feedback': string;
  'reviewId': string;
  'recipient': string;
  'sender': string;
  'taskId': string;
}

export function getStudentScore(): Promise<Review[]> {
  return dbGetReq('studentScore').then(score => {
    return Object.entries<Review>(score.data).map(([key, value]) => {
      return {
        ...value,
        reviewId: key,
      };
    });
  });
}

export function getReviewScore(taskId: string, myGitHub: string) {
  return getStudentScore().then(res => {
    const reviewScore = res.filter(user => user.sender === myGitHub && user.taskId === taskId);
    return reviewScore;
  });
}

export function getReceivedScore(taskId: string, myGitHub: string) {
  return getStudentScore().then(res => {
    const receivedScore = res.filter(user => user.recipient === myGitHub && user.taskId === taskId);
    return receivedScore;
  });
}
export interface Feedback {
  feedbackId: string;
  items: {
    basic_p1: {
      comment: string;
      score: string;
    };
    extra_p1: {
      comment: string;
      score: string;
    };
    fines_p1: {
      comment: string;
      score: string;
    };
    taskId: string;
  };
}

export function getDetailedFeedback(feedbackId: string) {
  return dbGetReq('taskScore').then(score =>
    Object.values<Feedback>(score.data).find(t => t.feedbackId === feedbackId)
  );
}

export function getDisputes() {
  return dbGetReq('dispute').then(res => {
    return Object.values<Dispute>(res.data);
  });
}
