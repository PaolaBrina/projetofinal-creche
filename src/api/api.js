import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.56.1:3000',
    timeout: 3000,
    headers: {'Content-Type': 'application/json'}
  });

/* 

paola
  pc satc 192.168.56.1
  pc casa



  
 */