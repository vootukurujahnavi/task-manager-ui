// src/components/TaskExecutionModal.tsx

import React, { useEffect, useState } from "react";
import { Modal, Button, List, message, Spin } from "antd";
import { executeTask, Task } from "../api/taskService";

interface TaskExecutionModalProps {
  taskId: number;
  onClose: () => void;
}

const TaskExecutionModal: React.FC<TaskExecutionModalProps> = ({
  taskId,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Optionally, you could fetch execution logs for the task
    setLogs([]); // reset logs when modal opens
  }, [taskId]);

  const handleExecute = async () => {
    setLoading(true);
    try {
      await executeTask(taskId);
      message.success("Task executed successfully!");
      setLogs((prev) => [...prev, `Task ${taskId} executed at ${new Date().toLocaleTimeString()}`]);
    } catch {
      message.error("Failed to execute task");
    }
    setLoading(false);
  };

  return (
    <Modal
      title={`Execute Task #${taskId}`}
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="execute" type="primary" onClick={handleExecute} loading={loading}>
          Execute
        </Button>,
      ]}
    >
      {loading ? (
        <Spin tip="Executing..." />
      ) : logs.length === 0 ? (
        <p>No execution logs yet.</p>
      ) : (
        <List
          size="small"
          bordered
          dataSource={logs}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      )}
    </Modal>
  );
};

export default TaskExecutionModal;
