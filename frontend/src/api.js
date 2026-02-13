import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const getSchema = (dataset) =>
  axios.get(`${API}/schema/${dataset}`);

export const getData = (dataset, slow) =>
  axios.get(`${API}/${slow ? "slow/" : ""}${dataset}`);

export const createRecord = (dataset, data) =>
  axios.post(`${API}/${dataset}`, data);

export const updateRecord = (dataset, id, data) =>
  axios.put(`${API}/${dataset}/${id}`, data);

export const deleteRecord = (dataset, id) =>
  axios.delete(`${API}/${dataset}/${id}`);
