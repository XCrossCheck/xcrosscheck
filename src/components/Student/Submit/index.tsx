import React, { useState } from 'react';
import { Steps } from 'antd';
import { CheckScore } from 'src/types/Criteria';
import { Links, SubmitInfo } from './types';
import { SelectTask } from './SelectTask';
import { SelfCheck } from './SelfCheck';
import { SubmitForm } from './SubmitForm';
import { ReviewAndSubmit } from './ReviewAndSubmit';
import { Success } from './Success';
import './Submit.css';
import { AggregatedTask } from '../services/getTasks';

const { Step } = Steps;

const steps = ['Select Task', 'Submit Links', 'Self-check', 'Submit', 'Success'];

export default function Submit() {
  const [current, setCurrent] = useState(0);
  const [task, setTask] = useState<AggregatedTask>();
  const [links, setLinks] = useState<Links>({
    demoLink: '',
    repoLink: '',
  });
  const [selfCheck, setSelfCheck] = useState<CheckScore>();
  const [submittedAt, setSubmitedDate] = useState<string>('');
  const [previousInfo, setPreviousInfo] = useState<SubmitInfo>();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  let content;

  switch (current) {
    case 0:
      content = (
        <SelectTask
          onNext={next}
          onChange={setTask}
          previousInfo={previousInfo}
          selectedTask={task}
          setPreviousInfo={setPreviousInfo}
          mode="submit"
        />
      );
      break;
    case 1:
      content = task && (
        <SubmitForm
          onSubmit={next}
          onNext={next}
          onBack={prev}
          task={task}
          initialValues={links}
          setLinks={values => setLinks(values)}
        />
      );
      break;
    case 2:
      content = task && (
        <SelfCheck onNext={next} onBack={prev} task={task} setSelfCheck={setSelfCheck} />
      );
      break;
    case 3:
      content = task && (
        <ReviewAndSubmit
          onBack={prev}
          onNext={next}
          task={task}
          links={links}
          selfCheck={selfCheck}
          setSubmitedDate={setSubmitedDate}
        />
      );
      break;
    case 4:
      content = task && <Success task={task} submittedAt={submittedAt} />;
      break;
    default:
      break;
  }

  return (
    <>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item} title={item} />
        ))}
      </Steps>
      <div className="steps-content">{content}</div>
    </>
  );
}
