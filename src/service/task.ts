/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ITask, ITaskDb } from '../storage/data/dataTypes';
import { dbCreateRecord, dbDeleteReq, dbGetReq, dbPatchReqByKey } from './restapi-fb';

export function mapDomainToDb(data: ITask): ITaskDb {
  return {
    author: data.author,
    availableToSubmit: data.availableToSubmit,
    categoriesOrder: data.categoriesOrder,
    id: data.id,
    items: data.items,
    name: data.name,
    state: data.state,
  };
}

export function mapDbToDomain(data: any, key: string): ITask {
  return {
    author: data.author,
    availableToSubmit: data.availableToSubmit,
    categoriesOrder: data.categoriesOrder,
    id: data.id,
    items: data.items,
    name: data.name,
    state: data.state,
    key
  };
}

export async function get(): Promise<ITask[]> {
  const response = await dbGetReq('tasks');
  return Object.keys(response.data)
    .map<ITask>(key => mapDbToDomain(response.data[key], key));
}

export async function getByKey(key: string): Promise<ITask> {
  const response = await dbGetReq(`tasks/${key}`);
  return mapDbToDomain(response.data, key);
}

export async function create(data: ITaskDb): Promise<string> {
  let key: string | null = null;
  try {
    const response = await dbCreateRecord('tasks', data);
    if (response.status < 300 && response.data?.name) {
      key = response.data.name;
    }
  } catch (ex) {
    return null;
  }
  return key;
}

export async function update(data: ITaskDb, key: string): Promise<boolean> {
  try {
    const response = await dbPatchReqByKey('tasks', key, data);
    if (response.status < 300) {
      return true;
    }
  } catch (ex) {
    return false;
  }
  return false;
}

export async function del(key: string): Promise<boolean> {
  try {
    const response = await dbDeleteReq('tasks', key);
    if (response.status < 300) {
      return true;
    }
  } catch (ex) {
    return false;
  }
  return false;
}