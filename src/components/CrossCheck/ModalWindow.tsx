import { Modal, Button } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as dataActions from '../../storage/data/actions';

type TModalWindow = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const ModalWindow: FC<TModalWindow> = ({ visible, setVisible }) =>  {

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const createCrosscheckSession = (payload) => dispatch(dataActions.crosscheckSessions.create(payload));
  
  function handleOk() {
    createCrosscheckSession({
      attendees: [],
      coefficient: 0.5,
      deadlineReview: new Date(),
      deadlineSubmit: new Date(),
      desiredReviewersAmount: 5,
      discardMaxScore: true,
      discardMinScore: true,
      minReiewsAmount: 3,
      startDate: new Date(),
      state: 'REVIEW',
      taskId: 'songbird',
      id: null,
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      title="Title"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ModalWindow;