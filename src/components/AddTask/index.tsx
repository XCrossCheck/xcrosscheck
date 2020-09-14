import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Form, Input, Button, DatePicker, Space,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddTask = (props: any) => {
  console.log('app: ', props);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <Form
            {...layout}
            name="formAddTask"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Название"
              name="taskName"
              rules={[{ required: true, message: 'Please input task name!' }]}
            >
              <Input
                placeholder="task name"
              />
            </Form.Item>

            <Form.Item
              label="Старт"
              name="startDate"
              rules={[{ required: true, message: 'Please input start date!' }]}
            >
              <DatePicker
                placeholder="start date"
                style={{ width: '50%' }}
              />
            </Form.Item>

            <Form.Item
              label="Окончание"
              name="deadLine"
              rules={[{ required: true, message: 'Please input deadline!' }]}
            >
              <DatePicker
                placeholder="start date"
                style={{ width: '50%' }}
              />
            </Form.Item>

            <Form.Item
              label="название репозитория"
              name="repoName"
              rules={[{ required: true, message: 'Please input repo name!' }]}
            >
              <Input
                placeholder="repo name"
              />
            </Form.Item>

            <Form.Item
              label="название ветки"
              name="branchName"
              rules={[{ required: true, message: 'Please input branch name!' }]}
            >
              <Input
                placeholder="branch name"
              />
            </Form.Item>

            <Form.Item
              label="скриншот"
              name=""
              rules={[{ required: true, message: 'Please input !' }]}
            >
              <Input
                placeholder=""
              />
            </Form.Item>

            <Form.Item
              label="демо"
              name=""
              rules={[{ required: true, message: 'Please input !' }]}
            >
              <Input
                placeholder=""
              />
            </Form.Item>

            <Form.Item
              label="описание"
              name=""
              rules={[{ required: true, message: 'Please input !' }]}
            >
              <Input.TextArea
                placeholder=""
              />
            </Form.Item>

            <Form.List name="users">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                        <Form.Item
                          {...field}
                          name={[field.name, 'first']}
                          fieldKey={[field.fieldKey, 'first']}
                          rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input placeholder="First Name" />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, 'last']}
                          fieldKey={[field.fieldKey, 'last']}
                          rules={[{ required: true, message: 'Missing last name' }]}
                        >
                          <Input placeholder="Last Name" />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined />
                        Add field
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      />
    </Switch>
  );
};

export default AddTask;
