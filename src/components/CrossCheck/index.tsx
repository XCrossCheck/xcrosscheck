import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { TStore } from '../../storage';
import * as dataActions from '../../storage/data/actions';
import * as dataSelectors from '../../storage/data/selectors';
import { ITask, ICrosscheckSession } from '../../storage/data/dataTypes';
import Loading from '../_Common/loading';
import { ICrosscheckSessionList, IFilters } from './types';
import EditForm from './EditForm';
import getTableColumns from './tableConfig';

const CrossCheck: FC = () => {
  const [seletedSessionId, setSeletedSessionId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  function showModal(id?: string) {
    if (id) {
      setSeletedSessionId(id);
    }
    setVisible(true);
  }

  function closeModal() {
    setVisible(false);
    setSeletedSessionId(null);
  }

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

  const list = useMemo<ICrosscheckSessionList[] | null>(() => {
    if (tasks && crosscheckSessions) {
      const result = crosscheckSessions
        .filter(e => (showArchive ? e.state === 'COMPLETED' : e.state !== 'COMPLETED'))
        .map<ICrosscheckSessionList>(e => {
        const task = tasks.find(t => t.id === e.taskId);
        const item: ICrosscheckSessionList = {
          ...e,
          task,
        };
        return item;
      });
      return result;
    }
    return null;
  }, [tasks, crosscheckSessions, showArchive]);

  const filters = useMemo<IFilters>(() => {
    if (list) {
      const tasksFilter = list.map(e => e.task.name).filter((v, i, s) => s.indexOf(v) === i);
      const statusesFilter = list.map(e => e.state).filter((v, i, s) => s.indexOf(v) === i);
      return {
        statuses: statusesFilter,
        tasks: tasksFilter,
      };
    }
    return {
      statuses: [],
      tasks: [],
    };
  }, [list]);

  const seletedSession = useMemo(() => list?.find(e => e.id === seletedSessionId), [
    list,
    seletedSessionId,
  ]);

  if (!list) {
    return <Loading />;
  }
  return (
    <>
      <Button onClick={() => showModal(null)}>
        <i className="fas fa-plus" />
        Add Session
      </Button>
      <Button onClick={() => setShowArchive(s => !s)}>
        {showArchive ? 'Show active' : 'Show complited'}
      </Button>
      <EditForm visible={visible} closeModal={closeModal} session={seletedSession} />
      <div>
        <Table
          rowKey="id"
          columns={getTableColumns(showModal, filters)}
          pagination={{ position: ['bottomLeft'] }}
          dataSource={list}
        />
      </div>
    </>
  );
};

export default CrossCheck;
