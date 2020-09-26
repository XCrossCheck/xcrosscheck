import { dbGetReq } from '../../../service/restapi-fb';

export interface ScoreRes {
  'crossCheckScore': string;
  'feedback': string;
  'feedbackId': string;
  'recipient': string;
  'sender': string;
  'taskId': string;
}

export function getReviewScore(taskId: string, myGitHub: string) {
  return dbGetReq('studentScore').then(scoreRes => {
    const reviewScore = Object.values(scoreRes.data)
      .filter((user: ScoreRes) => user.sender === myGitHub)
      .filter((t: ScoreRes) => t.taskId === taskId);
    return reviewScore;
  });
}

export function getReceivedScore(taskId: string, myGitHub: string) {
  return dbGetReq('studentScore').then(scoreRes => {
    const receivedScore = Object.values(scoreRes.data)
      .filter((user: ScoreRes) => user.recipient === myGitHub)
      .filter((t: ScoreRes) => t.taskId === taskId);
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
