import React, { FC } from 'react';
import { Button, Space, Typography } from 'antd';
import { Task, Links } from './types';
import './Submit.css';

interface Props {
  onNext: () => void;
  onBack: () => void;
  task: Task;
  links: Links;
  selfCheck: string;
  setSubmitedDate: (submitedDate: string) => void;
}

const { Paragraph, Title, Link } = Typography;

export const ReviewAndSubmit: FC<Props> = ({
  onNext,
  onBack,
  task,
  links,
  selfCheck,
  setSubmitedDate,
}) => {
  const date = new Date();
  const submitedDate = date.toString();

  return (
    <>
      <div>
        <Title level={5}>Task</Title>
        <Paragraph>{task.id}</Paragraph>
        <Title level={5}>Link on Demo </Title>
        <Link href={links.demoLink} target="_blank">
          {links.demoLink}
        </Link>
        <Title level={5}>Link on repository</Title>
        <Link href={links.repoLink} target="_blank">
          {links.repoLink}
        </Link>
        <Title level={5}>Self-check score</Title>
        <Paragraph>{selfCheck}</Paragraph>
      </div>
      <Space className="button-wrapper">
        <Button onClick={onBack}>Back</Button>
        <Button
          type="primary"
          onClick={() => {
            setSubmitedDate(submitedDate);
            onNext();
          }}
        >
          Submit
        </Button>
      </Space>
    </>
  );
};
