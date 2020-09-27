import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import { ITask } from '../../storage/data/dataTypes';
import DeleteTask from './DeleteTask';

function getTableColumns(editTask: (task: ITask) => void): ColumnsType<ITask> {
  return [
    {
      title: 'Task Name',
      key: 'taskName',
      render: (val, rec) => <Button onClick={() => editTask(rec)}>{rec.name}</Button>,
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'State',
      key: 'state',
      render: (val, rec) => <Tag color="green">{rec.state.toUpperCase()}</Tag>,
      sorter: (a, b) => (a.state > b.state ? 1 : -1),
    },
    {
      title: 'Author',
      key: 'author',
      render: (val, rec) => rec.author,
      sorter: (a, b) => (a.author > b.author ? 1 : -1),
    },
    {
      title: 'Action',
      key: 'action',
      render: (val, rec) => (
        <>
          <Button onClick={() => editTask(rec)}>
            <i className="fas fa-pencil-alt" />
          </Button>
          <DeleteTask id={rec.id} />
        </>
      ),
    },
  ];
}

export default getTableColumns;
