import axios from "axios";

const API_URL = "https://6a0b208a21e445625697656f.mockapi.io/tasks";

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
};

export const addTodo = async (content) => {
  const response = await axios.post(API_URL, {
    content,
    createdAt: new Date().toISOString(),
    isCompleted: false,
  });
  return response.data;
};

export const updateTodo = async (id, content) => {
  const response = await axios.put(`${API_URL}/${id}`, { content });
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleTodo = async (id, isCompleted) => {
  const response = await axios.put(`${API_URL}/${id}`, { isCompleted });
  return response.data;
};
