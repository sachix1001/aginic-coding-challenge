const db = require("./server/knex");
const throng = require("throng");
const axios = require("axios");

const workers = process.env.WEB_CONCURRENCY || 1;

async function start() {
  const jobs = await db.where({ completed: false }).table("job");
  if (!jobs || jobs.length === 0) {
    return setTimeout(start, 30000);
  }
  const jobQueue = jobs[0];
  const state = await sendHttpCall(jobQueue);
  await updateDb(jobQueue, state);

  return start();
}

async function sendHttpCall(job) {
  try {
    const url = job.URL;
    const res = await axios.get(url);
    return res.status;
  } catch (err) {
    console.error(`Error sending http request to ${job.URL}`);
    console.log("sendHttpCall -> job.attempt", job.attempt)
    const status = err.response.status || 500;
    return status;
  }
}

async function updateDb(job, state) {
  if (!job || !state) return;

  const hasJobFailed =
    state.toString()[0] === "4" || state.toString()[0] === "5";

  if (hasJobFailed && job.attempt < 3) {
    job.attempt++;
  } else {
    job.state = state;
    job.completed = true;
  }
  await db("job").where({ id: job.id }).update(job);
  return;
}

throng({ workers, start });
