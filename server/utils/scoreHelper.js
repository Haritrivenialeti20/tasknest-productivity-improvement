/**
 * Productivity score is derived from the current task state.
 * This keeps the score explainable and prevents stale increments when tasks
 * are edited or deleted.
 */
const POINTS = {
  completedTask: 10,
  completedImportantTask: 20,
};

const calculateProductivityScore = (tasks = []) => tasks.reduce((total, task) => {
  if (!task.completed) return total;
  return total + (task.important ? POINTS.completedImportantTask : POINTS.completedTask);
}, 0);

module.exports = {
  POINTS,
  calculateProductivityScore,
};
