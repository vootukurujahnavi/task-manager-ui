// src/components/TaskForm.tsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { createOrUpdateTask, Task } from "../api/taskService";

const TaskForm: React.FC<{ refreshList: () => void }> = ({ refreshList }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: Task) => {
    try {
      await createOrUpdateTask(values);
      message.success("Task saved successfully!");
      form.resetFields();
      refreshList();
    } catch (error) {
      message.error("Failed to save task");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Task Name"
        rules={[{ required: true, message: "Please enter a task name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
