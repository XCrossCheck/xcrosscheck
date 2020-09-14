import React, { useState } from "react";
import { Steps } from "antd";
import { Links, Task } from "./types";
import { SelectTask } from "./SelectTask";
import { SelfCheck } from "./SelfCheck";
import { SubmitForm } from "./SubmitForm";
import { ReviewAndSubmit } from "./ReviewAndSubmit";
import { Success } from "./Success";
import "./Submit.css";

const { Step } = Steps;

const steps = [
  "Select Task",
  "Submit Links",
  "Self-check",
  "Submit",
  "Success",
];

export default function Submit() {
  const [current, setCurrent] = useState(0);
  const [task, setTask] = useState<Task>();
  const [links, setLinks] = useState<Links>({
    demoLink: "",
    repoLink: "",
  });
  const [selfCheck, setSelfCheck] = useState<string>("");
  const [submittedAt, setSubmitedDate] = useState<string>("");

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
          selectedTask={task}
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
          setLinks={(values) => setLinks(values)}
        />
      );
      break;
    case 2:
      content = <SelfCheck onNext={next} onBack={prev} />;
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
        {steps.map((item) => (
          <Step key={item} title={item} />
        ))}
      </Steps>
      <div className="steps-content">{content}</div>
    </>
  );
}
