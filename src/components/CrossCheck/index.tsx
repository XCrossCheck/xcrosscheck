import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { TStore } from '../../storage';
import * as dataActions from '../../storage/data/actions';
import * as dataSelectors from '../../storage/data/selectors';
import { ITask, ICrosscheckSession } from '../../storage/data/dataTypes';
import Loading from '../_Common/loading';
import { ICrosscheckSessionList } from './types';
import tableColumns from './tableConfig';
import EditForm from './EditForm';

const CrossCheck: FC = () => {

  const [visible, setVisible] = useState(false);

  function showModal() {
    setVisible(true);
  }

  const dispatch = useDispatch();
  const tasks = useSelector<TStore, ITask[] | null>((state) => dataSelectors.tasks(state));
  const crosscheckSessions = useSelector<TStore, ICrosscheckSession[] | null>((state) => 
    dataSelectors.croscheckSessions(state));
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
      const result = crosscheckSessions.map<ICrosscheckSessionList>(e => {
        const task = tasks.find((t) => t.id === e.taskId);
        const item: ICrosscheckSessionList = {
          ...e,
          task,
        };
        return item;
      });
      console.log('memo', result);
      return result;
    }
    return null;
  }, [tasks, crosscheckSessions]);

  if (!list) {
    return <Loading />;
  }
  return (
    <>
      <Button onClick={showModal}>
          <i className="fas fa-plus" />
          Add Session
      </Button>
      <EditForm visible={visible} setVisible={setVisible}/>
      <div>
          <Table
            rowKey="id" 
            columns={tableColumns}
            pagination={{ position: ['bottomLeft'] }}
            dataSource={list}
          />
      </div>
    </>
  );
};

export default CrossCheck;
