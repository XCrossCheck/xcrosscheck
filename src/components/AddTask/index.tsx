/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect } from 'react';
import { Criteria } from 'src/types/Criteria';
import { Form, Input, Button, Divider, Typography, InputNumber, Modal, Select } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import Dragger from 'antd/lib/upload/Dragger';
import { RcFile } from 'antd/lib/upload';
import { ITask, ITaskDb } from '../../storage/data/dataTypes';
import * as authSelectors from '../../storage/auth/selectors';
import * as dataActions from '../../storage/data/actions';
import { TStore } from '../../storage';

const { Title } = Typography;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const dividerBlack = {
  style: {
    borderTop: '1px solid black',
  },
};

type TAddTask = {
  task?: ITask;
  visible: boolean;
  closeModal: () => void;
};

type TFormValues = {
  taskName: string;
  demo?: string;
  repoName?: string;
  screenshot?: string;
  description?: string;
  branchName?: string;
  status: string;
  basic: Criteria[];
  extra: Criteria[];
  fines: Criteria[];
};

const AddTask: FC<TAddTask> = ({ visible, closeModal, task }) => {
  const [form] = Form.useForm<TFormValues>();

  const githubId = useSelector<TStore, string | null>(state => authSelectors.githubId(state));
  useEffect(() => {
    if (visible) {
      if (task) {
        form.setFieldsValue({
          taskName: task.name,
          demo: task.demoUrl,
          repoName: task.repoName,
          screenshot: task.screenshot,
          description: task.description,
          branchName: task.branchName,
          status: task.state,
          basic: task.basic,
          extra: task.extra,
          fines: task.fines,
        });
      } else {
        form.setFieldsValue({
          taskName: null,
          demo: null,
          repoName: null,
          screenshot: null,
          description: null,
          branchName: null,
          status: 'DRAFT',
          basic: null,
          extra: null,
          fines: null,
        });
      }
    }
  }, [visible, task, form]);

  const dispatch = useDispatch();
  const createTask = (payload: ITask) => dispatch(dataActions.tasks.create(payload));
  const updateTask = (payload: ITask) => dispatch(dataActions.tasks.update(payload));

  const onFinish = (values: TFormValues) => {
    const data: ITask = {
      name: values.taskName,
      author: task?.author || githubId,
      description: values.description,
      branchName: values.branchName,
      repoName: values.repoName,
      screenshot: values.screenshot,
      demoUrl: values.demo,
      state: values.status,
      basic: values.basic,
      extra: values.extra,
      fines: values.fines,
      id: null,
    };
    if (!task) {
      createTask(data);
    } else {
      data.id = task.id;
      updateTask(data);
    }
    closeModal();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.warn('Failed:', errorInfo);
  };

  function handleCancel() {
    closeModal();
  }

  function exportToJson() {
    form
      .validateFields()
      .then(() => {
        const values: TFormValues = form.getFieldsValue();
        const data: ITaskDb = {
          name: values.taskName,
          author: task?.author || githubId,
          description: values.description,
          branchName: values.branchName,
          repoName: values.repoName,
          screenshot: values.screenshot,
          demoUrl: values.demo,
          state: values.status,
          basic: values.basic,
          extra: values.extra,
          fines: values.fines,
        };
        const json = JSON.stringify(data);
        saveAs(new Blob([json], { type: 'application/json;charset=utf-8' }), 'task.json');
      })
      .catch(() => null);
  }

  function importFromJson(file: RcFile) {
    const reader = new FileReader();
    reader.onload = e => {
      const taskObj = JSON.parse(e.target.result as string);
      if (taskObj.name && taskObj.description && taskObj.author) {
        form.setFieldsValue({
          taskName: taskObj.name,
          demo: taskObj.demoUrl,
          repoName: taskObj.repoName,
          screenshot: taskObj.screenshot,
          description: taskObj.description,
          branchName: taskObj.branchName,
          status: taskObj.state,
          basic: taskObj.basic,
          extra: taskObj.extra,
          fines: taskObj.fines,
        });
      }
    };
    reader.readAsText(file);
    return false;
  }

  return (
    <Modal
      width="90vw"
      visible={visible}
      title="Add Task"
      onCancel={handleCancel}
      footer={[]}
      destroyOnClose
    >
      <Dragger name="file" beforeUpload={importFromJson} showUploadList={false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag JSON to this area to upload</p>
      </Dragger>
      <Form
        form={form}
        {...layout}
        name="formAddTask"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Название"
          name="taskName"
          rules={[{ required: true, message: 'Please input task name!' }]}
        >
          <Input placeholder="task name" />
        </Form.Item>

        <Form.Item
          label="название репозитория"
          name="repoName"
          rules={[{ required: false, message: 'Please input repo name!' }]}
        >
          <Input placeholder="repo name" />
        </Form.Item>

        <Form.Item
          label="название ветки"
          name="branchName"
          rules={[{ required: false, message: 'Please input branch name!' }]}
        >
          <Input placeholder="branch name" />
        </Form.Item>

        <Form.Item
          label="скриншот"
          name="screenshot"
          rules={[{ required: false, message: 'Please add screenshot!' }]}
        >
          <Input placeholder="screenshot" />
        </Form.Item>

        <Form.Item
          label="демо"
          name="demo"
          rules={[{ required: false, message: 'Please add a link to the demo!' }]}
        >
          <Input placeholder="demo" />
        </Form.Item>

        <Form.Item label="описание" name="description" rules={[{ required: false }]}>
          <Input.TextArea placeholder="description" />
        </Form.Item>
        <Form.Item label="статус" name="status" rules={[{ required: false }]}>
          <Select placeholder="Select status">
            {(task && task.state === 'DRAFT') || !task ? (
              <Option key="DRAFT" value="DRAFT">
                DRAFT
              </Option>
            ) : null}
            {task && (task.state === 'DRAFT' || task.state === 'PUBLISHED') ? (
              <Option key="PUBLISHED" value="PUBLISHED">
                PUBLISHED
              </Option>
            ) : null}
            {task && (task.state === 'PUBLISHED' || task.state === 'ARCHIVED') ? (
              <Option key="ARCHIVED" value="ARCHIVED">
                ARCHIVED
              </Option>
            ) : null}
          </Select>
        </Form.Item>
        <Divider {...dividerBlack} />

        <Title level={4}>Basic Score</Title>

        <Form.List name="basic">
          {(fieldsBasic, { add, remove }) => (
            <div className="basic">
              {fieldsBasic.map(field => (
                <div key={`basic_${field.key}`}>
                  <Title level={5}>{`Пункт ${field.key}`}</Title>
                  <Form.Item
                    label="Название"
                    name={[field.name, 'text']}
                    fieldKey={[field.fieldKey, 'text']}
                    rules={[{ required: true, message: 'Missing Text' }]}
                  >
                    <Input placeholder="Text" />
                  </Form.Item>
                  <Form.Item
                    label="Оценка"
                    name={[field.name, 'score']}
                    fieldKey={[field.fieldKey, 'score']}
                    initialValue={0}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', margin: '0 auto' }}
                  >
                    Удалить пункт {field.name} Basic
                  </Button>
                  <Divider
                    style={{
                      width: '50%',
                      minWidth: '50%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                </div>
              ))}
              <Form.Item {...tailLayout}>
                <Button
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined />
                  Добавить пункт Basic
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Divider {...dividerBlack} />

        <Title level={4}>Extra Score</Title>

        <Form.List name="extra">
          {(fieldsExtra, { add, remove }) => (
            <div className="extra">
              {fieldsExtra.map(field => (
                <div key={`extra_${field.key}`}>
                  <Title level={5}>{`Пункт ${field.key}`}</Title>
                  <Form.Item
                    label="Название"
                    name={[field.name, 'text']}
                    fieldKey={[field.fieldKey, 'text']}
                    rules={[{ required: true, message: 'Missing Text' }]}
                  >
                    <Input placeholder="Text" />
                  </Form.Item>
                  <Form.Item
                    label="Оценка"
                    name={[field.name, 'score']}
                    fieldKey={[field.fieldKey, 'score']}
                    initialValue={0}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', margin: '0 auto' }}
                  >
                    Удалить пункт {field.name} Extra
                  </Button>
                  <Divider
                    style={{
                      width: '50%',
                      minWidth: '50%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                </div>
              ))}
              <Form.Item {...tailLayout}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined />
                  Добавить пункт Extra
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Divider {...dividerBlack} />

        <Title level={4}>Fines</Title>

        <Form.List name="fines">
          {(fieldsFines, { add, remove }) => (
            <div className="fines">
              {fieldsFines.map(field => (
                <div key={`fines_${field.key}`}>
                  <Title level={5}>{`Пункт ${field.key}`}</Title>
                  <Form.Item
                    label="Название"
                    name={[field.name, 'text']}
                    fieldKey={[field.fieldKey, 'text']}
                    rules={[{ required: true, message: 'Missing Text' }]}
                  >
                    <Input placeholder="Text" />
                  </Form.Item>
                  <Form.Item
                    label="Оценка"
                    name={[field.name, 'score']}
                    fieldKey={[field.fieldKey, 'score']}
                    initialValue={0}
                  >
                    <InputNumber />
                  </Form.Item>

                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', margin: '0 auto' }}
                  >
                    Удалить пункт {field.name} Fines
                  </Button>
                  <Divider
                    style={{
                      width: '50%',
                      minWidth: '50%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                </div>
              ))}
              <Form.Item {...tailLayout}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined />
                  Добавить пункт Fines
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Divider {...dividerBlack} />
        <Form.Item {...tailLayout}>
          <Button onClick={exportToJson}>Export to JSON</Button>
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>
          <Button key="submit" type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTask;
