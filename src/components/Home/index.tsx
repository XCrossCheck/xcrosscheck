import React, { FC } from 'react';
import { Layout, Typography } from 'antd';
import MainRouter from '../MainRouter';
import TabsMenu from '../TabsMenu';
import pages from './pages';
import './style.scss';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

type THome = {
  userRole: string;
};

const Home: FC<THome> = ({ userRole }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header>
      <Title type="secondary" id="title">XCrossCheckTask</Title>
    </Header>
    <TabsMenu pages={pages} userRole={userRole} />
    <Content>
      <MainRouter pages={pages} userRole={userRole} />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default Home;
