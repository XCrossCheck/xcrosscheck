import React, { FC } from 'react';
import { Button, Space } from 'antd';
import { CheckScore } from 'src/types/Criteria';
import { AggregatedTask } from '../services/getTasks';
import { CheckForm } from '../CheckForm/CheckForm';

interface Props {
  onNext: () => void;
  onBack: () => void;
  task: AggregatedTask;
  setSelfCheck: (selfCheck: CheckScore) => void;
}

export const SelfCheck: FC<Props> = ({ onBack, onNext, task, setSelfCheck }) => (
  <div>
    <Space direction="vertical">
      <CheckForm
        onFinish={values => {
          setSelfCheck(values);
          onNext();
        }}
        task={task}
      />
      <Button onClick={onBack}>Back</Button>
    </Space>
  </div>
);
