import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Space, Typography, Modal, Divider, Input, Form, InputNumber } from 'antd';
import { dbCreateRecord } from '../../../service/restapi-fb';
import * as authSelectors from '../../../storage/auth/selectors';
import './Submit.css';
import {
  getReviewScore,
  getReceivedScore,
  ScoreRes,
  getDetailedFeedback,
  Feedback,
} from '../services/getScore';
import { AggregatedTask, getTasks } from '../services/getTasks';

const { Paragraph } = Typography;
const { TextArea } = Input;
interface ParamTypes {
  taskId: string;
}

export const StudentScorePage: FC = () => {
  const [showScore, setShowScore] = useState(false);
  const [getScore, setGetScore] = useState<any[]>();
  const [visible, showModal] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<AggregatedTask>();
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>();
  const { taskId } = useParams<ParamTypes>();
  const myGitHub = useSelector(authSelectors.githubId);
  const [form] = Form.useForm();

  useEffect(() => {
    getTasks().then(tasks => {
      setCurrentTask(tasks.find(task => task.taskId === taskId));
    });
  }, [taskId]);

  useEffect(() => {
    if (!currentTask) return;
    getReceivedScore(taskId, myGitHub).then(receivedScore => setGetScore(receivedScore));
    getReviewScore(taskId, myGitHub).then(reviewScore => {
      if (reviewScore.length > currentTask.minReiewsAmount - 1) {
        setShowScore(true);
      } else {
        setShowScore(false);
      }
    });
  }, [taskId, myGitHub, currentTask]);

  return (
    <>
      <div>
        {showScore ? (
          getScore.map((elem: ScoreRes) => (
            <div className="feedback-wrapper" key={elem.reviewId}>
              <div className="score-wrapper">
                <Paragraph strong>From {elem?.sender}: </Paragraph>
                <Paragraph>{elem?.crossCheckScore}</Paragraph>
              </div>
              <Paragraph strong>Feedback</Paragraph>
              <Paragraph>{elem?.feedback}</Paragraph>
              <Button
                type="primary"
                onClick={() => {
                  getDetailedFeedback(elem.reviewId).then((feedback: Feedback) => {
                    setCurrentFeedback(feedback);
                    showModal(true);
                  });
                }}
              >
                Show detailed feedback
              </Button>
            </div>
          ))
        ) : (
          <Paragraph>You should review more tasks or you do not have notes</Paragraph>
        )}
      </div>
      <Modal
        visible={visible}
        title="Feedback"
        width={600}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              dbCreateRecord('dispute', {
                'items': {
                  'basic_p1': {
                    'comment': values.basic,
                    'suggestedScore': values.basic_score,
                  },
                  'extra_p1': {
                    'comment': values.extra,
                    'suggestedScore': values.extra_score,
                  },
                  'fines_p1': {
                    'comment': values.fines,
                    'suggestedScore': values.fines_score,
                  },
                },
                'taskId': taskId,
                'reviewId': currentFeedback.feedbackId,
                'state': 'ONGOING',
              });
              form.resetFields();
              showModal(false);
            })
            .catch(info => {
              console.info('Validate Failed:', info);
            });
        }}
        onCancel={() => showModal(false)}
      >
        {currentFeedback && (
          <>
            <Form form={form} layout="vertical" name="basic">
              <h4>Basic scope:</h4>
              <p>{currentFeedback.items.basic_p1.comment}</p>
              <h4>Score:</h4>
              <Paragraph strong>{currentFeedback.items.basic_p1.score}</Paragraph>
              <Form.Item name="basic">
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  placeholder="Enter your complaint"
                  allowClear
                />
              </Form.Item>
              <Form.Item label="Suggested score" name="basic_score">
                <InputNumber />
              </Form.Item>
              <Divider />
              <h4>Extra scope:</h4>
              <p>{currentFeedback.items.extra_p1.comment}</p>
              <h4>Score:</h4>
              <Paragraph strong>{currentFeedback.items.extra_p1.score}</Paragraph>
              <Form.Item name="extra">
                <TextArea rows={3} placeholder="Enter your complaint" allowClear />
              </Form.Item>
              <Form.Item label="Suggested score" name="extra_score">
                <InputNumber />
              </Form.Item>
              <Divider />
              <h4>Fines:</h4>
              <p>{currentFeedback.items.fines_p1.comment}</p>
              <h4>Score:</h4>
              <Paragraph strong>{currentFeedback.items.fines_p1.score}</Paragraph>
              <Form.Item name="fines">
                <TextArea rows={3} placeholder="Enter your complaint" allowClear />
              </Form.Item>
              <Form.Item label="Suggested score" name="fines_score">
                <InputNumber />
              </Form.Item>
              <Divider />
            </Form>
          </>
        )}
      </Modal>
      <div>
        <Space>
          <Link to="/submit">
            <Button size="large">Back</Button>
          </Link>
        </Space>
      </div>
    </>
  );
};
