import axios from "axios";

const API_BASE = "https://momentum.redberryinternship.ge/api";

const getHeaders = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Task
export const fetchTasks = async (token) => {
  try {
    const response = await axios.get(`${API_BASE}/tasks`, getHeaders(token));
    return response.data;
  } catch (e) {
    console.error("Error fetching tasks:", e);
    throw new Error("Failed to fetch tasks");
  }
};

export const fetchTaskById = async (token, taskId) => {
  try {
    const response = await axios.get(
      `${API_BASE}/tasks/${taskId}`,
      getHeaders(token)
    );
    return response.data;
  } catch (e) {
    console.error("Error fetching task by id:", e);
    throw new Error("Failed to fetch task by id");
  }
};

export const createTask = async (token, taskData) => {
  try {
    console.log(taskData);
    const response = await axios.post(
      `${API_BASE}/tasks`,
      taskData,
      getHeaders(token)
    );
    return response.data;
  } catch (e) {
    console.error("Error creating task:", e);
    throw new Error("Failed to create task");
  }
};

export const updateTaskStatus = async (token, taskId, newStatusId) => {
  try {
    const response = await axios.put(
      `${API_BASE}/tasks/${taskId}`,
      { status_id: newStatusId },
      getHeaders(token)
    );
    return response.data;
  } catch (e) {
    console.error("Error updating task status:", e);
    throw new Error("Failed to update task status");
  }
};

// Comment
export const fetchTaskComments = async (token, taskId) => {
  try {
    const response = await axios.get(
      `${API_BASE}/tasks/${taskId}/comments`,
      getHeaders(token)
    );
    return response.data;
  } catch (e) {
    console.error("Error fetching task comments:", e);
    throw new Error("Failed to fetch task comments");
  }
};

export const createTaskComment = async (token, taskId, commentData) => {
  try {
    if (commentData.parent_id) {
      commentData.parent_id = commentData.parent_id;
    }
    const response = await axios.post(
      `${API_BASE}/tasks/${taskId}/comments`,
      commentData,
      getHeaders(token)
    );

    return response.data;
  } catch (e) {
    console.error("Error creating task comment:", e);
    throw new Error("Failed to create task comment");
  }
};

// Employee
export const fetchEmployees = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE}/employees`,
      getHeaders(token)
    );
    return response.data;
  } catch (e) {
    console.error("Error fetching employees:", e);
    throw new Error("Failed to fetch employees");
  }
};

export const createEmployee = async (token, employeeData) => {
  try {
    const response = await axios.post(
      `${API_BASE}/employees`,
      employeeData,
      getHeaders(token)
    );
    return response.data;
  } catch (e) {
    console.error("Error creating employee:", e);
    throw new Error("Failed to create employee");
  }
};

// Status
export const fetchStatuses = async () => {
  try {
    const response = await axios.get(`${API_BASE}/statuses`);
    return response.data;
  } catch (e) {
    console.error("Error fetching statuses:", e);
    throw new Error("Failed to fetch statuses");
  }
};

// Priority
export const fetchPriorities = async () => {
  try {
    const response = await axios.get(`${API_BASE}/priorities`);
    return response.data;
  } catch (e) {
    console.error("Error fetching priorities:", e);
    throw new Error("Failed to fetch priorities");
  }
};

// Department
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/departments`);
    return response.data;
  } catch (e) {
    console.error("Error fetching departments:", e);
    throw new Error("Failed to fetch departments");
  }
};
