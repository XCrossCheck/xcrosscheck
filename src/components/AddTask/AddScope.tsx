/* eslint-disable react/jsx-props-no-spreading */
import { PlusOutlined } from '@ant-design/icons';
import { Input, InputNumber, Button, Divider, Form } from 'antd';
import React, { FC } from 'react';

const AddScope: FC = () => {
  return (
    <>
      <Form.List name="subtasks">
        {(fieldsBasic, { add, remove }) => (
          <div className="basic">
            {fieldsBasic.map(field => (
              <div key={field.key}>
                <Form.Item
                  label={['Subtask ', field.name + 1]}
                  fieldKey={[field.fieldKey, 'option']}
                />
                <Form.Item
                  label="Title"
                  name={[field.name, 'title']}
                  fieldKey={[field.fieldKey, 'title']}
                  rules={[{ required: true, message: 'Missing Title' }]}
                >
                  <Input placeholder="title" />
                </Form.Item>
                <Form.Item
                  label="Min Scope"
                  name={[field.name, 'minScore']}
                  fieldKey={[field.fieldKey, 'minScore']}
                  rules={[{ required: true, message: 'Missing min Score' }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="Max Score"
                  name={[field.name, 'maxScore']}
                  fieldKey={[field.fieldKey, 'maxScore']}
                  rules={[{ required: true, message: 'Missing maxScore' }]}
                >
                  <InputNumber />
                </Form.Item>

                <Form.Item
                  {...field}
                  label="Description"
                  name={[field.name, 'description']}
                  fieldKey={[field.fieldKey, 'description']}
                  rules={[{ required: true, message: 'Missing description' }]}
                >
                  <Input.TextArea placeholder="description" />
                </Form.Item>

                <Button
                  type="dashed"
                  danger
                  onClick={() => {
                    remove(field.name);
                  }}
                  style={{ display: 'flex', margin: '0 auto' }}
                >
                  Delete Subtask {field.name + 1}
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
            <Form.Item>
              <Button
                onClick={() => {
                  add();
                }}
                block
              >
                <PlusOutlined />
                Add New Subtask
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
      {/* <Title level={4}>Basic Score</Title>

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
            <Form.Item>
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
            <Form.Item>
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
            <Form.Item>
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
      </Form.List> */}
    </>
  );
};

export default AddScope;
