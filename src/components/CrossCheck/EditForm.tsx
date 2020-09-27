import React, { FC, useState, useEffect } from 'react';
import { Button, Card, DatePicker, Form, InputNumber, Modal, Select } from 'antd';
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
  closeModal: () => void;
};

type TFormValues = {
  startDate: moment.Moment;
  submitDate: moment.Moment;
  reviewDate: moment.Moment;
  coefficient: number;
  minReviewers: number;
  desiredReviewersAmount: number;
};

const EditForm: FC<TEditForm> = ({ session, visible, closeModal }) => {
  const [form] = Form.useForm<TFormValues>();

  const tasks = useSelector<TStore, ITask[] | null>(state => dataSelectors.tasks(state));

  const [taskID, setTaskID] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [submitDate, setSubmitDate] = useState<Date | null>(null);
  const [reviewDate, setReviewDate] = useState<Date | null>(null);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      if (session) {
        setTaskID(session.taskId);
        form.setFieldsValue({
          startDate: session.startDate ? moment(session.startDate) : moment().endOf('day'),
          submitDate: session.deadlineSubmit ? moment(session.deadlineSubmit) : undefined,
          reviewDate: session.deadlineReview ? moment(session.deadlineReview) : undefined,
          coefficient: session.coefficient,
          minReviewers: session.minReiewsAmount,
          desiredReviewersAmount: session.desiredReviewersAmount,
        });
        setStartDate(session.startDate || moment().endOf('day').toDate());
        setSubmitDate(session.deadlineSubmit || undefined);
        setReviewDate(session.deadlineReview || undefined);
      } else {
        form.setFieldsValue({
          startDate: moment().endOf('day'),
          submitDate: undefined,
          reviewDate: undefined,
          coefficient: 1,
          minReviewers: 3,
          desiredReviewersAmount: 4,
        });
        setTaskID(null);
        setStartDate(moment().endOf('day').toDate());
        setSubmitDate(undefined);
        setReviewDate(undefined);
        setLoading(false);
      }
    }
  }, [visible, session]);

  const dispatch = useDispatch();
  const createCrosscheckSession = (payload: ICrosscheckSession) =>
    dispatch(dataActions.crosscheckSessions.create(payload));
  const updateCrosscheckSession = (payload: ICrosscheckSession) =>
    dispatch(dataActions.crosscheckSessions.update(payload));

  function handleTaskIdChange(value: string) {
    setTaskID(value);
  }

  const onFinish = (values: TFormValues) => {
    if (submitDate <= startDate || reviewDate <= startDate || reviewDate <= submitDate) {
      return;
    }
    const data: ICrosscheckSession = {
      coefficient: values.coefficient,
      deadlineReview: values.reviewDate ? values.reviewDate.toDate() : null,
      deadlineSubmit: values.submitDate ? values.submitDate.toDate() : null,
      desiredReviewersAmount: values.desiredReviewersAmount,
      discardMaxScore: true,
      discardMinScore: true,
      minReiewsAmount: values.minReviewers,
      startDate: values.startDate ? values.startDate.toDate() : null,
      taskId: taskID,
      state: session ? session.state : 'DRAFT',
      id: session ? session.id : null,
    };
    if (!session) {
      createCrosscheckSession(data);
    } else {
      updateCrosscheckSession(data);
    }
    closeModal();
  };

  function handleCancel() {
    closeModal();
  }

  function getActionButtonName() {
    switch (session?.state) {
      case 'DRAFT':
        return 'Start requests gathering';
      case 'REQUESTS_GATHERING':
        return 'Start crosscheck and shuffle students';
      case 'CROSS_CHECK':
        return 'End session and calculate score';
      default:
        return null;
    }
  }

  useEffect(() => {
    if (session && currentAction && currentAction !== session?.state) {
      setCurrentAction(null);
      setLoading(false);
    }
  }, [currentAction, session]);

  const shuffleStudents = (s: ICrosscheckSession) => dispatch(dataActions.attendees.shuffle(s));

  function handleAction() {
    if (loading || !visible) {
      return;
    }
    const data: ICrosscheckSession = { ...session };
    switch (session.state) {
      case 'DRAFT':
        data.state = 'REQUESTS_GATHERING';
        break;
      case 'REQUESTS_GATHERING':
        data.state = 'CROSS_CHECK';
        shuffleStudents(session);
        break;
      case 'CROSS_CHECK':
        data.state = 'COMPLETED';
        break;
      default:
        break;
    }
    setCurrentAction(session.state);
    setLoading(true);
    updateCrosscheckSession(data);
    if (session.state === 'CROSS_CHECK') {
      closeModal();
    }
  }

  return (
    <Modal
      width="90vw"
      visible={visible}
      title="Cross-Check Session"
      onCancel={handleCancel}
      footer={[]}
      destroyOnClose
    >
      <div>
        {!session ? (
          <Select
            placeholder="Select task"
            value={taskID}
            style={{ width: '100%' }}
            onChange={handleTaskIdChange}
          >
            {tasks
              .filter(e => e.state === 'PUBLISHED')
              .map(e => (
                <Option key={e.id} value={e.id}>
                  {e.name}
                </Option>
              ))}
          </Select>
        ) : null}
        {session ? <Button onClick={handleAction}>{getActionButtonName()}</Button> : null}
        <Form
          form={form}
          name="formAddSession"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {taskID ? (
            <>
            <Card>
              <p>Task name: <br /> {tasks.find(e => e.id === taskID).name}</p>
              <p>Description: <br /> {tasks.find(e => e.id === taskID).description}</p>
            </Card>
              <Card>
                <Form.Item
                  label="Session start"
                  name="startDate"
                  rules={[{ required: true, message: 'Please select date' }]}
                >
                  <DatePicker
                    // value={startDate ? moment(startDate) : moment().endOf('day')}
                    onChange={value => setStartDate(value ? value.toDate() : null)}
                    defaultPickerValue={moment().endOf('day')}
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={c => c && c < moment().startOf('day')}
                    showTime={{ defaultValue: moment('23:59:59', 'HH:mm') }}
                  />
                </Form.Item>
                <Form.Item
                  label="Submit deadline"
                  name="submitDate"
                  validateStatus={submitDate <= startDate ? 'error' : undefined}
                  help={submitDate <= startDate ? 'Please select the correct date' : undefined}
                  rules={[{ required: true, message: 'Please select date' }]}
                >
                  <DatePicker
                    onChange={value => setSubmitDate(value ? value.toDate() : null)}
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={c => c && c < moment(startDate).endOf('day')}
                    showTime={{ defaultValue: moment('23:59:59', 'HH:mm') }}
                  />
                </Form.Item>
                <Form.Item
                  label="Review deadline"
                  name="reviewDate"
                  validateStatus={
                    reviewDate <= startDate || reviewDate <= submitDate ? 'error' : undefined
                  }
                  help={
                    reviewDate <= startDate || reviewDate <= submitDate
                      ? 'Please select the correct date'
                      : undefined
                  }
                  rules={[{ required: true, message: 'Please select date' }]}
                >
                  <DatePicker
                    // value={reviewDate ? moment(reviewDate) : undefined}
                    onChange={value => setReviewDate(value ? value.toDate() : null)}
                    format="YYYY-MM-DD HH:mm"
                    disabledDate={c => c && c < moment(submitDate).endOf('day')}
                    showTime={{ defaultValue: moment('23:59:59', 'HH:mm') }}
                  />
                </Form.Item>
              </Card>
              <Card>
                <Form.Item
                  label="Coefficient"
                  name="coefficient"
                  rules={[{ required: true, message: 'Please select coefficient' }]}
                >
                  <InputNumber min={0.1} max={10} step={0.1} />
                </Form.Item>
                <Form.Item
                  label="Min Reviewers Amount"
                  name="minReviewers"
                  rules={[{ required: true, message: 'Please select min reviewers amount' }]}
                >
                  <InputNumber min={1} max={10} />
                </Form.Item>
                <Form.Item
                  label="Desired Reviewers Amount"
                  name="desiredReviewersAmount"
                  rules={[{ required: true, message: 'Please select desired reviewers amount' }]}
                >
                  <InputNumber min={1} max={10} />
                </Form.Item>
              </Card>
              <Form.Item>
                <Button key="back" onClick={handleCancel}>
                  Return
                </Button>
                ,
                <Button key="submit" type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
                ,
              </Form.Item>
            </>
          ) : null}
        </Form>
      </div>
    </Modal>
  );
};

export default EditForm;
