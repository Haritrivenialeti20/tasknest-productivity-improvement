import React from 'react';
import { updateTaskStatus, updateTaskImportance, deleteTaskFromApi } from '../services/api';
import { Trash2, Check, Star } from 'lucide-react';

const TaskCard = ({ task, onTaskUpdated }) => {
  const handleToggle = async () => {
    try {
      await updateTaskStatus(task.id, !task.completed);
      onTaskUpdated();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleImportanceToggle = async () => {
    try {
      await updateTaskImportance(task.id, !task.important);
      onTaskUpdated();
    } catch (err) {
      console.error('Error updating task importance:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskFromApi(task.id);
      onTaskUpdated();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className={`task-card-v2 animate-fade ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <button type="button" className={`custom-checkbox ${task.completed ? 'checked' : ''}`} onClick={handleToggle} aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}>
          {task.completed && <Check size={16} strokeWidth={4} />}
        </button>
        <span className="task-text">{task.title}</span>
        <button type="button" className={`importance-button ${task.important ? 'important' : ''}`} onClick={handleImportanceToggle} title={task.important ? 'Remove important flag' : 'Mark as important'} aria-label={task.important ? 'Remove important flag' : 'Mark as important'}>
          <Star size={18} fill={task.important ? 'currentColor' : 'none'} />
        </button>
        <span className="points-label">{task.important ? '20 pts' : '10 pts'}</span>
      </div>
      <button type="button" onClick={handleDelete} className="action-btn" title="Delete task" aria-label="Delete task">
        <Trash2 size={18} />
      </button>
    </div>
  );
};
export default TaskCard;
