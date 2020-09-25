import React, { FC, useEffect, useState } from 'react';
import './Review.css';
import { Button, Select, Typography } from 'antd';
import { Task } from './types';
import { getTasks } from '../services/getTasks';

const { Option } = Select;
const { Title } = Typography;

export const SelectTask: FC<{
  onNext: () => void;
  onChange: (task: Task) => void;
  selectedTask?: Task;
  mode: 'submit' | 'review';
}> = ({ onNext, onChange, selectedTask, mode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(agregatedTasks => setTasks(agregatedTasks));
  }, []);

  let canProceed = false;

  if (selectedTask) {
    const now = new Date();
    if (mode === 'review') {
      canProceed =
        new Date(selectedTask.deadlineSubmit) < now && new Date(selectedTask.deadlineReview) > now;
    }
  }

  return (
    <>
      {selectedTask ? (
        <Title level={5} style={{ marginBottom: '2rem' }}>
          <span className="warning">Attention!</span> You should review more then three tasks
          {selectedTask.taskId} before{' '}
          {new Date(selectedTask.deadlineReview).toLocaleString().slice(0, -3)}
        </Title>
      ) : null}
      <Select
        defaultValue={selectedTask?.taskId}
        placeholder="Select task"
        style={{ width: 360 }}
        onChange={value => {
          const task = tasks.find(t => t.taskId === value);
          if (task) {
            onChange(task);
          }
        }}
        loading={!tasks.length}
      >
        {tasks.map(({ taskId }) => (
          <Option key={taskId} value={taskId}>
            {taskId}
          </Option>
        ))}
      </Select>
      {canProceed && (
        <>
          <Button
            onClick={onNext}
            type="primary"
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            Next
          </Button>
        </>
      )}
      {!canProceed && selectedTask && (
        <div className="warning">Deadline has passed or time to check has not come yet </div>
      )}
    </>
  );
};
