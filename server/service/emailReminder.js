import path from "path";
import { CronJob } from "cron";
import lodash from "lodash";
import moment from "moment";
import { sendMail2 } from "../components/mail.js";
import { readTemplate } from "../routes/cohort.js";
import config from "../config/index.js";
const { groupBy } = lodash;

export function startReminderService(app) {
  const job = new CronJob(
    "0 9 * * *", // cronTime
    async () => {
      const { mysql, logger } = app.locals;
      const cohortsPerUser = await getOutdatedCohorts(mysql);
      cohortsPerUser.forEach(async (data) => {
        try {
          await sendReminder(data);
          await updateReminderSent(mysql, data, true);
        } catch (error) {
          logger.error(error);
        }
      });
    }, // onTick
    null, // onComplete
    true, // start
    "America/New_York", // timeZone
  );
  return true;
}

/**
 * Query for list of outdated cohorts and their cohort owners
 * only includes cohorts that are not yet marked outdated and have not already sent a reminder
 * @param {mysqlConnection} mysql db connection for query
 * @returns {Object[][]} nested array of cohort objects per user email
 */
async function getOutdatedCohorts(mysql) {
  const query = await mysql.query(
    [
      "SELECT DISTINCT c.id, c.name, c.acronym, u.email, CONCAT(u.first_name, ' ', u.last_name) AS full_name, c.publish_time",
      "FROM cohort c",
      "JOIN cohort_user_mapping cum on c.acronym = cum.cohort_acronym",
      "JOIN user u ON cum.user_id = u.id",
      "WHERE c.status = 'published' AND c.publish_time < DATE_SUB(NOW(),INTERVAL 21 MONTH) AND c.outdated = false AND c.outdated_reminder = false",
    ].join(" "),
  );
  const groupByEmail = Object.values(groupBy(query, "email"));
  return groupByEmail;
}

/**
 * Update the outdated_reminder status for cohorts
 * @param {mysqlConnection} mysql db connection for query
 * @param {Object[]} data array of cohort data
 * @param {boolean} status
 * @returns
 */
async function updateReminderSent(mysql, data, status = false) {
  const cohortIds = data.map((c) => c.id);
  await mysql.query(["UPDATE cohort", "SET outdated_reminder = ?", "WHERE id in (?)"].join(" "), [status, cohortIds]);
}

/**
 *
 * @param {Object[]} data cohort data array
 */
async function sendReminder(data) {
  const { full_name, email } = data[0];
  const tableRows = data
    .map(
      (e) => `<tr><td>${e.name}</td><td>${e.acronym}</td><td>${moment(e.publish_time).format("MM/DD/YYYY")}</td></tr>`,
    )
    .join("");
  const templateData = {
    user: full_name,
    tableRows,
    website: process.env.BASE_URL,
  };
  const dirname = path.normalize(config.root + "/service");
  const templatePath = path.resolve(dirname, "templates/email-owner-outdated.html");
  try {
    console.log("sending cohort email reminder");
    await sendMail2({
      from: process.env.EMAIL_SENDER,
      to: email,
      cc: process.env.EMAIL_SENDER,
      subject: "Your CEDCD Cohort(s) are scheduled to be marked outdated",
      html: await readTemplate(templatePath, templateData),
    });
    console.log("sent cohort email reminder");
  } catch (e) {
    console.log(e);
  }
}
