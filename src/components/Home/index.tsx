import React from 'react';
import { Layout } from 'antd';
import MainRouter from '../MainRouter';
import pages from './pages';

const {
  Header, Footer, Sider,
} = Layout;

const Home: React.FC = () => (
  <Layout>
    <Header>X Cross Check Task</Header>
    <Layout>
      <Sider>Menu ???</Sider>
      <MainRouter pages={pages} userRole="student" />
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
);

export default Home;
