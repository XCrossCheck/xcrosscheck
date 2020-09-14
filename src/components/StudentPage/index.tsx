/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import {
  Layout, List, Divider, Button, Input,
} from 'antd';
import { dbGetReq, dbCreateRecord } from '../../service/restapi-fb';

type TItem = {
  category: string;
  description: string;
  id: string;
  maxScore: number;
  minScore: number;
  title: string;

};

type TTask = {
  id: string;
  author: string;
  name: string;
  state: string;
  availableToSubmit: boolean;
  categoriesOrder: string[];
  items: TItem[];
};

const {
  Footer, Sider, Content,
} = Layout;

const StudentPage: React.FC = () => {
  const [tasks, setTasks] = useState<[string, TTask][]>([]);
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
        (reason:any) => console.error('error', reason),
      );
  }, []);

  return (
    <>
      <Layout>
        {/* <Sider>Menu ???</Sider> */}
        <Content>

          <Divider orientation="left">Task List</Divider>
          <List
                  // header={<div>Header</div>}
                  // footer={<div>Footer</div>}
            bordered
            dataSource={tasks}
            renderItem={(item:[string, TTask]) => (
              <List.Item>
                {item[0]}
                {' '}
                {item[1].id}
                {' '}
                {item[1].author}
                {' '}
                {item[1].state}
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
            const newTask:TTask = {
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
              }],
            };

            dbCreateRecord('tasks', newTask)
              .then((data) => {
                setTasks([...tasks, [data.data.name, newTask]]);
              })
              .catch(
                (reason:any) => console.error('error', reason),
              );
          }}
        >
          Добавить task
        </Button>
      </Footer>
    </>
  );
};

export default StudentPage;
