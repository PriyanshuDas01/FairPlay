import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
});

// Tasks
export const getTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (body: string) => {
  const response = await apiClient.post('/tasks', { body, completed: false });
  return response.data;
};

export const updateTask = async (id: string, body: string) => {
  const response = await apiClient.patch(`/tasks/${id}`, { body });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};

// Blogs
export const getBlogs = async () => {
  const response = await apiClient.get('/blogs');
  return response.data;
};

export const createBlog = async (title: string, content: string, author: string) => {
  const response = await apiClient.post('/blogs', { title, content, author });
  return response.data;
};

export const updateBlog = async (id: string, title: string, content: string, author: string) => {
  const response = await apiClient.patch(`/blogs/${id}`, { title, content, author });
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await apiClient.delete(`/blogs/${id}`);
  return response.data;
};
