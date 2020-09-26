import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import { ITask } from '../../storage/data/dataTypes';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';

const tableColumns: ColumnsType<ITask> = [
  {
    title: 'Task Name',
    key: 'taskName',
    render: (val, rec) => (
      <EditTask text={rec.name} task={rec}/>
    ),
    sorter: (a, b) => a.name > b.name ? 1 : -1
  },
  {
    title: 'Action',
    key: 'action',
    render: (val, rec) => (
      <>
        <EditTask task={rec}>
          <i className='fas fa-pencil-alt' />
        </EditTask>
        <DeleteTask id={rec.id}/>
      </>
    ),
  },
];

export default tableColumns;