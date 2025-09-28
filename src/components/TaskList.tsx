// src/components/TaskList.tsx

import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from "antd";
import {
  getTasks,
  deleteTask,
  searchTasks,
  executeTask,
  Task,
} from "../api/taskService";
import TaskExecutionModal from "./TaskExecutionModal";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = searchQuery
        ? await searchTasks(searchQuery)
        : await getTasks();
      setTasks(data);
    } catch (error) {
      message.error("Failed to fetch tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery]);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      message.success("Task deleted");
      fetchTasks();
    } catch {
      message.error("Failed to delete task");
    }
  };

  const handleExecute = async (id: number) => {
    try {
      await executeTask(id);
      message.success("Task executed");
    } catch {
      message.error("Failed to execute task");
    }
  };

  return (
    <div>
      <Input.Search
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />

      <Table
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Description", dataIndex: "description", key: "description" },
          {
            title: "Actions",
            key: "actions",
            render: (_, record: Task) => (
              <>
                <Button
                  type="link"
                  onClick={() => handleDelete(record.id!)}
                  danger
                >
                  Delete
                </Button>
                <Button
                  type="link"
                  onClick={() => handleExecute(record.id!)}
                >
                  Execute
                </Button>
              </>
            ),
          },
        ]}
      />

      {selectedTaskId && (
        <TaskExecutionModal
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
