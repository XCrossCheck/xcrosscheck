import { Button, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import DeleteSession from './DeleteSession';
import { ICrosscheckSessionList, IFilters } from './types';

const getTableColumns = (editSession: (id?: string) => void, filters: IFilters): ColumnsType<ICrosscheckSessionList> => {
  const config: ColumnsType<ICrosscheckSessionList> =  [
    {
      title: 'Task Name',
      key: 'taskName',
      render: (val, rec) => (
        rec.state === 'COMPLETED' ? 
          rec.task.name 
          : (
          <Button onClick={() => editSession(rec.id)}>
            { rec.task.name }
          </Button>
          )
      ),
      sorter: (a, b) => a.task.name > b.task.name ? 1 : -1,
      filters: filters.tasks.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.task.name.includes(val as string),
    },
    {
      title: 'State',
      key: 'state',
      render: (val, rec) => (
        <Tag color='green'>
          {rec.state.toUpperCase()}
        </Tag>
      ),
      sorter: (a, b) => a.startDate > b.startDate ? 1 : -1,
      filters: filters.statuses.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.state.includes(val as string),
    },
    {
      title: 'Start Task',
      key: 'startTask',
      render: (val, rec) => (
        <>
          <p>{rec.startDate.toLocaleDateString()}</p>
          <p>{rec.startDate.toLocaleTimeString().slice(0, -3)}</p>
        </>
      ),
      sorter: (a, b) => a.startDate > b.startDate ? 1 : -1
    },
    {
      title: 'Review Deadline',
      key: 'reviewDeadline',
      render: (val, rec) => (
        <>
          <p>{rec.deadlineReview.toLocaleDateString()}</p>
          <p>{rec.deadlineReview.toLocaleTimeString().slice(0, -3)}</p>
        </>
      ),
      sorter: (a, b) => a.deadlineReview > b.deadlineReview ? 1 : -1
    },
    {
      title: 'Action',
      key: 'action',
      
      render: (val, rec) => (
        rec.state === 'COMPLETED' ? 
          null : 
        <>
          <Button onClick={() =>  editSession(rec.id)}>
              <i className='fas fa-pencil-alt' />
          </Button>
        {rec.state === 'DRAFT' ? 
           <DeleteSession id={rec.id}/> : null}
         
        </>
      ),
    },
  ];
  return config;
};

export default getTableColumns;