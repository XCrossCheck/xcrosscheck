import { Button } from 'antd';
import React, { FC, useState } from 'react';
import { ICrosscheckSession } from '../../storage/data/reducer';
import EditForm from './EditForm';

type TEditSession = {
  text?: string
  session: ICrosscheckSession;
};

const EditSession: FC<TEditSession> = ({ text, children, session }) =>  {

  const [visible, setVisible] = useState<boolean>(false);

  function showModal() {
    setVisible(true);
  }

  return (
      <>
        <Button onClick={showModal}>
          {children || text}
        </Button>
        <EditForm visible={visible} setVisible={setVisible} session={session}/>
      </>
  );
};

export default EditSession;