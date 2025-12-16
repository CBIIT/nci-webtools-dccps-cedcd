import { CronJob } from "cron";

export function startCohortStatusService(app) {
  const job = new CronJob(
    "45 8 * * *", // cronTime
    async () => {
      const { mysql, logger } = app.locals;
      try {
        logger.info("Updating Cohort Status");
        const query = await setOutdated(mysql);
        logger.info(query);
      } catch (error) {
        logger.error(error);
      }
    }, // onTick
    null, // onComplete
    true, // start
    "America/New_York", // timeZone
  );
  return true;
}

/**
 * Update the outdated status for cohorts
 * @param {mysqlConnection} mysql db connection for query
 * @returns
 */
async function setOutdated(mysql, data, status = false) {
  return await mysql.query(
    ["UPDATE cohort", "SET outdated = true", "WHERE publish_time < DATE_SUB(NOW(),INTERVAL 2 YEAR)"].join(" "),
  );
}
