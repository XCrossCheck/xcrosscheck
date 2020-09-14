import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Space, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

const ScorePage = (props: any) => {
  const { Paragraph, Text } = Typography;
  const {
    taskId,
    currentTask,
    taskInfo,
    submitedDate,
    setSubmitedDate,
    demoLink,
    repoLink,
    selfCheckScore,
    isSubmited,
    setDemoLink,
    setRepoLink,
    setSelfCheckScore,
    onSubmit,
    submitInfo,
  } = props.sub;
  const reviewScore = {
    score: [
      { to: "nick", score: "120" },
      { to: "nick", score: "100" },
      { to: "kate", score: "140" },
    ],
  };

  const getPoints = {
    score: [{ from: "lisa", score: "120" }, { from: "slava" }],
  };
  const [getScore, changeScoreStatus] = useState(false);
  const score = reviewScore.score;
  if (score.length > 2) {
    changeScoreStatus(true);
  }

  return (
    <div>
      <Text>
        <Space>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
          <span>
            Task {currentTask.name} succsessfully submited{" "}
            {taskInfo.submitedDate}
          </span>
        </Space>
      </Text>
      ,<h3>Link on Demo </h3>
      <Paragraph>{demoLink}</Paragraph> <h3>Link on repository</h3>
      <Paragraph>{repoLink}</Paragraph>
      {/* <h3>Self-check score</h3>
      <Paragraph>{selfCheckScore}</Paragraph>
       { score.length > 2?changeScoreStatus(true):<Paragraph type="danger">You have to review three tasks!</Paragraph>  }>
        {changeScoreStatus? 
        <ul>score.map((elem,idx)=><li>{elem.}</li>)</ul>
        } */}
    </div>
  );
};

export default ScorePage;
