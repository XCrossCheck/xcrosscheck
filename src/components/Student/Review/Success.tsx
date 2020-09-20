import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

const { Title } = Typography;

export const Success: FC = () => (
  <>
    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '64px' }} />
    <div>
      <Title level={3}>
        <Space>
          <span>Review was successfully submitted</span>
        </Space>
      </Title>
    </div>
    <Space>
      <Link to="/">
        <Button>To Main Page</Button>
      </Link>
    </Space>
  </>
);
