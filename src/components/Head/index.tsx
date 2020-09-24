import React, { FC } from 'react';
import { Layout, Button } from 'antd';
import  './Head.css';

const { Header } = Layout;
type THead = {
  userRole: string;
  githubId: string;
  logOut: ()=>void;
};

const Head: FC<THead> = ({ userRole, githubId, logOut }) => (
    <Header className="header">
      <span>X Cross Check Task</span>
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
