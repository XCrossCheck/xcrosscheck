import { Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table/Table';
import React from 'react';
import { ISubmit, IFilters } from './types';

const getTableColumns = (filters: IFilters): ColumnsType<ISubmit> => {
  const config: ColumnsType<ISubmit> = [
    {
      title: 'Task Name',
      key: 'taskName',
      render: (val, rec) => rec.taskName,
      sorter: (a, b) => (a.taskName > b.taskName ? 1 : -1),
      filters: filters.tasks.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.taskName.includes(val as string),
    },
    {
      title: 'State',
      key: 'state',
      render: (val, rec) => <Tag color="green">{rec.status.toUpperCase()}</Tag>,
      sorter: (a, b) => (a.status > b.status ? 1 : -1),
      filters: filters.statuses.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.taskName.includes(val as string),
    },
    {
      title: 'Student Github ID',
      key: 'githubId',
      render: (val, rec) => rec.studentGithubId,
      sorter: (a, b) => (a.studentGithubId > b.studentGithubId ? 1 : -1),
      filters: filters.students.map(e => ({ text: e, value: e })),
      onFilter: (val, rec) => rec.taskName.includes(val as string),
    },
  ];
  return config;
};

export default getTableColumns;
