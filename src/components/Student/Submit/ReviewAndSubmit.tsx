import React, { FC } from 'react';
import { Button, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Links, SubmitInfo } from './types';
import './Submit.css';
import { dbCreateRecord } from '../../../service/restapi-fb';
import * as authSelectors from '../../../storage/auth/selectors';
import { AggregatedTask } from '../services/getTasks';

interface Props {
  onNext: () => void;
  onBack: () => void;
  task: AggregatedTask;
  previousInfo?: SubmitInfo;
  links: Links;
  selfCheck: string;
  setSubmitedDate: (submitedDate: string) => void;
}

const { Paragraph, Title } = Typography;

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
  const myGitHub = useSelector(authSelectors.githubId);

  return (
    <>
      <div>
        <Title level={5}>Task</Title>
        <Paragraph>{task.name}</Paragraph>
        <Title level={5}>Demo link </Title>
        <Paragraph>{links.demoLink}</Paragraph>
        <Title level={5}>Repository link</Title>
        <Paragraph>{links.repoLink}</Paragraph>
        <Title level={5}>Self-check score</Title>
        <Paragraph>{selfCheck}</Paragraph>
      </div>
      <Space className="button-wrapper">
        <Button onClick={onBack}>Back</Button>
        <Button
          type="primary"
          onClick={() => {
            const submitInfo = {
              githubId: myGitHub,
              demoLink: links.demoLink,
              taskId: task.taskId,
              repoLink: links.repoLink,
              selfCheckScore: selfCheck,
              submittedAt: submitedDate,
              sessionId: task.id,
            };
            console.log(task);
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
