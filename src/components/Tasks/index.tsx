import React, { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { TStore } from '../../storage';
import * as dataActions from '../../storage/data/actions';
import * as dataSelectors from '../../storage/data/selectors';
import { ITask } from '../../storage/data/dataTypes';
import Loading from '../_Common/loading';
import AddTask from '../AddTask';
import getTableColumns, { IFilters } from './tableConfig';

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

  const filters = useMemo<IFilters>(() => {
    if (tasks) {
      const tasksFilter = tasks.map(e => e.name).filter((v, i, s) => s.indexOf(v) === i);
      const statusesFilter = tasks.map(e => e.state).filter((v, i, s) => s.indexOf(v) === i);
      const authorsFilter = tasks.map(e => e.author).filter((v, i, s) => s.indexOf(v) === i);
      return {
        statuses: statusesFilter,
        tasks: tasksFilter,
        authors: authorsFilter,
      };
    }
    return {
      statuses: [],
      tasks: [],
      authors: [],
    };
  }, [tasks]);

  if (!tasks) {
    return <Loading />;
  }
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
      <Button type="primary" onClick={() => showModal()}>
        <i style={{ marginRight: '5px' }} className="fas fa-plus" />
        Add Task
      </Button>
    </div>
      <div>
        <Table
          rowKey="id"
          columns={getTableColumns(showModal, filters)}
          pagination={{ position: ['bottomLeft'] }}
          dataSource={tasks}
        />
      </div>
      <AddTask visible={visible} closeModal={closeModal} task={seletedTask} />
    </>
  );
};

export default Tasks;
