import React, { FC } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import './Submit.css';
import { DEMO_LINK, REPO_LINK } from '../../../helpers/validationRules';
import { Links } from './types';
import { AggregatedTask } from '../services/getTasks';

interface Props {
  onSubmit: () => void;
  onNext: () => void;
  onBack: () => void;
  task: AggregatedTask;
  setLinks: (values: Links) => void;
  initialValues: Links;
}

export const SubmitForm: FC<Props> = ({ onNext, onBack, task, setLinks, initialValues }) => (
  <>
    <Typography.Title level={4}>Task Submit: {task.name}</Typography.Title>
    <Form
      layout="vertical"
      name="basic"
      initialValues={initialValues}
      onFinish={values => {
        setLinks(values);
        onNext();
      }}
    >
      <Form.Item
        name="demoLink"
        label="Demo Link"
        rules={[
          { required: true, message: 'Please enter demo link!' },
          {
            pattern: DEMO_LINK,
            message: 'Please enter the correct link',
          },
        ]}
      >
        <Input placeholder="https://githubname-task.netlify.app" />
      </Form.Item>

      <Form.Item
        name="repoLink"
        label="Link to your repository"
        rules={[
          {
            pattern: REPO_LINK,
            message: 'Please enter the correct link',
          },
        ]}
      >
        <Input placeholder="https://github.com/githubname/repository" />
      </Form.Item>

      <Form.Item className="button-wrapper">
        <Button type="default" onClick={onBack}>
          Go back
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  </>
);
