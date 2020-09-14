import React, { FC, useState } from "react";
import { DEMO_LINK, REPO_LINK } from "../../../helpers/validationRules";
import "./Submit.css";
import { Form, Input, Button, Typography } from "antd";
import { Links, Submission, Task } from "./types";

interface Props {
  onSubmit: () => void;
  onNext: () => void;
  onBack: () => void;
  task: Task;
  setLinks: (values: Links) => void;
  initialValues: Links;
}

export const SubmitForm: FC<Props> = ({
  onSubmit,
  onNext,
  onBack,
  task,
  setLinks,
  initialValues,
}) => {
  return (
    <>
      <Typography.Title level={4}>Task Submit: {task.id}</Typography.Title>
      <Form
        layout="vertical"
        name="basic"
        initialValues={initialValues}
        onFinish={(values) => {
          setLinks(values);
          onNext();
        }}
      >
        <Form.Item
          name="demoLink"
          label="Link on DEMO version"
          rules={[
            { required: true, message: "Please enter demo link!" },
            {
              pattern: DEMO_LINK,
              message: "Please enter the correct link",
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
              message: "Please enter the correct link",
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
};
