# TaskNest Productivity Improvement

## Investigation

The original implementation mixed a stored `Score` value with a dynamic momentum helper. Creating a task added five points, completing a task added ten more points, and the score endpoint then added another dynamic bonus based on the number of completed tasks. This meant that creating unfinished work increased productivity, completing the same task repeatedly could increase the score again, deleting a task did not remove its points, and the final value could not be explained from the visible task list.

The client requirement also mentioned important tasks, but the database, API, form, and task cards had no field or user control for marking importance.

## Improvements implemented

The score is now derived from the current task records instead of mutable score increments. A completed regular task is worth **10 points**. A completed important task is worth **20 points**. To encourage consistency without hiding the calculation, every three completed tasks awards a **5-point consistency bonus**. The score endpoint returns the total plus a breakdown for the dashboard.

Tasks now include an `important` Boolean field. Users can mark a task as important when creating it or toggle the star on an existing task. The API accepts validated `important` and `completed` updates, trims task titles, rejects invalid titles, and returns clear errors for invalid task IDs. Creating or deleting tasks no longer changes a stored score because the score is always recalculated from task state.

The dashboard displays each task's point value and explains the scoring rules beside the productivity score. The frontend API client now handles failed HTTP responses and supports a configurable `VITE_API_URL` for deployment.

## Verification

From `server/`, install dependencies, configure `DATABASE_URL`, run `npx prisma db push`, seed with `npm run prisma:seed`, and start the API with `npm start`. From `client/`, run `npm install`, `npm run lint`, and `npm run build`.

## Deployment links

- Frontend Deployment Link: To be added after deployment credentials are available.
- Backend Deployment Link: To be added after deployment credentials are available.

## Submission

- Pull Request Link: To be added after the public repository is created.
- Google Drive Video Link: To be added after the explanation video is uploaded.
