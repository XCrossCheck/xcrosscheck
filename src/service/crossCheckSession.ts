/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ICrosscheckSession, ICrosscheckSessionDb } from '../storage/data/reducer';
import { dbGetReq, dbCreateRecord, dbDeleteReq, dbPatchReqByKey } from './restapi-fb';

const parseDate = (str: string): Date => 
  !Number.isNaN(Date.parse(str)) ? new Date(str) : null;

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

export async function getSessions(): Promise<ICrosscheckSession[]> {
  const response = await dbGetReq('crossCheckSession');
  const result = Object.keys(response.data).map<ICrosscheckSession>(key => ({
    attendees: response.data[key].attendees,
    coefficient: response.data[key].coefficient,
    deadlineReview: parseDate(response.data[key].deadlineReview),
    deadlineSubmit: parseDate(response.data[key].deadlineSubmit),
    desiredReviewersAmount: response.data[key].desiredReviewersAmount,
    discardMaxScore: response.data[key].discardMaxScore,
    discardMinScore: response.data[key].discardMinScore,
    id: key,
    minReiewsAmount: response.data[key].minReiewsAmount,
    startDate: parseDate(response.data[key].startDate),
    state: response.data[key].state,
    taskId: response.data[key].taskId,
  }));
  return result;
}

export async function createSession(data: ICrosscheckSessionDb): Promise<string> {
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

export async function updateSession(data: ICrosscheckSessionDb, key: string): Promise<boolean> {
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

export async function deleteSession(id: string): Promise<boolean> {
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