import React, { FC } from 'react';
import { Layout } from 'antd';
import MainRouter from '../MainRouter';
import pages from './pages';

const {
  Header, Footer, Sider,
} = Layout;

type THome = {
  userRole: string,
};

const Home: FC<THome> = ({ userRole }) => (
  <Layout>
    <Header>X Cross Check Task</Header>
    <Layout>
      {/* <Sider>Menu ???</Sider> */}
      <MainRouter pages={pages} userRole={userRole} />
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
);

export default Home;
