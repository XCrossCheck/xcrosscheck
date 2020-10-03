import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button, Space, Typography } from 'antd';
import { Submission } from './types';
import './Review.css';
import * as authSelectors from '../../../storage/auth/selectors';
import { dbCreateRecord } from '../../../service/restapi-fb';
import { AggregatedTask } from '../services/getTasks';

interface Props {
  onNext: () => void;
  onBack: () => void;
  task: AggregatedTask;
  student: Submission;
  crossCheckScore: string;
  feedback: string;
}

const { Paragraph, Title } = Typography;

export const ReviewAndSubmit: FC<Props> = ({
  onNext,
  onBack,
  task,
  student,
  crossCheckScore,
  feedback,
}) => {
  const myGitHub = useSelector(authSelectors.githubId);

  return (
    <>
      <div>
        <Title level={5}>Task:</Title>
        <Paragraph>{task.name}</Paragraph>
        <Title level={5}>Student: </Title>
        <Paragraph>{student.githubId}</Paragraph>
        <Title level={5}>Score:</Title>
        <Paragraph>{crossCheckScore}</Paragraph>
        <Title level={5}>Feedback:</Title>
        <Paragraph style={{ width: '600px' }}>{feedback}</Paragraph>
      </div>
      <Space className="button-wrapper">
        <Button onClick={onBack}>Back</Button>
        <Button
          type="primary"
          onClick={() => {
            dbCreateRecord('studentScore', {
              crossCheckScore,
              feedback,
              recipient: student.githubId,
              sender: myGitHub,
              taskId: task.taskId,
            });
            onNext();
          }}
        >
          Submit
        </Button>
      </Space>
    </>
  );
};
