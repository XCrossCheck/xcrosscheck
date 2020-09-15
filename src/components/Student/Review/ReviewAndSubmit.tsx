import React, { FC } from "react";
import { Button, Space, Typography } from "antd";
import { Task, Submission } from "./types";
import "./Review.css";

interface Props {
  onNext: () => void;
  onBack: () => void;
  task: Task;
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
  return (
    <>
      <div>
        <Title level={5}>Task:</Title>
        <Paragraph>{task.id}</Paragraph>
        <Title level={5}>Student: </Title>
        <Paragraph>{student.userId}</Paragraph>
        <Title level={5}>Score:</Title>
        <Paragraph>{crossCheckScore}</Paragraph>
        <Title level={5}>Feedback:</Title>
        <Paragraph>{feedback}</Paragraph>
      </div>
      <Space className="button-wrapper">
        <Button onClick={onBack}>Back</Button>
        <Button type="primary" onClick={onNext}>
          Submit
        </Button>
      </Space>
    </>
  );
};
