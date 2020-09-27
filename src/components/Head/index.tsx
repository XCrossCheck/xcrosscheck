import React, { FC } from 'react';
import { Layout, Button, Typography } from 'antd';
import './Head.css';
import { LoginOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header } = Layout;
type THead = {
  userRole: string;
  githubId: string;
  logOut: () => void;
};

const Head: FC<THead> = ({ userRole, githubId, logOut }) => (
  <Header className="header">
    <Title id="title">
      XCrossCheckTask
    </Title>
    <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
      {userRole} / {githubId}
    </div>
    <Button shape="round" onClick={logOut} title="Logout">
      <LoginOutlined />
    </Button>
  </Header>
);

export default Head;
