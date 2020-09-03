import React, { useState } from 'react';

import { Layout } from 'antd';
import { List, Typography, Divider } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

// import GitLogin from '../GitLogin';

const Home:React.FC<any> = ({ logged, setLogged, setRole }) => {
  console.log(logged);


  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];


  return (
    <>
      {logged
        ? (
          <div>
            THIS IS HOME
          </div>
        )
        : (
      // <GitLogin setLogged={setLogged} setRole={setRole} />

          <Layout>
            <Header>X Cross Check Task</Header>
            <Layout>
              <Sider>Menu ???</Sider>
              <Content>

                <Divider orientation="left">Task List</Divider>
                <List
                  header={<div>Header</div>}
                  footer={<div>Footer</div>}
                  bordered
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                  )}
                />


              </Content>
            </Layout>
            <Footer>Footer</Footer>
          </Layout>
        )}
        </>
  );
}

export default Home;
