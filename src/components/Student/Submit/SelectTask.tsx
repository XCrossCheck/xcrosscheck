import React, { FC, useEffect, useState } from 'react';
import './Submit.css';
import { Link } from 'react-router-dom';
import { Button, Select, Typography, Space } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Task, SubmitInfo } from './types';
import { dbGetReq } from '../../../service/restapi-fb';
import { getTasks } from '../services/getTasks';

const { Option } = Select;
const { Text, Paragraph, Title } = Typography;
const myGitHub = 'katrin-kot';

export const SelectTask: FC<{
  onNext: () => void;
  onChange: (task: Task) => void;
  previousInfo: SubmitInfo[];
  setPreviousInfo: (submitInfo: SubmitInfo) => void;
  selectedTask?: Task;
  mode: 'submit' | 'review';
}> = ({ onNext, onChange, selectedTask, previousInfo, mode, setPreviousInfo }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const submissionTask = previousInfo;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getTasks().then(aggregatedTasks => setTasks(aggregatedTasks));
  }, [setPreviousInfo]);

  let canProceed = false;

  if (selectedTask) {
    const now = new Date();
    if (mode === 'submit') {
      canProceed = new Date(selectedTask.deadlineSubmit) > now;
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
              const prevInfo = Object.values(res.data).filter(
                t => t.githubId === myGitHub && t.taskId === task.taskId
              );
              setPreviousInfo(prevInfo[prevInfo.length - 1]);
            });
          }
        }}
        loading={!tasks.length}
      >
        {tasks.map(({ name }) => (
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
      {!canProceed && selectedTask && <div className="warning">Deadline has passed</div>}
      {submissionTask ? (
        <div>
          <Text>
            <Space>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <span>
                Task {selectedTask.name} succsessfully submited {submissionTask.submittedAt}
              </span>
            </Space>
          </Text>
          ,<Title level={5}>Link on Demo </Title>
          <Paragraph>{submissionTask.demoLink}</Paragraph>
          <Title level={5}>Link on repository</Title>
          <Paragraph>{submissionTask.repoLink}</Paragraph>
          <Title level={5}>Self-check score</Title>
          <Paragraph>{submissionTask.selfCheckScore}</Paragraph>
          <Link to={`/student/score/${selectedTask.taskId}`}>
            <Button>View a score</Button>{' '}
          </Link>
        </div>
      ) : (
        selectedTask?.name && <Paragraph>This task was&apos;t submited</Paragraph>
      )}
    </>
  );
};
