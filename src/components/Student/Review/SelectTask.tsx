import React, { FC, useEffect, useState } from 'react';
import './Review.css';
import {
  Button, Form, Select, Typography, Space,
} from 'antd';
import { Task } from './types';

const { Option } = Select;
const { Text, Paragraph, Title } = Typography;
const tasksMock: Task[] = [
  {
    id: 'Songbird',
    availableToSubmit: true,
    deadlineReview: '2020-09-20 23:59:59',
    deadlineSubmit: '2020-09-14 23:59:59',
  },
  {
    id: 'RS Lang',
    availableToSubmit: false,
    deadlineReview: '2020-09-13 23:59:59',
    deadlineSubmit: '2020-09-12 23:59:59',
  },
  {
    id: 'X-Check',
    availableToSubmit: true,
    deadlineReview: '2020-09-20 23:59:59',
    deadlineSubmit: '2020-09-20 23:59:59',
  },
];

export const SelectTask: FC<{
  onNext: () => void;
  onChange: (task: Task) => void;
  selectedTask?: Task;
  mode: 'submit' | 'review';
}> = ({
  onNext, onChange, selectedTask, mode,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      setTasks(tasksMock);
    }, 1500);
  }, []);

  let canProceed = false;

  if (selectedTask) {
    const now = new Date();
    if (mode === 'review') {
      canProceed = new Date(selectedTask.deadlineSubmit) < now
        && new Date(selectedTask.deadlineReview) > now;
    }
  }

  return (
    <>
      {selectedTask ? (
        <Title level={5} style={{ marginBottom: '2rem' }}>
          <span className="warning">Attention!</span>
          {' '}
          You should review more
          then three tasks
          {selectedTask.id}
          {' '}
          before
          {' '}
          {new Date(selectedTask.deadlineReview).toLocaleString().slice(0, -3)}
        </Title>
      ) : null}
      <Select
        defaultValue={selectedTask?.id}
        placeholder="Select task"
        style={{ width: 360 }}
        onChange={(value) => {
          const task = tasks.find((t) => t.id === value);
          if (task) {
            onChange(task);
          }
        }}
        loading={!tasks.length}
      >
        {tasks.map(({ id }) => (
          <Option key={id} value={id}>
            {id}
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
        <div className="warning">
          Deadline has passed or time to check has not come yet
          {' '}
        </div>
      )}
    </>
  );
};
