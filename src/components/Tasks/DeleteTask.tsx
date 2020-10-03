import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import * as dataActions from '../../storage/data/actions';

const { confirm } = Modal;

type TDeleteTask = {
  id: string;
};

const DeleteSession: FC<TDeleteTask> = ({ id }) => {
  const dispatch = useDispatch();
  const deleteTask = payload => dispatch(dataActions.tasks.delete(payload));

  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure to delete this session?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteTask(id);
      },
    });
  }

  return (
    <Space>
      <Button style={{ color: 'red' }} type="text" onClick={showDeleteConfirm}>
        <i className="fas fa-trash-alt" />
      </Button>
    </Space>
  );
};

export default DeleteSession;
