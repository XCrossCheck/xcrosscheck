import React, { FC } from 'react';
import { Button, Space } from 'antd';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export const SelfCheck: FC<Props> = ({ onBack, onNext }) => (
  <div>
    <Space>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>Next</Button>
    </Space>
  </div>
);
