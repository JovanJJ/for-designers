const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres.lyigvruoqblgwuwusumh:databaseceradivaljda123@aws-1-eu-central-1.pooler.supabase.com:6543/postgres",
});

async function main() {
  try {
    const res = await pool.query("SELECT id, email FROM users");
    console.log("Users in public.users:");
    console.table(res.rows);
  } catch (err) {
    console.log("Error querying public.users: ", err.message);
  } finally {
    await pool.end();
  }
}

main();
