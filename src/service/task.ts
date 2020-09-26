/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ITask } from '../storage/data/reducer';
import { dbGetReq } from './restapi-fb';

export async function getTasks(): Promise<ITask[]> {
  const response = await dbGetReq('tasks');
  return Object.keys(response.data).map<ITask>(key => ({
    author: response.data[key].author,
    availableToSubmit: response.data[key].availableToSubmit,
    categoriesOrder: response.data[key].categoriesOrder,
    id: response.data[key].id,
    key,
    items: response.data[key].items,
    name: response.data[key].name,
    state: response.data[key].state,
  }));
}