export default class UserManager {
  mysql = null;

  constructor(mysql) {
    this.mysql = mysql;
  }
  async getUserForLogin(email, accountType) {
    const [userRow] = await this.mysql.query(
      `SELECT 
          id, user_name,
          access_level as accessLevel, 
          active_status as activeStatus
      FROM user where email = ? and access_level = ? `,
      [email, accountType]
    );

    if (userRow) {
      const userId = userRow.id;
      const userName = userRow.user_name;
      const userActiveStatus = userRow.activeStatus;
      const isAdmin = accountType === 'SystemAdmin';
      const userType = isAdmin ? 'internal' : 'external';
      if (!accountType) {
        accountType = userRow.activeStatus === 'Y'
          ? userRow.accessLevel
          : null
      }

      // update last login date
      await this.mysql.query(
        `update user set last_login = now() 
          where email = ? and access_level = ? `,
        [email, accountType]
      );

      const cohortAcronyms = await this.mysql.query(
        `SELECT DISTINCT cohort_acronym as acronym
          FROM cohort_user_mapping 
          WHERE user_id = ? AND active = 'Y'
          ORDER BY acronym ASC`,
        [userId]
      );

      let cohorts = [];

      for (const { acronym } of cohortAcronyms) {
        const [editableCohorts] = await this.mysql.query(
          `call select_editable_cohort_by_acronym(?)`,
          [acronym]
        );
        cohorts.push(...editableCohorts);
      }

      const user = {
        id: userId,
        type: userType,
        name: userName,
        role: accountType,
        cohorts: cohorts,
        active: userActiveStatus === 'Y',
      };

      return user;

    }
    else {
      return null;
    }
  }
}
