import axios from 'axios';

const BASE_URL = 'http://10.0.0.107:5000/mywallet';

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function login(body) {
  const promise = await axios.post(`${BASE_URL}/sign-in`, body);

  return promise;
}

async function signUp(body) {
  const promise = await axios.post(`${BASE_URL}/sign-up`, body);

  return promise;
}

async function getRegistries(token) {
  const config = createConfig(token);

  const promise = await axios.get(`${BASE_URL}/wallet`, config);

  return promise;
}

async function deleteRegistry(id, token) {
  const config = createConfig(token);

  const promise = await axios.delete(`${BASE_URL}/registry/${id}`, config);

  return promise;
}

async function postRegistry(body, token) {
  const config = createConfig(token);

  const promise = await axios.post(`${BASE_URL}/registry`, body, config);

  return promise;
}

function getHabits(token) {
  const config = createConfig(token);

  const promise = axios.get(`${BASE_URL}/habits`, config);

  return promise;
}



function getTodayHabits(token) {
  const config = createConfig(token);

  const promise = axios.get(`${BASE_URL}/habits/today`, config);

  return promise;
}

function checkHabit(id, token) {
  const config = createConfig(token);

  const promise = axios.post(`${BASE_URL}/habits/${id}/check`, null, config);

  return promise;
}

function uncheckHabit(id, token) {
  const config = createConfig(token);

  const promise = axios.post(`${BASE_URL}/habits/${id}/uncheck`, null, config);

  return promise;
}

const api = {
  login,
  signUp,
  getRegistries,
  deleteRegistry,
  postRegistry,
}

export default api;