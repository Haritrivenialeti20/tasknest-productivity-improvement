/**
 * Calculate a transparent score from completed tasks.
 *
 * A completed regular task is worth 10 points. A completed important task is
 * worth 20 points, making the client's "important tasks" requirement visible
 * in the score. Every three completed tasks adds a 5-point consistency bonus.
 */
const calculateProductivityScore = (tasks = []) => {
  const completedTasks = tasks.filter((task) => task.completed);
  const importantCompleted = completedTasks.filter((task) => task.important).length;
  const regularCompleted = completedTasks.length - importantCompleted;
  const basePoints = regularCompleted * 10 + importantCompleted * 20;
  const consistencyBonus = Math.floor(completedTasks.length / 3) * 5;

  return {
    value: basePoints + consistencyBonus,
    basePoints,
    consistencyBonus,
    completedTasks: completedTasks.length,
    importantCompleted,
  };
};

module.exports = {
  calculateProductivityScore,
  // Compatibility export for any existing imports.
  calculateMomentumBonus: (tasks = []) => calculateProductivityScore(tasks).consistencyBonus,
};
