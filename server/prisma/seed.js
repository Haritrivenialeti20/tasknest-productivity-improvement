const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany({});
  await prisma.score.deleteMany({});

  await prisma.task.createMany({
    data: [
      { title: 'Finish assignment', completed: false, important: true },
      { title: 'Review lecture notes', completed: true, important: false },
      { title: 'Complete coding challenge', completed: false, important: true },
    ],
  });

  // Score is now derived from tasks; keep the legacy row at zero for compatibility.
  await prisma.score.create({ data: { value: 0 } });
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
