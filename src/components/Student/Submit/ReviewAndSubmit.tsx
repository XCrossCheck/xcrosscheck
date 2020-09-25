import React, { FC, useEffect, useState } from 'react';
import { Button, Space, Typography } from 'antd';
import {useSelector} from 'react-redux';
import { Task, Links, SubmitInfo } from './types';
import './Submit.css';
import { dbCreateRecord } from '../../../service/restapi-fb';

interface Props {
  onNext: () => void;
  onBack: () => void;
  task: Task;
  previousInfo?: SubmitInfo;
  links: Links;
  selfCheck: string;
  setSubmitedDate: (submitedDate: string) => void;
}

const { Paragraph, Title } = Typography;
const myGitHub = 'katrin-kot';
// const myGitHub = useSelector(authSelectors.githubId);

export const ReviewAndSubmit: FC<Props> = ({
  onNext,
  onBack,
  task,
  previousInfo,
  links,
  selfCheck,
  setSubmitedDate,
}) => {
  const date = new Date();
  const submitedDate = date.toString();
  const [submitInfo, setSubmitInfo] = useState<SubmitInfo>();

  useEffect(() => {
    const currentTaskInfo = {
      githubId: myGitHub,
      demoLink: links.demoLink,
      taskId: task.taskId,
      repoLink: links.repoLink,
      selfCheckScore: selfCheck,
      submittedAt: submitedDate,
    };

    setSubmitInfo(currentTaskInfo);
  }, [previousInfo, task.taskId, links.demoLink, links.repoLink, selfCheck, submitedDate]);
  return (
    <>
      <div>
        <Title level={5}>Task</Title>
        <Paragraph>{task.name}</Paragraph>
        <Title level={5}>Link on Demo </Title>
        <Paragraph>{links.demoLink}</Paragraph>
        <Title level={5}>Link on repository</Title>
        <Paragraph>{links.repoLink}</Paragraph>
        <Title level={5}>Self-check score</Title>
        <Paragraph>{selfCheck}</Paragraph>
      </div>
      <Space className="button-wrapper">
        <Button onClick={onBack}>Back</Button>
        <Button
          type="primary"
          onClick={() => {
            setSubmitedDate(submitedDate);
            dbCreateRecord('studentsTasks', submitInfo);
            onNext();
          }}
        >
          Submit
        </Button>
      </Space>
    </>
  );
};
