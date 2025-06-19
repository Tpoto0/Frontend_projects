import axios from 'axios';

const API_URL = 'http://localhost:4000/api/todos';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  const todos = response.data;
  return todos[todos.length - 1];
};

export const updateTodo = async (_id, updatedTodo) => {
  const response = await axios.put(`${API_URL}/${_id}`, updatedTodo);
  const todos = response.data;
  return todos.find(t => t._id === _id);
};

export const deleteTodo = async (_id) => {
  const response = await axios.delete(`${API_URL}/${_id}`);
  return response.data;
};