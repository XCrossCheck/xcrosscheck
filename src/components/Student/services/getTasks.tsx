import { dbGetReq } from '../../../service/restapi-fb';

export function getTasks() {
  return Promise.all([dbGetReq('tasks'), dbGetReq('crossCheckSession')]).then(
    ([tasksRes, sessionsRes]) => {
      const tasksData = Object.values(tasksRes.data).map(({ name, id, startDate }) => {
        const now = new Date();
        return {
          name,
          taskId: id,
          availableToSubmit: new Date(startDate) > now,
        };
      });
      const sessionsData = Object.values(sessionsRes.data).map(
        ({ taskId, deadlineSubmit, deadlineReview }) => ({
          taskId,
          deadlineSubmit,
          deadlineReview,
        })
      );
      const aggregatedTasks = tasksData.map(task => {
        const session = sessionsData.find(s => s.taskId === task.taskId);
        return {
          ...task,
          ...session,
        };
      });
      return aggregatedTasks;
    }
  );
}
