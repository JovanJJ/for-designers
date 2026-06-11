const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres.lyigvruoqblgwuwusumh:databaseceradivaljda123@aws-1-eu-central-1.pooler.supabase.com:6543/postgres'
});

async function run() {
  try {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'for_designers'");
    console.log("Tables in for_designers:");
    console.table(res.rows);

    for (const row of res.rows) {
      const columns = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'for_designers' AND table_name = '${row.table_name}'`);
      console.log(`Columns in ${row.table_name}:`);
      console.table(columns.rows);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
