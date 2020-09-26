/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ICrosscheckSession, ICrosscheckSessionDb } from '../storage/data/dataTypes';
import { dbGetReq, dbCreateRecord, dbDeleteReq, dbPatchReqByKey } from './restapi-fb';
import { parseDate } from './utils';


export function mapDomainToDb(data: ICrosscheckSession): ICrosscheckSessionDb {
  return {
    attendees: data.attendees,
    coefficient: data.coefficient,
    deadlineReview: data.deadlineReview,
    deadlineSubmit: data.deadlineSubmit,
    desiredReviewersAmount: data.desiredReviewersAmount,
    discardMaxScore: data.discardMaxScore,
    discardMinScore: data.discardMinScore,
    minReiewsAmount: data.minReiewsAmount,
    startDate: data.startDate,
    state: data.state,
    taskId: data.taskId,
  };
}

export function mapDbToDomain(data: any, key: string): ICrosscheckSession {
  return {
    attendees: data.attendees,
    coefficient: data.coefficient,
    deadlineReview: parseDate(data.deadlineReview),
    deadlineSubmit: parseDate(data.deadlineSubmit),
    desiredReviewersAmount: data.desiredReviewersAmount,
    discardMaxScore: data.discardMaxScore,
    discardMinScore: data.discardMinScore,
    id: key,
    minReiewsAmount: data.minReiewsAmount,
    startDate: parseDate(data.startDate),
    state: data.state,
    taskId: data.taskId,
  };
}

export async function get(): Promise<ICrosscheckSession[]> {
  const response = await dbGetReq('crossCheckSession');
  const result = Object.keys(response.data)
    .map<ICrosscheckSession>(key => mapDbToDomain(response.data[key], key));
  return result;
}

export async function getByKey(key: string): Promise<ICrosscheckSession> {
  const response = await dbGetReq(`crossCheckSession/${key}`);
  return mapDbToDomain(response.data, key);
}

export async function create(data: ICrosscheckSessionDb): Promise<string> {
  let key: string | null = null;
  try {
    const response = await dbCreateRecord('crossCheckSession', data);
    if (response.status < 300 && response.data?.name) {
      key = response.data.name;
    }
  } catch (ex) {
    return null;
  }
  return key;
}

export async function update(data: ICrosscheckSessionDb, key: string): Promise<boolean> {
  try {
    const response = await dbPatchReqByKey('crossCheckSession', key, data);
    if (response.status < 300) {
      return true;
    }
  } catch (ex) {
    return false;
  }
  return false;
}

export async function del(id: string): Promise<boolean> {
  try {
    const response = await dbDeleteReq('crossCheckSession', id);
    if (response.status < 300) {
      return true;
    }
  } catch (ex) {
    return false;
  }
  return false;
}