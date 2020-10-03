import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import { ITask } from '../../storage/data/dataTypes';
import DeleteTask from './DeleteTask';

export interface IFilters {
  tasks: string[];
  statuses: string[];
  authors: string[];
}

function getTableColumns(editTask: (task: ITask) => void, filters: IFilters): ColumnsType<ITask> {
  return [
    {
      title: 'Task Name',
      key: 'taskName',
      render: (val, rec) => <Button type="link" onClick={() => editTask(rec)}>{rec.name}</Button>,
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
      filters: filters.tasks.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.name.includes(val as string),
    },
    {
      title: 'State',
      key: 'state',
      render: (val, rec) => <Tag color="green">{rec.state.toUpperCase()}</Tag>,
      sorter: (a, b) => (a.state > b.state ? 1 : -1),
      filters: filters.statuses.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.state.includes(val as string),
    },
    {
      title: 'Author',
      key: 'author',
      render: (val, rec) => rec.author,
      sorter: (a, b) => (a.author > b.author ? 1 : -1),
      filters: filters.authors.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.author.includes(val as string),
    },
    {
      title: 'Action',
      key: 'action',
      render: (val, rec) => (
        <>
          {rec.state === 'COMPLETED' ? null : (
            <Button type="text" onClick={() => editTask(rec)}>
              <i className="fas fa-pencil-alt" />
            </Button>
          )}
          {rec.state === 'DRAFT' ? <DeleteTask id={rec.id} /> : null}
        </>
      ),
    },
  ];
}

export default getTableColumns;
