import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { TStore } from '../../storage';
import * as dataActions from '../../storage/data/actions';
import * as dataSelectors from '../../storage/data/selectors';
import { ITask } from '../../storage/data/dataTypes';
import Loading from '../_Common/loading';
import AddTask from '../AddTask';
import getTableColumns from './tableConfig';

const Tasks: FC = () => {
  const [seletedTask, setSeletedTask] = useState<ITask>(null);
  const [visible, setVisible] = useState(false);

  function showModal(id?: ITask) {
    if (id) {
      setSeletedTask(id);
    }
    setVisible(true);
  }

  function closeModal() {
    setVisible(false);
    setSeletedTask(null);
  }

  const dispatch = useDispatch();
  const tasks = useSelector<TStore, ITask[] | null>(state => dataSelectors.tasks(state));
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
      <Button onClick={() => showModal()}>
        <i className="fas fa-plus" />
        Add Task
      </Button>
      <div>
        <Table
          rowKey="id"
          columns={getTableColumns(showModal)}
          pagination={{ position: ['bottomLeft'] }}
          dataSource={tasks}
        />
      </div>
      <AddTask visible={visible} closeModal={closeModal} task={seletedTask} />
    </>
  );
};

export default Tasks;
