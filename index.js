const cron = require('node-cron');
const { logApp, logCron } = require('./logger');
require('dotenv').config();
const { mailer } = require("./mailer");
const TIMER = process.env.TIMER;

logApp(`/// App started. Running cron job each ${TIMER} minutes. ///`);

cron.schedule(`*/${TIMER} * * * *`, async () => {
  logCron(`///////////////////////`);
  logCron(`Running cron job at ${new Date().toString()}`);
  await mailer();
  logCron("-----------------------");
});