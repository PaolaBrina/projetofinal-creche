import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.180.10:3000',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
  });