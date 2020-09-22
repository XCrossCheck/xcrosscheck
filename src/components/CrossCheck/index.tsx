import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStore } from '../../storage';
import * as dataActions from '../../storage/data/actions';
import * as dataSelectors from '../../storage/data/selectors';
import { ITask, ICrosscheckSession } from '../../storage/data/reducer';
import Loading from '../_Common/loading';

const CrossCheck: FC = () => {

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

  if (!tasks || !crosscheckSessions) {
    return <Loading />;
  }
  return (
    <div>
      hi
    </div>
  );
};

export default CrossCheck;
