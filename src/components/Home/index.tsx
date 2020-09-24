import React, { FC } from 'react';
import { Layout, Typography } from 'antd';
import MainRouter from '../MainRouter';
import TabsMenu from '../TabsMenu';
import pages from './pages';
import Head from '../Head';

const { Footer, Content } = Layout;

type THome = {
  userRole: string;
  githubId: string;
  logOut: () => void;
};

const Home: FC<THome> = ({ userRole, githubId, logOut }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Head userRole={userRole} githubId={githubId} logOut={logOut} />
    <TabsMenu pages={pages} userRole={userRole} />
    <Content>
      <MainRouter pages={pages} userRole={userRole} />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default Home;
