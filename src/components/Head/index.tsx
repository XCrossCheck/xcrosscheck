import React, { FC } from 'react';
import { Layout, Button, Typography } from 'antd';
import  './Head.css';

const { Title } = Typography;
const { Header } = Layout;
type THead = {
  userRole: string;
  githubId: string;
  logOut: ()=>void;
};

const Head: FC<THead> = ({ userRole, githubId, logOut }) => (
    <Header className="header">
      <Title type="secondary" id="title">XCrossCheckTask</Title>
      <div>
        {userRole} / {githubId}
      </div>
      <Button 
        // type="primary" 
        shape="circle"
        onClick={logOut}
        title="Logout"
      >X</Button>
    </Header>
      
);

export default Head;
