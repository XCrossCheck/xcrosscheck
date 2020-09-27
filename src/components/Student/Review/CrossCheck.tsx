import React, { FC } from 'react';
import { Button, Space } from 'antd';
import { AggregatedTask } from '../services/getTasks';
import { CheckForm } from '../CheckForm/CheckForm';

interface Props {
  onNext: () => void;
  onBack: () => void;
  task: AggregatedTask;
}

export const CrossCheck: FC<Props> = ({ onBack, onNext, task }) => (
  <div>
    <Space direction="vertical">
      <CheckForm
        onFinish={values => {
          console.info(values);
          onNext();
        }}
        task={task}
      />
      <Button onClick={onBack}>Back</Button>
    </Space>
  </div>
);
