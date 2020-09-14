import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Space, Typography } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Task } from "./types";

const { Title } = Typography;

interface Props {
  task: Task;
  submittedAt: string;
}

export const Success: FC<Props> = ({ task, submittedAt }) => {
  return (
    <>
      <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "64px" }} />
      <div>
        <Title level={3}>
          <Space>
            <span>
              Task {task.id} succsessfully submited{" "}
              {new Date(submittedAt).toLocaleString().slice(0, -3)}
            </span>
          </Space>
        </Title>
      </div>
      <Space>
        <Link to={"/student"}>
          <Button>To Main Page</Button>
        </Link>
      </Space>
    </>
  );
};
