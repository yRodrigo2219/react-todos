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
  const response = await api.post(`/api/v1/users/${username}`);

  return response.data;
}

export async function getUserToDos(username) {
  const response = await api.post(`/api/v1/users/${username}/todos`);

  return response.data;
}

export async function encryptPassword(password) {
  const response = await api.get("/auth/rsa-key");
  const key = response.data.pk;

  return encrypt(key, password);
}

export default api;
