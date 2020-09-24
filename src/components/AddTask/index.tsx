import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Form, Input, Button, DatePicker, Divider, Typography, InputNumber,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const dividerLayout = {
  width: '50%', minWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
};

const dividerBlack = {
  style: {
    borderTop: '1px solid black',
  },
};

const AddTask = (props: any) => {
  const onFinish = (values: any) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  return (
    <Switch>
      <Route
        path="/"
        render={() => (
          <Form
            {...layout}
            id="formAddTask"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="id"
              name="taskId"
              rules={[{ required: true, message: 'Please input task id!' }]}
            >
              <Input
                placeholder="task id"
              />
            </Form.Item>

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
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
              />
            </Form.Item>

            <Form.Item
              label="Окончание"
              name="deadLine"
              rules={[{ required: true, message: 'Please input deadline!' }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Select Time"
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
              name="screenshot"
              rules={[{ required: true, message: 'Please add screenshot!' }]}
            >
              <Input
                placeholder="screenshot"
              />
            </Form.Item>

            <Form.Item
              label="демо"
              name="demo"
              rules={[{ required: true, message: 'Please add a link to the demo!' }]}
            >
              <Input
                placeholder="demo"
              />
            </Form.Item>

            <Form.Item
              label="описание"
              name="description"
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <Input.TextArea
                placeholder="description"
              />
            </Form.Item>

            <Divider
              {...dividerBlack}
            />

            <Title level={4}>Basic Score</Title>

            <Form.List name="basic">
              {(fieldsBasic, { add, remove }) => (
                <div className="basic">
                  {fieldsBasic.map((field) => (
                    <div key={field.key}>
                      <Form.Item
                        {...field}
                        label={['пункт ', field.name]}
                        name={['basic_p', field.name]}
                        fieldKey={[field.fieldKey, 'option']}
                      />
                      <Form.Item
                        {...field}
                        label="название"
                        name={[field.name, 'title']}
                        fieldKey={[field.fieldKey, 'title']}
                        rules={[{ message: 'Missing Title' }]}
                      >
                        <Input placeholder="title" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="минимальный балл"
                        name={[field.name, 'minScore']}
                        fieldKey={[field.fieldKey, 'minScore']}
                        rules={[{
                          type: 'number', min: -10000, max: 10000, message: 'Missing min Score',
                        }]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="максимальный балл"
                        name={[field.name, 'maxScore']}
                        fieldKey={[field.fieldKey, 'maxScore']}
                        rules={[{
                          type: 'number', min: -10000, max: 10000, message: 'Missing max Score',
                        }]}
                      >
                        <InputNumber defaultValue={0} />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="описание"
                        name={[field.name, 'description']}
                        fieldKey={[field.fieldKey, 'description']}
                        rules={[{ message: 'Missing description' }]}
                      >
                        <Input.TextArea
                          placeholder="description"
                        />
                      </Form.Item>

                      <div style={{ height: '20px' }} />

                      <Button
                        type="dashed"
                        danger
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{ display: 'flex', marginRight: '0', marginLeft: 'auto' }}
                      >
                        удалить пункт
                        {' '}
                        {field.name}
                        {' '}
                        Basic
                      </Button>
                      <Divider
                        style={dividerLayout}
                      />
                    </div>
                  ))}
                  <Form.Item {...tailLayout}>
                    <Button
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined />
                      Добавить пункт Basic
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>

            <Divider
              {...dividerBlack}
            />

            <Title level={4}>Extra Score</Title>

            <Form.List name="extra">
              {(fieldsExtra, { add, remove }) => (
                <div className="extra">
                  {fieldsExtra.map((field) => (
                    <div key={field.key}>
                      <Form.Item
                        {...field}
                        label={['пункт ', field.name]}
                        name={['extra_p', field.name]}
                        fieldKey={[field.fieldKey, 'title']}
                      />
                      <Form.Item
                        {...field}
                        label="название"
                        name={[field.name, 'title']}
                        fieldKey={[field.fieldKey, 'title']}
                        rules={[{ message: 'Missing Title' }]}
                      >
                        <Input placeholder="title" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="минимальный балл"
                        name={[field.name, 'minScore']}
                        fieldKey={[field.fieldKey, 'minScore']}
                        rules={[{ message: 'Missing min Score' }]}
                      >
                        <InputNumber defaultValue={0} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="максимальный балл"
                        name={[field.name, 'maxScore']}
                        fieldKey={[field.fieldKey, 'maxScore']}
                        rules={[{ message: 'Missing maxScore' }]}
                      >
                        <InputNumber defaultValue={0} />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="описание"
                        name={[field.name, 'description']}
                        fieldKey={[field.fieldKey, 'description']}
                        rules={[{ message: 'Missing description' }]}
                      >
                        <Input.TextArea
                          placeholder="description"
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}
                      />

                      <Button
                        type="dashed"
                        danger
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{ display: 'flex', margin: '0 auto' }}
                      >
                        удалить пункт
                        {' '}
                        {field.name}
                        {' '}
                        Extra
                      </Button>
                      <Divider
                        style={{
                          width: '50%', minWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
                        }}
                      />
                    </div>
                  ))}
                  <Form.Item {...tailLayout}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined />
                      Добавить пункт Extra
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>

            <Divider
              {...dividerBlack}
            />

            <Title level={4}>Fines</Title>

            <Form.List name="fines">
              {(fieldsFines, { add, remove }) => (
                <div className="fines">
                  {fieldsFines.map((field) => (
                    <div key={field.key}>
                      <Form.Item
                        {...field}
                        label={['пункт ', field.name]}
                        name={['fines_p', field.name]}
                        fieldKey={[field.fieldKey, 'option']}
                      />
                      <Form.Item
                        {...field}
                        label="название"
                        name={[field.name, 'title']}
                        fieldKey={[field.fieldKey, 'title']}
                        rules={[{ message: 'Missing Title' }]}
                      >
                        <Input placeholder="title" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="минимальный балл"
                        name={[field.name, 'minScore']}
                        fieldKey={[field.fieldKey, 'minScore']}
                        rules={[{ message: 'Missing min Score' }]}
                      >
                        <InputNumber defaultValue={0} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="максимальный балл"
                        name={[field.name, 'maxScore']}
                        fieldKey={[field.fieldKey, 'maxScore']}
                        rules={[{ message: 'Missing maxScore' }]}
                      >
                        <InputNumber defaultValue={0} />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        label="описание"
                        name={[field.name, 'description']}
                        fieldKey={[field.fieldKey, 'description']}
                        rules={[{ message: 'Missing description' }]}
                      >
                        <Input.TextArea
                          placeholder="description"
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}
                      />

                      <Button
                        type="dashed"
                        danger
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{ display: 'flex', margin: '0 auto' }}
                      >
                        удалить пункт
                        {' '}
                        {field.name}
                        {' '}
                        Fines
                      </Button>
                      <Divider
                        style={{
                          width: '50%', minWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
                        }}
                      />
                    </div>
                  ))}
                  <Form.Item {...tailLayout}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined />
                      Добавить пункт Fines
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>

            <Divider
              {...dividerBlack}
            />

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
