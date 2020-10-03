import { ICrosscheckSession } from '../storage/data/dataTypes';
import { dbCreateRecord } from './restapi-fb';

interface IAttendeeDb {
  taskId: string;
  sessionId: string;
  githubId: string;
  reviewerOf: string[];
}

export async function create(data: IAttendeeDb): Promise<string> {
  let key: string | null = null;
  try {
    const response = await dbCreateRecord('attendees', data);
    if (response.status < 300 && response.data?.name) {
      key = response.data.name;
    }
  } catch (ex) {
    return null;
  }
  return key;
}

export function shuffleStudents(session: ICrosscheckSession): IAttendeeDb[] {
  const result: IAttendeeDb[] = session.submited.map(e => ({
    githubId: e,
    sessionId: session.id,
    taskId: session.taskId,
    reviewerOf: [],
  }));
  for (let i = 0; i < session.desiredReviewersAmount; i += 1) {
    let list = [...session.submited];
    for (let y = 0; y < session.submited.length; y += 1) {
      const atGithubId = session.submited[y];
      const attendee = result.find(e => e.githubId === atGithubId);
      let githubId: string = null;
      let q = 0;
      while (!githubId && q < 10) {
        const id = list[Math.floor(Math.random() * list.length)];
        if (id !== atGithubId && !attendee.reviewerOf.find(a => a === id)) {
          githubId = id;
        } else {
          q += 1;
        }
      }
      list = list.filter(l => l !== githubId);
      if (githubId) {
        attendee.reviewerOf.push(githubId);
      }
    }
  }
  return result;
}
