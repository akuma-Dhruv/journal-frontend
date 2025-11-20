import axios from "axios";

const API = "http://localhost:8080/journal";

export const getJournal = (date) => axios.get(`${API}/${date}`);
export const saveJournal = (date, data) => axios.post(`${API}/${date}`, data);
