import React, { FC, useEffect, useState } from 'react';
import './Submit.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Select, Typography, Space } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { SubmitInfo } from './types';
import { dbGetReq } from '../../../service/restapi-fb';
import { AggregatedTask, getTasks } from '../services/getTasks';
import * as authSelectors from '../../../storage/auth/selectors';

const { Option } = Select;
const { Text, Paragraph, Title } = Typography;

export const SelectTask: FC<{
  onNext: () => void;
  onChange: (task: AggregatedTask) => void;
  previousInfo: SubmitInfo;
  setPreviousInfo: (submitInfo: SubmitInfo) => void;
  selectedTask?: AggregatedTask;
  mode: 'submit' | 'review';
}> = ({ onNext, onChange, selectedTask, previousInfo, mode, setPreviousInfo }) => {
  const [tasks, setTasks] = useState<AggregatedTask[]>();
  const myGitHub = useSelector(authSelectors.githubId);

  useEffect(() => {
    getTasks().then(aggregatedTasks => setTasks(aggregatedTasks));
  }, []);

  let canProceed = false;

  if (selectedTask) {
    const now = new Date();
    if (mode === 'submit') {
      canProceed = selectedTask?.availableToSubmit && new Date(selectedTask.deadlineSubmit) > now;
    }
    if (mode === 'review') {
      canProceed = new Date(selectedTask.deadlineReview) > now;
    }
  }

  return (
    <>
      {selectedTask?.availableToSubmit && (
        <Title level={5} style={{ marginBottom: '2rem' }}>
          <span className="warning">Attention!</span> You should submit the task {selectedTask.name}{' '}
          before {new Date(selectedTask.deadlineSubmit).toLocaleString().slice(0, -3)}
        </Title>
      )}
      <Select
        defaultValue={selectedTask?.name}
        placeholder="Select task"
        style={{ width: 360 }}
        onChange={value => {
          const task = tasks.find(t => t.name === value);
          if (task) {
            onChange(task);
            dbGetReq('studentsTasks').then(res => {
              const prevInfo = Object.values<SubmitInfo>(res.data).filter(
                t => t.githubId === myGitHub && t.taskId === task.taskId
              );
              setPreviousInfo(prevInfo[prevInfo.length - 1]);
            });
          }
        }}
        loading={!tasks?.length}
      >
        {tasks?.map(({ name }) => (
          <Option key={name} value={name}>
            {name}
          </Option>
        ))}
      </Select>
      {canProceed && (
        <>
          <Button
            onClick={onNext}
            type="primary"
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            Next
          </Button>
        </>
      )}
      {!canProceed && selectedTask && (
        <div className="warning">Submit for cross-check has not started or deadline has passed</div>
      )}
      {previousInfo ? (
        <div>
          <Text>
            <Space>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <span>
                Task {selectedTask.name} succsessfully submited{' '}
                {new Date(previousInfo.submittedAt).toLocaleString().slice(0, -3)}
              </span>
            </Space>
          </Text>
          ,<Title level={5}>Demo link: </Title>
          <Paragraph>{previousInfo.demoLink}</Paragraph>
          <Title level={5}>Repository link</Title>
          <Paragraph>{previousInfo.repoLink}</Paragraph>
          <Title level={5}>Self-check score</Title>
          <Paragraph>{previousInfo.selfCheckScore}</Paragraph>
          <Link to={`/score/${selectedTask.taskId}`}>
            <Button>View score</Button>{' '}
          </Link>
        </div>
      ) : (
        selectedTask?.name && <Paragraph>This task was&apos;t submitted</Paragraph>
      )}
    </>
  );
};
