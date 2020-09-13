import React, { useState, useEffect } from 'react';
import {
  Layout, List, Divider, Button, Input
} from 'antd';
import { dbGetReq, dbCreateRecord } from '../../service/restapi-fb';

type tItem = {
  category: string;
  description: string;
  id: string;
  maxScore: number;
  minScore: number;
  title: string;

}

type tTask = {
  id: string;
  author: string;
  name: string;
  state: string;
  availableToSubmit: boolean;
  categoriesOrder: string[];
  items: tItem[];
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
  const [tasks, setTasks] = useState<[string, tTask][]>([]);
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
  //  Get tasks from db
  // dbGetReq('tasks', 'author', 'seltor')  // get only author===seltor
    dbGetReq('tasks') // get all
      .then((data) => {
        console.log('data', data);
        console.log(Object.entries(data.data));
        setTasks(Object.entries(data.data));
      })
      .catch(
        (reason:any) => console.error('error', reason)
      );
  }, []);

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
                  renderItem={(item:[string, tTask]) => (
                    <List.Item>
                      {item[0]} {item[1].id} {item[1].author} {item[1].state}
                    </List.Item>
                  )}
                />
              </Content>
            </Layout>

            <Footer>
              <Input.Group compact>
                <Input
                  addonBefore="author"
                  value={author}
                  defaultValue=""
                  onChange={(e) => { setAuthor(e.target.value); }}
                />
              </Input.Group>
              <Button
                onClick={() => {
                  // const 
                  const newTask:tTask = {
                    author,
                    name: 'Task Name',
                    availableToSubmit: true,
                    categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
                    id: 'reaa-v3',
                    state: 'DRAFT',
                    items: [{
                      category: 'Basic Scope',
                      description: 'You need to make things right, not wrong',
                      id: 'basic_p1',
                      maxScore: 50,
                      minScore: 0,
                      title: 'Basic things',
                    }]
                  };

                  dbCreateRecord('tasks', newTask)
                    .then((data) => {
                      setTasks([...tasks, [data.data.name, newTask]]);
                    })
                    .catch(
                      (reason:any) => console.error('error', reason)
                    );
                }}
              >
                Добавить task
              </Button>
            </Footer>
          </Layout>
        )
        : (
          <></>
        )}
    </>
  );
}

export default Home;
