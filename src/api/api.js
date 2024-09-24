import axios from "axios";

export const api = axios.create({
    baseURL: 'http://10.119.0.35:3000',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
  });