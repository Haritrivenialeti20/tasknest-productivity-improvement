import React, { useState } from 'react';
import { createTask } from '../services/api';
import { Plus, Star } from 'lucide-react';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [important, setImportant] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask({ title, important });
      setTitle('');
      setImportant(false);
      onTaskCreated();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div className="form-card animate-fade">
      <h4>Create New Task</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Focus on what matters..." className="styled-input" />
        </div>
        <label className="important-toggle">
          <input type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} />
          <Star size={16} fill={important ? 'currentColor' : 'none'} />
          Mark as important (worth 20 points)
        </label>
        <button type="submit" className="primary-button">
          <Plus size={20} strokeWidth={3} /><span>Quick Add</span>
        </button>
      </form>
      <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #f1f5f9' }}>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          Completed tasks earn 10 points. Completed important tasks earn 20.
        </p>
      </div>
    </div>
  );
};

export default TaskForm;
