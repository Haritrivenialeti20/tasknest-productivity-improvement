const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateProductivityScore, POINTS } = require('../utils/scoreHelper');

const getScore = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({ select: { completed: true, important: true } });
    const completedTasks = tasks.filter(task => task.completed);
    res.json({
      value: calculateProductivityScore(tasks),
      completedTasks: completedTasks.length,
      importantCompletedTasks: completedTasks.filter(task => task.important).length,
      pointsPerTask: POINTS.completedTask,
      pointsPerImportantTask: POINTS.completedImportantTask,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch score' });
  }
};

module.exports = { getScore };
