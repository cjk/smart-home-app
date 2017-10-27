// @flow
import type { CronJob, Task } from '../../types';

import shortid from 'shortid';
import { format, addSeconds } from 'date-fns';
import { assoc, lens, pipe, prop, replace, set, view } from 'ramda';

const jobTemplate: CronJob = {
  jobId: 'cronjobs/',
  name: 'temporary scene cron-job ',
  at: '13:15:00',
  repeat: 'oneShot',
  scheduled: false,
  running: false,
  lastRun: null,
  tasks: null,
};

function buildCronjobWithTasks(name: string, tasks: Array<Task>) {
  const jobIdLens = lens(prop('jobId'), assoc('jobId'));
  const orgJobId = view(jobIdLens)(jobTemplate);
  // Remove slash in scene-name and append unique id
  const newJobId = set(
    jobIdLens,
    `${orgJobId}${replace(/\//, '', name)}-${shortid.generate()}`
  );

  return pipe(newJobId, assoc('tasks', tasks))(jobTemplate);
}

function scheduleJobForNow(job: CronJob) {
  const ts = new Date();
  return assoc('at', format(addSeconds(ts, 2), 'HH:mm:s'), job);
}

export { buildCronjobWithTasks, scheduleJobForNow };
