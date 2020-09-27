/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { dbCreateRecord, dbDeleteReq, dbGetReq, dbPatchReqByKey } from './restapi-fb';

interface IStudentTask {
  sessionId: string,
  githubIds: string[]
}

export function mapDbToDomain(data: any): string {
  return data.githubId as string;
}

export async function getGithubIdBySessionId(key: string): Promise<IStudentTask> {
  const response = await dbGetReq('studentsTasks', 'sessionId', key);
  const result = Object.keys(response.data)
    .map<string>(e => mapDbToDomain(response.data[e]));
  return { sessionId: key, githubIds: result };
}
