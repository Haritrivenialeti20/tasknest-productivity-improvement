const API_URL = 'http://localhost:5000';

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const createTask = async ({ title, important }) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, important }),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

export const updateTask = async (id, changes) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
};

export const updateTaskStatus = (id, completed) => updateTask(id, { completed });
export const updateTaskImportance = (id, important) => updateTask(id, { important });

export const deleteTaskFromApi = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete task');
};

export const fetchScore = async () => {
  const response = await fetch(`${API_URL}/score`);
  if (!response.ok) throw new Error('Failed to fetch score');
  return response.json();
};
