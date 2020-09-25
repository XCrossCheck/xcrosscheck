import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, Space, Typography, Modal, Divider, Input } from 'antd';
import { dbGetReq } from '../../../service/restapi-fb';
import './Submit.css';
import {
  getReviewScore,
  getReceivedScore,
  ScoreRes,
  getDetailedFeedback,
  Feedback,
} from '../services/getScore';

const { Paragraph } = Typography;
const { TextArea } = Input;

export const StudentScore: FC = () => {
  const [showScore, setShowScore] = useState(false);
  const [getScore, setGetScore] = useState<any[]>();
  const [visible, showModal] = useState<boolean>(false);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>();
  const { taskId } = useParams();
  const [complaints, setComplaint] = useState<string[]>([]);
  // const myGitHub = useSelector (authSelectors.githubId);
  const myGitHub = 'katrin-kot';

  useEffect(() => {
    getReceivedScore(taskId, myGitHub).then(receivedScore => setGetScore(receivedScore));
    getReviewScore(taskId, myGitHub).then(reviewScore => {
      if (reviewScore.length > 2) {
        setShowScore(true);
      } else {
        setShowScore(false);
      }
    });
  });

  return (
    <>
      <div>
        {showScore ? (
          getScore.map((elem: ScoreRes) => (
            <div className="feedback-wrapper">
              <div className="score-wrapper">
                <Paragraph strong>From {elem?.sender}: </Paragraph>
                <Paragraph>{elem?.crossCheckScore}</Paragraph>
              </div>
              <Paragraph strong>Feedback</Paragraph>
              <Paragraph>{elem?.feedback}</Paragraph>
              <Button
                type="primary"
                onClick={() => {
                  getDetailedFeedback(elem.feedbackId).then((feedback: Feedback) => {
                    setCurrentFeedback(feedback);
                    showModal(true);
                  });
                }}
              >
                Show detailed feedback
              </Button>
              <Modal
                visible={visible}
                title={`Feedback from ${elem.sender}`}
                onCancel={() => showModal(false)}
                footer={[
                  <Button key="back" onClick={() => showModal(false)}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" onClick={() => showModal(false)}>
                    Submit
                  </Button>,
                ]}
              >
                {currentFeedback && (
                  <>
                    <h4>Basic scope:</h4>
                    <p>{currentFeedback.items.basic_p1.comment}</p>
                    <h4>Score:</h4>
                    <Paragraph strong>{currentFeedback.items.basic_p1.score}</Paragraph>
                    <TextArea rows={3} placeholder="Enter your complaint" allowClear />
                    <Divider />
                    <h4>Extra scope:</h4>
                    <p>{currentFeedback.items.extra_p1.comment}</p>
                    <h4>Score:</h4>
                    <Paragraph strong>{currentFeedback.items.extra_p1.score}</Paragraph>
                    <TextArea rows={3} placeholder="Enter your complaint" allowClear />
                    <Divider />
                    <h4>Fines:</h4>
                    <p>{currentFeedback.items.fines_p1.comment}</p>
                    <h4>Score:</h4>
                    <Paragraph strong>{currentFeedback.items.fines_p1.score}</Paragraph>
                    <TextArea rows={3} placeholder="Enter your complaint" allowClear />
                    <Divider />
                  </>
                )}
              </Modal>
            </div>
          ))
        ) : (
          <Paragraph>You should review at least three tasks or you do not have notes</Paragraph>
        )}
      </div>
      <div>
        <Space>
          <Link to="/student/submit">
            <Button size="large">Back</Button>
          </Link>
        </Space>
      </div>
    </>
  );
};
