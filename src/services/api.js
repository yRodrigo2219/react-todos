import axios from "axios";
import { encrypt } from "./rsa";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function apiLogin(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password: await encryptPassword(password),
  });

  return response.data;
}

export async function createUser(name, username, email, password) {
  const response = await api.post("/api/v1/users", {
    email,
    name,
    username,
    password: await encryptPassword(password),
  });

  return response.data;
}

export async function getUserInfo(username) {
  const response = await api.get(`/api/v1/users/${username}`);
  console.log(response.data);

  return response.data;
}

export async function getUserToDos(username) {
  const response = await api.get(`/api/v1/users/${username}/todos`);

  return response.data;
}

export async function createToDo(username, task) {
  const response = await api.post(`/api/v1/users/${username}/todos`, {
    ...task,
  });

  return response.data;
}

export async function updateToDo(username, id, change) {
  const response = await api.put(`/api/v1/users/${username}/todos/${id}`, {
    ...change,
  });

  return response.data;
}

export async function deleteToDo(username, id) {
  const response = await api.delete(`/api/v1/users/${username}/todos/${id}`);

  return response.data;
}

export async function encryptPassword(password) {
  const response = await api.get("/auth/rsa-key");
  const key = response.data.pk;

  return encrypt(key, password);
}

export default api;
