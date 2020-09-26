import { Button } from 'antd';
import React, { FC, useState } from 'react';
import { ITask } from '../../storage/data/dataTypes';

type TEditTask = {
  text?: string;
  // session: ICrosscheckSession;
  task: ITask;
};

const EditTask: FC<TEditTask> = ({ text, children, task }) =>  {

  const [visible, setVisible] = useState<boolean>(false);

  function showModal() {
    setVisible(true);
  }

  return (
      <>
        <Button onClick={showModal}>
          {children || text}
        </Button>
      </>
  );
};

export default EditTask;