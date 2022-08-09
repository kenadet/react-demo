import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeaders } from './baseService';

export const NOTE_API_URL = `${BASE_API_URL}/api/notes`;

export const getNotes = (page) => {
  const url = `${NOTE_API_URL}?page=${page}`
  return axios.get(url, { headers: authHeaders() });
};

export const createNote = (note) => {
  return axios.post(NOTE_API_URL, note, { headers: authHeaders() });
};

export const updateNote = (noteId, note) => {
  return axios.put(`${NOTE_API_URL}/${noteId}`, note, { headers: authHeaders() });
};

export const getNote = (noteId) => {
  return axios.get(`${NOTE_API_URL}/${noteId}`,{ headers: authHeaders() });
};

export const deleteNote = (noteId) => {
  return axios.delete(`${NOTE_API_URL}/${noteId}`,{ headers: authHeaders() });
};