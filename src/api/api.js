import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.127.253:3000',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
  });