// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (credentials) => API.post("/users/login", credentials);
