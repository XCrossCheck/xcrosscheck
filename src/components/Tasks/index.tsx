import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { TStore } from '../../storage';
import * as dataActions from '../../storage/data/actions';
import * as dataSelectors from '../../storage/data/selectors';
import { ITask } from '../../storage/data/dataTypes';
import Loading from '../_Common/loading';
import tableColumns from './tableConfig';
import AddTask from '../AddTask';


const Tasks: FC = () => {

  const [visible, setVisible] = useState(false);

  function showModal() {
    setVisible(true);
  }

  const dispatch = useDispatch();
  const tasks = useSelector<TStore, ITask[] | null>((state) => dataSelectors.tasks(state));
  const getTasks = () => dispatch(dataActions.tasks.get());
  const clearTasks = () => dispatch(dataActions.tasks.clear());
  
  useEffect(() => {
    getTasks();
    return () => {
      clearTasks();
    };
  }, []);

  if (!tasks) {
    return <Loading />;
  }
  return (
    <>
      <Button onClick={showModal}>
          <i className="fas fa-plus" />
          Add Task
      </Button>
      <AddTask visible={visible} setVisible={setVisible}/>
      <div>
          <Table
            rowKey="id" 
            columns={tableColumns}
            pagination={{ position: ['bottomLeft'] }}
            dataSource={tasks}
          />
      </div>
    </>
  );
};

export default Tasks;
