const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const parseResponse = async (response) => {
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.status === 204 ? null : response.json();
};

export const fetchTasks = async () => parseResponse(await fetch(`${API_URL}/tasks`));

export const createTask = async (title, important) =>
  parseResponse(await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, important }),
  }));

export const updateTask = async (id, updates) =>
  parseResponse(await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  }));

export const updateTaskStatus = (id, completed) => updateTask(id, { completed });
export const updateTaskImportance = (id, important) => updateTask(id, { important });

export const deleteTaskFromApi = async (id) =>
  parseResponse(await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' }));

export const fetchScore = async () => parseResponse(await fetch(`${API_URL}/score`));
