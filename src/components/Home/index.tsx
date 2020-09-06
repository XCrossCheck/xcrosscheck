import React from 'react';
import {
  Layout, List, Typography, Divider,
} from 'antd';
import GitLogin from '../GitLogin';

const {
  Header, Footer, Sider, Content
} = Layout;

type tHome = {
  logged: boolean;
  setLogged: (arg:boolean)=>void;
  setRole: (arg:string)=>void;
  props: any;
}

const Home:React.FC<tHome> = ({ logged, setLogged, setRole, props }) => {

  console.log(logged);
  console.log(props);


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
        )
        : (
          <GitLogin setLogged={setLogged} setRole={setRole} />
        )}
    </>
  );
}

export default Home;
