import React, { FC } from 'react';
import { Spin, Space } from 'antd';

const Loading: FC = () => (
  <Space size="large">
    <Spin size="large" />
  </Space>
);

export default Loading;
