export async function getTablesWithColumn(mysql, column, schema) {
  const tables = await mysql.query(
    `select distinct c.table_name as name
        from information_schema.COLUMNS c
            left join information_schema.tables t on (
                t.TABLE_NAME = c.TABLE_NAME and
                t.TABLE_SCHEMA = c.TABLE_SCHEMA
            )
        where 
            c.COLUMN_NAME = ? and 
            t.TABLE_TYPE != 'VIEW' and 
            t.TABLE_SCHEMA = ?`,
    [column, schema],
  );
  return tables.map((t) => t.name);
}

export async function getCohort(mysql, id) {
  const [cohort] = await mysql.query(`SELECT * FROM cohort WHERE id = ?`, id);

  if (!cohort) throw new Error(`Invalid cohort: ${id}`);

  // look for tables with references to cohort(cohort_id)
  const restrictedTables = ["cohort_user_mapping"];
  const tables = (await getTablesWithColumn(mysql, "cohort_id", "cedcd")).filter((t) => !restrictedTables.includes(t));

  for (let table of tables) {
    cohort[table] = await mysql.query(`SELECT * FROM ?? WHERE cohort_id = ?`, [table, id]);
  }

  return cohort;
}

export async function saveCohort(mysql, body, id, user) {
  const restrictedTables = ["cohort_user_mapping"];
  const userIdTables = ["cohort_activity_log"];

  // look for tables with references to cohort(cohort_id)
  const tables = (await getTablesWithColumn(mysql, "cohort_id", "cedcd")).filter((t) => !restrictedTables.includes(t));

  const results = await mysql.upsert({
    table: "cohort",
    record: {
      ...body,
      id: id || undefined,
      create_time: undefined,
      update_time: new Date(),
      publish_by: user ? user.id : undefined,
    },
  });

  // if inserting a new cohort, preserve the insertId
  if (id === undefined && results.insertId) id = results.insertId;

  // if a related table is provided, replace all records for the specified cohort
  for (const table of tables) {
    let records = body[table] || [];
    if (!Array.isArray(records)) records = [records];

    // upsert records, if provided
    for (const record of records) {
      let params = {
        ...record,
        id: undefined,
        cohort_id: id,
        create_time: undefined,
        update_time: new Date(),
      };

      if (userIdTables.includes(table)) {
        params.user_id = user ? user.id : undefined;
      }

      await mysql.upsert({
        table,
        record: params,
      });
    }
  }
  return { id };
}
