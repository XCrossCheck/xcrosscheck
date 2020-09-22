import { Button } from 'antd';
import React, { FC, useState } from 'react';
import ModalWindow from './ModalWindow';

type TEditSession = {
  text?: string
};

const EditSession: FC<TEditSession> = ({ text, children }) =>  {

  const [visible, setVisible] = useState(false);

  function showModal() {
    setVisible(true);
  }

  return (
      <>
        <Button onClick={showModal}>
          {children || text}
        </Button>
        <ModalWindow visible={visible} setVisible={setVisible}/>
      </>
  );
};

export default EditSession;