// src/utils/api.js
import axios from "axios";
import { API_URL } from "../config";

const API = axios.create({
  baseURL: `${API_URL}/api`,
});

export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (credentials) => API.post("/users/login", credentials);
