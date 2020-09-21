import React, { FC } from 'react';
import { Layout } from 'antd';
import MainRouter from '../MainRouter';
import TabsMenu from '../TabsMenu';
import pages from './pages';

const { Header, Footer, Content } = Layout;

type THome = {
  userRole: string;
  githubId: string;
};

const Home: FC<THome> = ({ userRole, githubId }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header>X Cross Check Task</Header>
    <TabsMenu pages={pages} userRole={userRole} />
    <Content>
      <MainRouter pages={pages} userRole={userRole} />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default Home;
