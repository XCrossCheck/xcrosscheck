import React, { FC } from 'react';
import { Button, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { CheckScore } from 'src/types/Criteria';
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
  selfCheck: CheckScore;
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

  const { basic, extra, fines } = selfCheck;
  let finalScore = 0;
  [basic, extra, fines].forEach(arr => {
    finalScore += arr.reduce((acc, { score }) => acc + score, 0);
  });

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
        <Paragraph>{finalScore}</Paragraph>
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
              selfCheckScore: finalScore,
              submittedAt: submitedDate,
              sessionId: task.id,
              selfCheck,
            };
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
