import React, { FC, useEffect, useState } from "react";
import "./Submit.css";
import { Button, Form, Select, Typography, Space } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Task, Submission } from "./types";

const { Option } = Select;
const { Text, Paragraph, Title } = Typography;
const tasksMock: Task[] = [
  {
    id: "Songbird",
    availableToSubmit: true,
    deadlineReview: "2020-09-20 23:59:59",
    deadlineSubmit: "2020-09-15 23:59:59",
  },
  {
    id: "RS Lang",
    availableToSubmit: false,
    deadlineReview: "2020-09-13 23:59:59",
    deadlineSubmit: "2020-09-12 23:59:59",
  },
  {
    id: "X-Check",
    availableToSubmit: true,
    deadlineReview: "2020-09-20 23:59:59",
    deadlineSubmit: "2020-09-20 23:59:59",
  },
];

const submissionMock: Submission = {
  taskId: "Songbird",
  userId: "User",
  repoLink: "https://github.com/sleepwalky/blabla",
  demoLink: "https://onliner.by",
  submittedAt: "Mon Sep 14 2020",
  selfCheckScore: "180",
};

export const SelectTask: FC<{
  onNext: () => void;
  onChange: (task: Task) => void;
  selectedTask?: Task;
  mode: "submit" | "review";
}> = ({ onNext, onChange, selectedTask, mode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setTimeout(() => {
      setTasks(tasksMock);
    }, 1500);
  }, []);

  let canProceed = false;

  if (selectedTask) {
    const now = new Date();
    if (mode === "submit") {
      canProceed = new Date(selectedTask.deadlineSubmit) > now;
    }
    if (mode === "review") {
      canProceed = new Date(selectedTask.deadlineReview) > now;
    }
  }

  return (
    <>
      {selectedTask?.availableToSubmit && (
        <Title level={5} style={{ marginBottom: "2rem" }}>
          <span className="warning">Attention!</span> You should submit the task{" "}
          {selectedTask.id} before{" "}
          {new Date(selectedTask.deadlineSubmit).toLocaleString().slice(0, -3)}
        </Title>
      )}
      <Select
        defaultValue={selectedTask?.id}
        placeholder="Select task"
        style={{ width: 360 }}
        onChange={(value) => {
          const task = tasks.find((t) => t.id === value);
          if (task) {
            onChange(task);
          }
        }}
        loading={!tasks.length}
      >
        {tasks.map(({ id }) => (
          <Option key={id} value={id}>
            {id}
          </Option>
        ))}
      </Select>
      {canProceed && (
        <>
          <Button
            onClick={onNext}
            type="primary"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Next
          </Button>
        </>
      )}
      {!canProceed && selectedTask && (
        <div className="warning">Deadline has passed</div>
      )}
      {submissionMock.taskId === selectedTask?.id ? (
        <div>
          <Text>
            <Space>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
              <span>
                Task {submissionMock.taskId} succsessfully submited{" "}
                {submissionMock.submittedAt}
              </span>
            </Space>
          </Text>
          ,<Title level={5}>Link on Demo </Title>
          <Paragraph>{submissionMock.demoLink}</Paragraph>
          <Title level={5}>Link on repository</Title>
          <Paragraph>{submissionMock.repoLink}</Paragraph>
          <Title level={5}>Self-check score</Title>
          <Paragraph>{submissionMock.selfCheckScore}</Paragraph>
        </div>
      ) : (
        selectedTask?.id && <Paragraph>This task hasn't submited</Paragraph>
      )}
    </>
  );
};
