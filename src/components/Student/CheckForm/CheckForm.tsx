/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect } from 'react';
import { Form, Typography, Input, InputNumber, Button, Divider } from 'antd';
import { Rule } from 'antd/lib/form';
import { CheckScore, Criteria } from 'src/types/Criteria';
import { AggregatedTask } from '../services/getTasks';

const { Paragraph, Title } = Typography;
const { TextArea } = Input;

interface Props {
  task: AggregatedTask;
  onFinish: (values?: any) => void;
}

const formatMark = (mark: number) => {
  if (mark >= 0) {
    return `+${mark}`;
  }
  return `-${mark}`;
};

const FormItemForCriteria: FC<{
  criterias: Criteria[];
  name: string;
}> = ({ criterias, name }) => {
  return (
    <Form.List name={name}>
      {fields => (
        <div>
          {fields.map(field => {
            const { text, score } = criterias[field.fieldKey];
            const rules: Rule[] =
              score >= 0
                ? [
                    { min: 0, type: 'number', message: 'Оценка не может быть меньше нуля' },
                    { max: score, type: 'number', message: `Оценка не может превышать ${score}` },
                  ]
                : [
                    { min: score, type: 'number', message: `Оценка не может быть ниже ${score}` },
                    { max: 0, type: 'number', message: 'Оценка не может быть больше нуля' },
                  ];
            return (
              <div key={field.key}>
                <Divider
                  style={{
                    width: '50%',
                    minWidth: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                />
                <Title level={5}>{text}</Title>
                <Paragraph>Оценка: {formatMark(score)}</Paragraph>
                <Form.Item
                  label="Ваш комментарий"
                  name={[field.name, 'comment']}
                  fieldKey={[field.fieldKey, 'comment']}
                >
                  <TextArea autoSize />
                </Form.Item>
                <Form.Item
                  label="Ваша оценка"
                  name={[field.name, 'score']}
                  fieldKey={[field.fieldKey, 'score']}
                  initialValue={0}
                  rules={rules}
                >
                  <InputNumber />
                </Form.Item>
              </div>
            );
          })}
        </div>
      )}
    </Form.List>
  );
};

export const CheckForm: FC<Props> = ({ task, onFinish }) => {
  const [form] = Form.useForm<CheckScore>();
  const { basic, extra, fines } = task;

  useEffect(() => {
    form.setFieldsValue({
      basic: basic.map(() => ({
        comment: '',
        score: 0,
      })),
      extra: extra.map(() => ({
        comment: '',
        score: 0,
      })),
      fines: fines.map(() => ({
        comment: '',
        score: 0,
      })),
    });
  }, [basic, extra, fines, form]);

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ remember: true }}>
      <Title level={4}>Basic scope</Title>
      <FormItemForCriteria criterias={basic} name="basic" />

      <Title level={4}>Extra scope</Title>
      <FormItemForCriteria criterias={extra} name="extra" />

      <Title level={4}>Fines scope</Title>
      <FormItemForCriteria criterias={fines} name="fines" />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
