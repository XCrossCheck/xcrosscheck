import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import DeleteSession from './DeleteSession';
import EditSession from './EditSession';
import { ICrosscheckSessionList } from './types';

const tableColumns: ColumnsType<ICrosscheckSessionList> = [
  {
    title: 'Task Name',
    key: 'taskName',
    render: (val, rec) => <EditSession text={rec.task?.name} session={rec} />,
    sorter: (a, b) => (a.task?.name > b.task?.name ? 1 : -1),
  },
  {
    title: 'State',
    key: 'state',
    render: (val, rec) => <Tag color="green">{rec.state.toUpperCase()}</Tag>,
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
    sorter: (a, b) => (a.startDate > b.startDate ? 1 : -1),
  },
  {
    title: 'Review Dedlain',
    key: 'reviewDedlain',
    render: (val, rec) => (
      <>
        <p>{rec.deadlineReview.toLocaleDateString()}</p>
        <p>{rec.deadlineReview.toLocaleTimeString().slice(0, -3)}</p>
      </>
    ),
    sorter: (a, b) => (a.deadlineReview > b.deadlineReview ? 1 : -1),
  },
  {
    title: 'Action',
    key: 'action',
    render: (val, rec) => (
      <>
        <EditSession session={rec}>
          <i className="fas fa-pencil-alt" />
        </EditSession>
        <DeleteSession id={rec.id} />
      </>
    ),
  },
];

export default tableColumns;
