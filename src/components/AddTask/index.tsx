/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useState, useEffect } from 'react';
import {
  Form, Input, Button, Divider, Typography, List, InputNumber, Modal, Select, 
} from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { IItem, ITask } from '../../storage/data/dataTypes';
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

const dividerLayout = {
  style: {
    width: '50%', minWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
  },
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
  taskName: string,
  demo?: string,
  repoName?: string,
  screenshot?: string,
  description?: string,
  branchName?: string,
  status: string,
};

const AddTask: FC<TAddTask> = ({ visible, closeModal, task }) => {
  const [form] = Form.useForm<TFormValues>();

  const githubId = useSelector<TStore, string | null>((state) => authSelectors.githubId(state));
  const [categoriesOrder, setCategoriesOrder] = useState<string[] | null>(null);
  const [items, setItems] = useState<IItem[] | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);

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
        });
        setCategoriesOrder(task.categoriesOrder);
        setItems(task.items);
      } else {
        form.setFieldsValue({
          taskName: null,
          demo: null,
          repoName: null,
          screenshot: null,
          description: null,
          branchName: null,
          status: 'DRAFT',
        });
        setCategoriesOrder(null);
        setItems(null);
      }
    }
  }, [visible, task]);
  
  // #region functions
  
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
      categoriesOrder,
      items,
      id: null
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
    // console.log('Failed:', errorInfo);
  };

  /* в процессе */
  const addListItem = () => {
    const list = document.getElementById('basicList');
    // console.log(list);
  };

  function handleCancel() {
    closeModal();
  }

  // #endregion

  return (
    <Modal
      width='90vw'
      visible={visible}
      title="Title"
      onCancel={handleCancel}
      footer={[ ]}
      destroyOnClose
    >
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

        <Form.Item
          label="описание"
          name="description"
          rules={[{ required: false }]}
        >
          <Input.TextArea placeholder="description" />
        </Form.Item>
        <Form.Item
          label="статус"
          name="status"
          rules={[{ required: false }]}
        >
          <Select placeholder="Select status">
            <Option key="DRAFT" value="DRAFT">DRAFT</Option>
            <Option key="PUBLISHED" value="PUBLISHED">PUBLISHED</Option>
            <Option key="ARCHIVED" value="ARCHIVED">ARCHIVED</Option>
          </Select>
        </Form.Item>
        <Divider
          {...dividerBlack}
        />

        <Title level={4}>Basic Score</Title>

        <Form.List name="basic">
          {(fieldsBasic, { add, remove }) => (
            <div className="basic">
              {fieldsBasic.map((field) => (
                <div key={field.key}>
                  <Form.Item
                    {...field}
                    label={['пункт ', field.name]}
                    name={['basic_p', field.name]}
                    fieldKey={[field.fieldKey, 'option']}
                  />
                  <Form.Item
                    {...field}
                    label="название"
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey, 'title']}
                    rules={[{ message: 'Missing Title' }]}
                  >
                    <Input placeholder="title" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="минимальный балл"
                    name={[field.name, 'minScore']}
                    fieldKey={[field.fieldKey, 'minScore']}
                    rules={[{ message: 'Missing min Score' }]}
                  >
                    <InputNumber defaultValue={0} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="максимальный балл"
                    name={[field.name, 'maxScore']}
                    fieldKey={[field.fieldKey, 'maxScore']}
                    rules={[{ message: 'Missing maxScore' }]}
                  >
                    <InputNumber defaultValue={0} />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label="описание"
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    rules={[{ message: 'Missing description' }]}
                  >
                    <Input.TextArea
                      placeholder="description"
                    />
                  </Form.Item>

                  <List
                    id="basicList"
                  />

                  <PlusCircleOutlined
                    onClick={() => {
                      addListItem();
                    }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}
                  />

                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', margin: '0 auto' }}
                  >
                    удалить пункт
                    {' '}
                    {field.name}
                    {' '}
                    Basic
                  </Button>
                  <Divider
                    style={{
                      width: '50%', minWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
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

        <Divider
          {...dividerBlack}
        />

        <Title level={4}>Extra Score</Title>

        <Form.List name="extra">
          {(fieldsExtra, { add, remove }) => (
            <div className="extra">
              {fieldsExtra.map((field) => (
                <div key={field.key}>
                  <Form.Item
                    {...field}
                    label={['пункт ', field.name]}
                    name={['extra_p', field.name]}
                    fieldKey={[field.fieldKey, 'title']}
                  />
                  <Form.Item
                    {...field}
                    label="название"
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey, 'title']}
                    rules={[{ message: 'Missing Title' }]}
                  >
                    <Input placeholder="title" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="минимальный балл"
                    name={[field.name, 'minScore']}
                    fieldKey={[field.fieldKey, 'minScore']}
                    rules={[{ message: 'Missing min Score' }]}
                  >
                    <InputNumber defaultValue={0} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="максимальный балл"
                    name={[field.name, 'maxScore']}
                    fieldKey={[field.fieldKey, 'maxScore']}
                    rules={[{ message: 'Missing maxScore' }]}
                  >
                    <InputNumber defaultValue={0} />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label="описание"
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    rules={[{ message: 'Missing description' }]}
                  >
                    <Input.TextArea
                      placeholder="description"
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}
                  />

                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', margin: '0 auto' }}
                  >
                    удалить пункт
                    {' '}
                    {field.name}
                    {' '}
                    Extra
                  </Button>
                  <Divider
                    style={{
                      width: '50%', minWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
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

        <Divider
          {...dividerBlack}
        />

        <Title level={4}>Fines</Title>

        <Form.List name="fines">
          {(fieldsFines, { add, remove }) => (
            <div className="fines">
              {fieldsFines.map((field) => (
                <div key={field.key}>
                  <Form.Item
                    {...field}
                    label={['пункт ', field.name]}
                    name={['fines_p', field.name]}
                    fieldKey={[field.fieldKey, 'option']}
                  />
                  <Form.Item
                    {...field}
                    label="название"
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey, 'title']}
                    rules={[{ message: 'Missing Title' }]}
                  >
                    <Input placeholder="title" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="минимальный балл"
                    name={[field.name, 'minScore']}
                    fieldKey={[field.fieldKey, 'minScore']}
                    rules={[{ message: 'Missing min Score' }]}
                  >
                    <InputNumber defaultValue={0} />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="максимальный балл"
                    name={[field.name, 'maxScore']}
                    fieldKey={[field.fieldKey, 'maxScore']}
                    rules={[{ message: 'Missing maxScore' }]}
                  >
                    <InputNumber defaultValue={0} />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    label="описание"
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    rules={[{ message: 'Missing description' }]}
                  >
                    <Input.TextArea
                      placeholder="description"
                    />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}
                  />

                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      remove(field.name);
                    }}
                    style={{ display: 'flex', margin: '0 auto' }}
                  >
                    удалить пункт
                    {' '}
                    {field.name}
                    {' '}
                    Fines
                  </Button>
                  <Divider
                    style={{
                      width: '50%', minWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
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

        <Divider
          {...dividerBlack}
        />
        <Form.Item {...tailLayout}>
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>,
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTask;
