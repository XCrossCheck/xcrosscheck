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
        selectedTask?.availableToSubmit &&
        new Date(selectedTask.deadlineSubmit) < now &&
        new Date(selectedTask.deadlineReview) > now;
    }
  }
  console.log(canProceed);
  return (
    <>
      {selectedTask?.availableToSubmit && (
        <Title level={5} style={{ marginBottom: '2rem' }}>
          <span className="warning">Attention!</span> You should review more than{' '}
          {selectedTask.minReiewsAmount} tasks {selectedTask.name} before{' '}
          {new Date(selectedTask.deadlineReview).toLocaleString().slice(0, -3)}
        </Title>
      )}
      <Select
        defaultValue={selectedTask?.name}
        placeholder="Select task"
        style={{ width: 360 }}
        onChange={value => {
          const task = tasks.find(t => t.name === value);
          if (task) {
            onChange(task);
          }
        }}
        loading={!tasks.length}
      >
        {tasks.map(({ name }) => (
          <Option key={name} value={name}>
            {name}
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
