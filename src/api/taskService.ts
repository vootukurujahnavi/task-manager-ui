// src/api/taskService.ts

// Define Task type
export interface Task {
  id?: number;
  name: string;
  description: string;
  status?: string; // optional
}
const API_BASE_URL = "http://localhost:8080/api/tasks";
// Create or update task
export const createOrUpdateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(
    `http://localhost:8080/tasks${task.id ? `/${task.id}` : ""}`,
    {
      method: task.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }
  );

  if (!response.ok) throw new Error("Failed to create or update task");
  return response.json();
};

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:8080/tasks");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};

// Delete task
export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
};

// Search tasks
export const searchTasks = async (query: string): Promise<Task[]> => {
  const response = await fetch(
    `http://localhost:8080/tasks/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to search tasks");
  return response.json();
};

// Execute task
export const executeTask = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/tasks/${id}/execute`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to execute task");
};

// Ensure this file is treated as a module
export {};
