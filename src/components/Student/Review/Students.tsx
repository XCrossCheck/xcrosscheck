import React, { FC, useEffect, useState } from 'react';
import './Review.css';
import { useSelector } from 'react-redux';
import { Button, Modal, Select, Typography } from 'antd';
import { Submission, Review, Dispute } from './types';
import * as authSelectors from '../../../storage/auth/selectors';
import { AggregatedTask, getSubmittedTasks } from '../services/getTasks';
import { getDisputes, getStudentScore } from '../services/getScore';

const { Option } = Select;
const { Link, Paragraph, Title } = Typography;

export const SelectStudents: FC<{
  onBack: () => void;
  onNext: () => void;
  task: AggregatedTask;
  onChange: (student: Submission) => void;
  selectedStudent?: Submission;
}> = ({ onBack, onNext, task, onChange, selectedStudent }) => {
  const [students, setStudents] = useState<Submission[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentReview, setCurrentReview] = useState<Review>();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [currentDispute, setCurrentDispute] = useState<Dispute>();
  const [visible, showModal] = useState<boolean>(false);
  const myGitHub = useSelector(authSelectors.githubId);

  useEffect(() => {
    getStudentScore().then(setReviews);
    getDisputes().then(setDisputes);
    getSubmittedTasks(myGitHub, task.taskId).then(setStudents);
  }, [task.taskId, myGitHub]);

  useEffect(() => {
    setCurrentReview(reviews.find(r => r.recipient === selectedStudent?.githubId));
  }, [reviews, selectedStudent]);

  useEffect(() => {
    setCurrentDispute(disputes.find(d => d.reviewId === currentReview?.reviewId));
  }, [disputes, currentReview]);

  return (
    <>
      <Typography.Title level={4}>
        Task Review: <span>{task?.name}</span>
      </Typography.Title>
      <Select
        defaultValue={selectedStudent?.githubId}
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
            <Paragraph> {task.name}</Paragraph>
            <Title level={5}>Demo link </Title>
            <Link href={selectedStudent.demoLink} target="_blank">
              {selectedStudent.demoLink}
            </Link>
            <Title level={5}>Repository link</Title>
            <Link href={selectedStudent.repoLink} target="_blank">
              {selectedStudent.repoLink}
            </Link>
            <Title level={5}>Self-check score</Title>
            <Paragraph>{selectedStudent.selfCheckScore}</Paragraph>
          </div>
          {currentReview && (
            <div style={{ marginLeft: '40px', width: '400px', overflow: 'hidden' }}>
              <Title className="warning" level={5}>
                Score was already submitted
              </Title>
              <Title level={5}>Submitted score </Title>
              <Paragraph>{currentReview.crossCheckScore}</Paragraph>
              <Title level={5}>Feedback</Title>
              <Paragraph>{currentReview.feedback}</Paragraph>

              {currentDispute && (
                <>
                  <Button type="primary" onClick={() => showModal(true)} danger>
                    View dispute
                  </Button>
                  <Modal
                    title="Dispute"
                    visible={visible}
                    onOk={() => showModal(false)}
                    onCancel={() => showModal(false)}
                  >
                    <Title level={5}>Basic scope</Title>
                    <Paragraph>{currentDispute.items?.basic_p1.comment}</Paragraph>
                    <Paragraph strong>Suggested score: </Paragraph>
                    <Paragraph>{currentDispute.items?.basic_p1.suggestedScore}</Paragraph>
                    <Paragraph>{currentDispute.items?.extra_p1.comment}</Paragraph>
                    <Paragraph strong>Suggested score: </Paragraph>
                    <Paragraph>{currentDispute.items?.extra_p1.suggestedScore}</Paragraph>
                    <Paragraph>{currentDispute.items?.fines_p1.comment}</Paragraph>
                    <Paragraph strong>Suggested score: </Paragraph>
                    <Paragraph>{currentDispute.items?.fines_p1.suggestedScore}</Paragraph>
                  </Modal>
                </>
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default SelectStudents;
