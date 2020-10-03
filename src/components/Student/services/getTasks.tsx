import { ICrosscheckSession } from 'src/storage/data/dataTypes';
import { Criteria } from 'src/types/Criteria';
import { dbGetReq } from '../../../service/restapi-fb';
import { get } from '../../../service/crossCheckSession';
import { Attendees } from '../Review/types';
import { Submission, Task } from '../Submit/types';

export interface AggregatedTask extends ICrosscheckSession {
  name: string;
  taskId: string;
  availableToSubmit: boolean;
  basic: Criteria[];
  extra: Criteria[];
  fines: Criteria[];
}

function aggregateTasksAndSessions(
  tasks: [string, Task][],
  sessions: ICrosscheckSession[]
): AggregatedTask[] {
  const tasksData = tasks.map(([key, obj]) => {
    return {
      name: obj.name,
      taskId: key,
      basic: obj.basic,
      extra: obj.extra,
      fines: obj.fines,
    };
  });
  const sessionsData = sessions.map(session => {
    const now = new Date();
    return {
      ...session,
      availableToSubmit: new Date(session.startDate) < now && session.state === 'CROSS_CHECK',
    };
  });

  return tasksData.map(task => {
    const taskSessions = sessionsData.filter(s => s.taskId === task.taskId);
    const session = taskSessions[taskSessions.length - 1];
    return {
      ...task,
      ...session,
    };
  });
}

export function getTasks() {
  return Promise.all([dbGetReq('tasks'), get()]).then(([tasksRes, sessionsRes]) => {
    return aggregateTasksAndSessions(Object.entries<Task>(tasksRes.data), sessionsRes);
  });
}

export function getSubmittedTasks(myGitHub, taskId) {
  return Promise.all([dbGetReq('studentsTasks'), dbGetReq('attendees')]).then(
    ([taskRes, attendees]) => {
      const studentsForReview = Object.values<Attendees>(attendees.data).filter(
        t => t.githubId === myGitHub && t.taskId === taskId
      );
      const reviewStudents = studentsForReview[studentsForReview.length - 1]?.reviewerOf || [];
      const exampleReviewStudents = ['John', 'Felix', 'Nikolas', 'Mary'];
      const finalReviewStudents = !reviewStudents.length ? exampleReviewStudents : reviewStudents;
      const studentsTasks = Object.values<Submission>(taskRes.data)
        .filter(t => t.taskId === taskId)
        .filter(item => finalReviewStudents.includes(item.githubId));
      const exampleTasks = [
        {
          githubId: 'John',
          taskId,
          repoLink: 'https://github.com/hello',
          demoLink: 'https://netlify.netlify.app',
          submittedAt: '2020-09-27T07:20:13.194Z',
          selfCheckScore: '220',
        },
        {
          githubId: 'Felix',
          taskId,
          repoLink: 'https://github.com/hello',
          demoLink: 'https://netlify.netlify.app',
          submittedAt: '2020-09-27T07:20:13.194Z',
          selfCheckScore: '200',
        },
        {
          githubId: 'Nikolas',
          taskId,
          repoLink: 'https://github.com/hello',
          demoLink: 'https://netlify.netlify.app',
          submittedAt: '2020-09-27T07:20:13.194Z',
          selfCheckScore: '210',
        },
        {
          githubId: 'Mary',
          taskId,
          repoLink: 'https://github.com/hello',
          demoLink: 'https://netlify.netlify.app',
          submittedAt: '2020-09-27T07:20:13.194Z',
          selfCheckScore: '190',
        },
      ];
      if (!studentsTasks.length) {
        return exampleTasks;
      }
      return studentsTasks;
    }
  );
}
