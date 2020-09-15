import React, { FC } from "react";
import { Layout } from "antd";
import MainRouter from "../MainRouter";
import pages from "./pages";

const { Header, Footer, Content, Sider } = Layout;

type THome = {
  userRole: string;
};

const Home: FC<THome> = ({ userRole }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header>X Cross Check Task</Header>
    <Content>
      {/* <Sider>Menu ???</Sider> */}
      <MainRouter pages={pages} userRole={userRole} />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default Home;
