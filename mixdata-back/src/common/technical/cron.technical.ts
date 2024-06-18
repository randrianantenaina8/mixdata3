const CronJob = require("cron-node")

export const initScheduledJobs = () => {
    const scheduleJob = CronJob.schedule("", () => {
        console.log("coucocucoucocuc")
    });

    scheduleJob.start();
}