import axios from "axios";

export const fetchStatuses = async (token) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/statuses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchPriorities = async (token) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/priorities",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchDepartments = async (token) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/departments",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchEmployees = async (token) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/employees",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const fetchTasks = async (token) => {
  const response = await axios.get(
    "https://momentum.redberryinternship.ge/api/tasks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
