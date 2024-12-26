import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchLeads = () => api.get("/leads");
export const createLead = (data) => api.post("/leads", data);

export const fetchContacts = () => api.get("/contacts");
export const createContact = (data) => api.post("/contacts", data);

// export const fetchPOCs = () => api.get("/points-of-contact");
// export const createPOC = (data) => api.post("/points-of-contact", data);

export const fetchInteractions = () => api.get("/interactions");
export const createInteraction = (data) => api.post("/interactions", data);

export const fetchCallPlans = () => api.get("/call-planning");
export const setCallFrequency = (id, data) =>
  api.put(`/call-planning/${id}/set-frequency`, data);

export const fetchPerformanceMetrics = () => api.get("/performance-metrics");

export default api;
