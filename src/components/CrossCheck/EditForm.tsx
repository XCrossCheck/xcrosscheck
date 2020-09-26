import React, { FC, useState, useEffect } from 'react';
import { Button, Card, DatePicker, InputNumber, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ITask, ICrosscheckSession } from '../../storage/data/dataTypes';
import * as dataSelectors from '../../storage/data/selectors';
import * as dataActions from '../../storage/data/actions';
import { TStore } from '../../storage';

const { Option } = Select;

type TEditForm = {
  session?: ICrosscheckSession;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type TValidation = {
  taskID: boolean;
  startDate: boolean;
  submitDate: boolean;
  reviewDate: boolean;
  coefficient: boolean;
  minReviewers: boolean;
  desiredReviewersAmount: boolean;
  status: boolean;
  isValid: boolean;
};

const EditForm: FC<TEditForm> = ({ session, visible, setVisible }) =>  {

  const tasks = useSelector<TStore, ITask[] | null>((state) => dataSelectors.tasks(state));

  const [taskID, setTaskID] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [submitDate, setSubmitDate] = useState<Date | null>(null);
  const [reviewDate, setReviewDate] = useState<Date | null>(null);
  const [coefficient, setCoefficient] = useState<number | null>(null);
  const [minReviewers, setMinReviewers] = useState<number | null>(null);
  const [desiredReviewersAmount, setDesiredReviewersAmount] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      if (session) {
        setTaskID(session.taskId);
        setStartDate(session.startDate);
        setSubmitDate(session.deadlineSubmit);
        setReviewDate(session.deadlineReview);
        setCoefficient(session.coefficient);
        setMinReviewers(session.minReiewsAmount);
        setDesiredReviewersAmount(session.desiredReviewersAmount);
        setStatus(session.state);
      } else {
        setStartDate(moment().endOf('day').toDate());
        setCoefficient(1);
        setMinReviewers(3);
        setDesiredReviewersAmount(4);
        setStatus('DRAFT');
      }
    } else {
      setTaskID(null);
      setStartDate(null);
      setSubmitDate(null);
      setReviewDate(null);
      setCoefficient(null);
      setMinReviewers(null);
      setDesiredReviewersAmount(null);
      setStatus(null);
    }
  }, [visible]);

  const dispatch = useDispatch();
  const createCrosscheckSession = (payload: ICrosscheckSession) => dispatch(dataActions.crosscheckSessions.create(payload));
  const updateCrosscheckSession = (payload: ICrosscheckSession) => dispatch(dataActions.crosscheckSessions.update(payload));

  function handleTaskIdChange(value: string) {
    setTaskID(value);
  }

  function handleStartDateChange(value: moment.Moment | null) {
    setStartDate(value ? value.toDate() : null);
  }

  function handleSubmitDateChange(value: moment.Moment | null) {
    setSubmitDate(value ? value.toDate() : null);
  }

  function handleReviewDateChange(value: moment.Moment | null) {
    setReviewDate(value ? value.toDate() : null);
  }

  function disabledStartDate(current) {
    return current && current < moment().startOf('day');
  }

  function disabledSubmitDate(current) {
    return current && current < moment(startDate).endOf('day');
  }

  function disabledReviewDate(current) {
    return current && current < moment(submitDate).endOf('day');
  }

  function onCoefficientChange(value: number) {
    setCoefficient(value);
  }

  function onMinReviewersChange(value: number) {
    setMinReviewers(value);
  }

  function onDesiredReviewersAmountChange(value: number) {
    setDesiredReviewersAmount(value);
  }

  function handleStatusChange(value: string) {
    setStatus(value);
  }

  function validate() {
    const result: TValidation = {
      taskID: !!taskID,
      startDate: !!startDate,
      submitDate: !!submitDate,
      reviewDate: !!reviewDate,
      coefficient: !!coefficient,
      minReviewers: !!minReviewers,
      desiredReviewersAmount: !!desiredReviewersAmount,
      status: !!status,
      isValid: false,
    };
    if (submitDate <= startDate) {
      result.submitDate = false;
    }
    if (reviewDate <= startDate || reviewDate <= submitDate) {
      result.reviewDate = false;
    }
    result.isValid = result.taskID && result.startDate && result.submitDate && result.reviewDate 
      && result.coefficient && result.minReviewers && result.desiredReviewersAmount &&result.status;
    return result;
  }
  
  function handleOk() {
    const validationResult = validate();
    if (!validationResult.isValid) {
      return;
    }
    const data: ICrosscheckSession = {
      attendees: [],
      coefficient,
      deadlineReview: reviewDate,
      deadlineSubmit: submitDate,
      desiredReviewersAmount,
      discardMaxScore: true,
      discardMinScore: true,
      minReiewsAmount: minReviewers,
      startDate,
      state: status,
      taskId: taskID,
      id: null,
    };
    if (!session) {
      createCrosscheckSession(data);
    } else {
      data.id = session.id;
      data.attendees = session.attendees;
      updateCrosscheckSession(data);
    }
   
    setVisible(false);
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
    <div>
      {!session ? (
        <Select placeholder="Select task" value={taskID} style={{ width: 120 }} onChange={handleTaskIdChange}>
          {tasks.map((e) => 
            <Option key={e.id} value={e.id}>{e.name}</Option>
          )}
        </Select>
      ) : null}
      {taskID ? 
        (
          <>
            <Card>
              <p>{tasks.find((e) => e.id === taskID).name}</p>
            </Card>
            <Card>
              <div>
                <p>Session start:</p>
                <DatePicker
                  onChange={handleStartDateChange}
                  value={startDate ? moment(startDate) : moment().endOf('day')}
                  defaultPickerValue={moment().endOf('day')}
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={disabledStartDate}
                  showTime={{ defaultValue: moment('23:59:59', 'HH:mm') }}
                />
              </div>
              <div>
                <p>Submit dedline:</p>
                <DatePicker
                  onChange={handleSubmitDateChange}
                  value={submitDate ? moment(submitDate) : undefined}
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={disabledSubmitDate}
                  showTime={{ defaultValue: moment('23:59:59', 'HH:mm') }}
                />
              </div>
              <div>
                <p>Review dedline:</p>
                <DatePicker
                  onChange={handleReviewDateChange}
                  value={reviewDate ? moment(reviewDate) : undefined}
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={disabledReviewDate}
                  showTime={{ defaultValue: moment('23:59:59', 'HH:mm') }}
                />
              </div>
            </Card>
            <Card>
              <div>
                <p>Coefficient</p>
                <InputNumber min={0.1} max={10} step={0.1} value={coefficient} onChange={onCoefficientChange} />
              </div>
              <div>
                <p>Min Reviewers Amount</p>
                <InputNumber min={1} max={10} value={minReviewers} onChange={onMinReviewersChange} />
              </div>
              <div>
                <p>Desired Reviewers Amount</p>
                <InputNumber min={1} max={10} value={desiredReviewersAmount} onChange={onDesiredReviewersAmountChange} />
              </div>
            </Card>
            <Select placeholder="Select status" value={status} onChange={handleStatusChange}>
              <Option key="DRAFT" value="DRAFT">DRAFT</Option>
              <Option key="REQUESTS_GATHERING" value="REQUESTS_GATHERING">REQUESTS_GATHERING</Option>
              <Option key="CROSS_CHECK" value="CROSS_CHECK">CROSS_CHECK</Option>
              <Option key="COMPLETED" value="COMPLETED">COMPLETED</Option>
            </Select>
          </>
        )
        :
        null}
      </div>
    </Modal>
  );
};

export default EditForm;
