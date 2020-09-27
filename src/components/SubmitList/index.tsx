import { Button, Table } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as dataActions from '../../storage/data/actions';
import { TStore } from '../../storage';
import { ICrosscheckSession, ITask } from '../../storage/data/dataTypes';
import { ISubmit, IFilters } from './types';
import * as dataSelectors from '../../storage/data/selectors';
import getTableColumns from './tableConfig';
import Loading from '../_Common/loading';

const StudentsSubmitList: FC = () => {
  const [showArchive, setShowArchive] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector<TStore, ITask[] | null>(state => dataSelectors.tasks(state));
  const crosscheckSessions = useSelector<TStore, ICrosscheckSession[] | null>(state =>
    dataSelectors.croscheckSessions(state)
  );
  const getTasks = () => dispatch(dataActions.tasks.get());
  const getCrosscheckSessions = () => dispatch(dataActions.crosscheckSessions.get());
  const clearTasks = () => dispatch(dataActions.tasks.clear());
  const clearCrosscheckSessions = () => dispatch(dataActions.crosscheckSessions.clear());

  useEffect(() => {
    getTasks();
    getCrosscheckSessions();
    return () => {
      clearTasks();
      clearCrosscheckSessions();
    };
  }, []);

  const list = useMemo<ISubmit[] | null>(() => {
    if (tasks && crosscheckSessions) {
      const result: ISubmit[] = [];
      let i = 0;
      crosscheckSessions
        .filter(e => (showArchive ? e.state === 'COMPLETED' : e.state !== 'COMPLETED'))
        .forEach(e => {
          const task = tasks.find(t => t.id === e.taskId);
          let status: string = null;
          switch (e.state) {
            case 'REQUESTS_GATHERING':
              status = 'SUBMITTED';
              break;
            case 'CROSS_CHECK':
              status = 'CROSS CHECK';
              break;
            case 'COMPLETED':
              status = 'COMPLETED';
              break;
            default:
              break;
          }
          e.submited.forEach(el => {
            i += 1;
            result.push({
              id: `${task.id}_${el}_${i}`,
              taskName: task.name,
              studentGithubId: el,
              status,
            });
          });
        });
      return result;
    }
    return null;
  }, [tasks, crosscheckSessions, showArchive]);

  const filters = useMemo<IFilters>(() => {
    if (list) {
      const tasksFilter = list.map(e => e.taskName).filter((v, i, s) => s.indexOf(v) === i);
      const studentsFilter = list
        .map(e => e.studentGithubId)
        .filter((v, i, s) => s.indexOf(v) === i);
      const statusesFilter = list.map(e => e.status).filter((v, i, s) => s.indexOf(v) === i);
      return {
        statuses: statusesFilter,
        students: studentsFilter,
        tasks: tasksFilter,
      };
    }
    return {
      statuses: [],
      students: [],
      tasks: [],
    };
  }, [list]);

  if (!list) {
    return <Loading />;
  }
  return (
    <>
      <Button onClick={() => setShowArchive(s => !s)}>
        {showArchive ? 'Show active' : 'Show complited'}
      </Button>
      <Table
        rowKey="id"
        columns={getTableColumns(filters)}
        pagination={{ position: ['bottomLeft'] }}
        dataSource={list}
      />
    </>
  );
};

export default StudentsSubmitList;
