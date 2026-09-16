# TaskNest Productivity Improvement

## Investigation

The original implementation mixed three different scoring mechanisms. Creating a task immediately added 5 points to the stored `Score` row, completing a task added another 10 points, and reading `/score` added a separate momentum bonus based on the number of completed tasks. The bonus changed its multiplier after two completed tasks. This meant the same task could affect the score multiple times, score reads could change the displayed result, and deleting or uncompleting a task did not reverse the points. The requirement's mention of important tasks was also not represented in the Prisma model, API, or interface.

## Product interpretation

A productivity score should be explainable from the user's current task state. I interpreted “consider important tasks” as allowing users to mark a task important and giving completed important tasks greater weight. The chosen rule is intentionally simple: a completed normal task is worth **10 points**, while a completed important task is worth **20 points**. Incomplete tasks contribute zero points. Creating, deleting, or merely viewing a task does not change the score.

## Changes implemented

- Added `Task.important` with a default of `false` to the Prisma schema.
- Updated task creation to accept and validate `title` and `important`.
- Updated task editing to support both `completed` and `important` fields.
- Added an important-task checkbox to the creation form.
- Added a star toggle to every task card so importance can be changed later.
- Replaced stored-score increments and the inconsistent momentum bonus with a deterministic score derived from current tasks.
- Added score metadata to the API response so the UI can explain the completed-task count and scoring rules.
- Updated the score widget copy to communicate the rules clearly.
- Updated seed data and documented the legacy `Score` row retained for schema compatibility.

## Expected behavior

If a user completes one normal task and one important task, the productivity score is 30 points. Marking either task incomplete removes its contribution; deleting a completed task also removes its contribution because the score is recalculated from the remaining tasks. Repeatedly refreshing the dashboard does not change the score.

## Validation

Run the following from this challenge directory:

```bash
cd server
npm install
npx prisma generate
npm run prisma:seed
npm start
```

In another terminal:

```bash
cd client
npm install
npm run build
```

The client build validates the React integration. With a configured PostgreSQL `DATABASE_URL`, the server commands validate the Prisma schema and runtime behavior.

## Deployment links

- Frontend Deployment Link: Not deployed in this environment.
- Backend Deployment Link: Not deployed in this environment.
