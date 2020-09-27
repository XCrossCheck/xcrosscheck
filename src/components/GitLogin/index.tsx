/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import React from 'react';
import { Form, Button, Card, Select } from 'antd';
import './GitLogin.css';
import { setCookie } from '../../service/cookies';

type TGitLogin = {
  // setLogged: (lstate: boolean) => void;
  setRole: (role: string) => void;
  // setGithubId: (githubId: string) => void;
};

function randomString(i: number) {
  let rnd = '';
  while (rnd.length < i) rnd += Math.random().toString(36).substring(2);
  return rnd.substring(0, i);
}

const GitLogin: React.FC<TGitLogin> = ({ setRole }) => {
  const clientId = 'f4ecf84a7ba9d4e393f2';
  const state = randomString(12);
  const authhref = `https://github.com/login/oauth/authorize?client_id=${clientId}&state=${state}`;

  const { Option } = Select;

  function handleChange(value: any) {
    setRole(value);
    setCookie('userRole', value);
  }

  return (
    <div className="login-form">
      <Card title="You are not logged in" bordered className="login-card">
        <Form
          // layout="vertical"
          name="login"
          initialValues={{ userrole: 'student' }}
        >
          <Form.Item label="Role" name="userrole">
            <Select onChange={handleChange}>
              <Option value="student">Student</Option>
              <Option value="author">Author</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" href={authhref}>
              Sign up with GitHub
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default GitLogin;
