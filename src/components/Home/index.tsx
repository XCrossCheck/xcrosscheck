import React, { useState, useEffect } from 'react';
import {
  Layout, List, Divider,
} from 'antd';
import { dbGetReq, dbCreateRecord } from '../../service/restapi-fb';

type tTask = {
  id: number;
  author: string;
  state: string;
};

const {
  Header, Footer, Sider, Content
} = Layout;

type tHome = {
  logged: boolean;
  // setLogged: (arg:boolean)=>void;
  // setRole: (arg:string)=>void;
  // props: any;
}

const Home:React.FC<tHome> = ({ logged }) => {
  const [tasks, setTasks] = useState<[string,tTask][]>([]);

  useEffect(() => {
  //  Get tasks from db
    dbGetReq('tasks', 'author', 'seltor')
      .then((data) => {
        console.log('data', data);
        // console.log(Object.entries(data.data));
        setTasks(Object.entries(data.data));
      })
      .catch(
        (reason:any) => console.error('error', reason)
      );
  }, []);

  ///////// create record 
  //     dbCreateRecord('tasks',
  //     {
  //       author: "newuser",
  //       categoriesOrder: [ "Basic Scope", "Extra Scope", "Fines" ],
  //       id: "newtask-v3",
  //       items: [ {
  //         category: "Basic Scope",
  //         description: "You need to make things right, not wrong",
  //         id: "basic_p1",
  //         maxScore: 50,
  //         minScore: 0,
  //         title: "Basic things"
  //       }]
  //     })
  
  //     .then((data:any) => {
  //       console.log('data', data);
  //     })
  //     .catch((reason:any) => console.error('error', reason));

  return (
    <>
      {logged
        ? (
          <Layout>
            <Header>X Cross Check Task</Header>
            <Layout>
              {/* <Sider>Menu ???</Sider> */}
              <Content>

                <Divider orientation="left">Task List</Divider>
                <List
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={tasks}
                  renderItem={ (item:[string, tTask]) => (
                    <List.Item>
                      {item[0]} {item[1].id} {item[1].author} {item[1].state}
                    </List.Item>
                  )}
                />
              </Content>
            </Layout>
            <Footer>Footer</Footer>
          </Layout>
        )
        : (
          <></>
        )}
    </>
  );
}

export default Home;
