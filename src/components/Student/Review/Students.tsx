import React, { FC, useEffect, useState } from 'react';
import './Review.css';
import { Button, Select, Typography } from 'antd';
import { dbGetReq } from '../../../service/restapi-fb';
import { Task, Submission, Submission2 } from './types';

const { Option } = Select;
const { Link, Paragraph, Title } = Typography;

// const studentsMock: Submission[] = [
//   {
//     taskId: 'Songbird',
//     userId: 'Felix',
//     repoLink: 'https://github.com/blabla',
//     demoLink: 'https://onliner.by',
//     submittedAt: 'Mon Sep 14 2020',
//     selfCheckScore: '180',
//   },
//   {
//     taskId: 'Songbird',
//     userId: 'Gena',
//     repoLink: 'https://github.com/blabla',
//     demoLink: 'https://onliner.by',
//     submittedAt: 'Mon Sep 14 2020',
//     selfCheckScore: '200',
//   },
//   {
//     taskId: 'Songbird',
//     userId: 'Franky',
//     repoLink: 'https://github.com/blabla',
//     demoLink: 'https://onliner.by',
//     submittedAt: 'Mon Sep 14 2020',
//     selfCheckScore: '190',
//   },
// ];

// const reviewMock: Submission2[] = [
//   {
//     taskId: 'Songbird',
//     sender: 'MyId',
//     recipient: 'Felix',
//     crossCheckScore: '210',
//     feedbackId: '15bhdg2',
//     feedback: 'В целом работа неплохая, но можно и лучше',
//   },
// ];

export const SelectStudents: FC<{
  onBack: () => void;
  onNext: () => void;
  task: Task;
  onChange: (student: Submission) => void;
  selectedStudent?: Submission;
}> = ({ onBack, onNext, task, onChange, selectedStudent }) => {
  const [students, setStudents] = useState<Submission[]>([]);
  const [review, setReview] = useState<Submission2[]>([]);
  const myGitHub = 'katrin-kot';
  useEffect(() => {
    dbGetReq('studentScore').then(score => setReview(Object.values(score.data)));
    Promise.all([dbGetReq('studentsTasks'), dbGetReq('attendees')]).then(([taskRes, attendees]) => {
      const students1 = Object.values(attendees.data).filter(
        t => t.githubId === myGitHub && t.taskId === task.taskId
      );
      const students2 = students1[students1.length - 1].reviewerOf;
      const studentsTasks = Object.values(taskRes.data)
        .filter(t => t.taskId === task.taskId)
        .filter(item => students2.includes(item.githubId));
      console.log(students2, studentsTasks);
      setStudents(studentsTasks);
    });
  }, [task.taskId]);
  const currentReview = review.filter(elem => elem.recipient === selectedStudent?.githubId);
  return (
    <>
      <Typography.Title level={4}>
        Task Review: <span>{task?.taskId}</span>
      </Typography.Title>
      <Select
        defaultValue={selectedStudent?.github.Id}
        placeholder="Select student"
        style={{ width: 360 }}
        onChange={value => {
          const student = students.find(t => t.githubId === value);
          if (student) {
            onChange(student);
          }
        }}
        loading={!students.length}
      >
        {students.map(({ githubId }) => (
          <Option key={githubId} value={githubId}>
            {githubId}
          </Option>
        ))}
      </Select>
      {selectedStudent?.githubId && (
        <div className="button-wrapper">
          <Button
            onClick={onBack}
            type="default"
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            Go back
          </Button>
          <Button
            onClick={onNext}
            type="primary"
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            Next
          </Button>
        </div>
      )}
      {selectedStudent?.taskId === task.taskId ? (
        <div className="review-wrapper">
          <div>
            {' '}
            <Title level={5}>Task </Title>
            <Paragraph> {selectedStudent.taskId}</Paragraph>
            <Title level={5}>Link on Demo </Title>
            <Link href={selectedStudent.demoLink} target="_blank">
              {selectedStudent.demoLink}
            </Link>
            <Title level={5}>Link on repository</Title>
            <Link href={selectedStudent.repoLink} target="_blank">
              {selectedStudent.repoLink}
            </Link>
            <Title level={5}>Self-check score</Title>
            <Paragraph>{selectedStudent.selfCheckScore}</Paragraph>
          </div>
          {currentReview.length ? (
            <div style={{ marginLeft: '40px', width: '400px', overflow: 'hidden' }}>
              <Title className="warning" level={5}>
                Score was already submitted
              </Title>
              <Title level={5}>Submitted score </Title>
              <Paragraph>{currentReview[0].crossCheckScore}</Paragraph>
              <Title level={5}>Feedback</Title>
              <Paragraph>{currentReview[0].feedback}</Paragraph>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default SelectStudents;
