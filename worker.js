const db = require("./server/knex");
const throng = require("throng");
const axios = require("axios");

const workers = process.env.WEB_CONCURRENCY || 1;

// wrap with an object for test purpose
const wrapper = {
  start: async function start() {
    const jobs = await db.where({ completed: false }).table("job");
    if (!jobs || jobs.length === 0) {
      setTimeout(start, 30000);
      return "no job";
    }
    const jobQueue = jobs[0];
    const state = await sendHttpCall(jobQueue);
    await updateDb(jobQueue, state);

    start();
    return;
  },
};

async function sendHttpCall(job) {
  try {
    const url = job.URL;
    const res = await axios.get(url);
    return res.status;
  } catch (err) {
    console.error(`Error sending http request to ${job.URL}`);
    const status = err.response ? err.response.status : 500;
    return status;
  }
}

async function updateDb(job, state) {
  if (!job || !job.URL || !state || typeof state !== "number") return -1;

  const hasJobFailed =
    state.toString()[0] === "4" || state.toString()[0] === "5";

  if (!hasJobFailed || job.attempt >= 2) {
    job.state = state;
    job.completed = true;
  }
  job.attempt++;

  await db("job").where({ id: job.id }).update(job);
  return;
}

wrapper.start();

// throng({ workers, start });

module.exports = { updateDb, sendHttpCall, wrapper };
