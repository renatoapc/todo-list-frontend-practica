import { apiRequest } from "./client";

export const getTasks = (token) => {
  return apiRequest("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTaskApi = (token, text) => {
  return apiRequest("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
};


export const updateTaskApi = (token, taskId, changes) => {
  return apiRequest(`/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(changes),
  });
};


export const deleteTaskApi = (token, taskId) => {
  return apiRequest(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};