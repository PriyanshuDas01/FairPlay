import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
});

export const getTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (body: string) => {
  const response = await apiClient.post('/tasks', { body, completed: false });
  return response.data;
};

export const updateTask = async (id: string) => {
  const response = await apiClient.patch(`/tasks/${id}`);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};

