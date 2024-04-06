import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("show server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const maxConectionsResult = await database.query("show max_connections;");
  const maxConectionsValue = parseInt(
    maxConectionsResult.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsQuery = `SELECT count(*)::int FROM pg_stat_activity where datname = $1;`;
  const openedConnectionsParams = [databaseName];
  const openedConnectionsResult = await database.query({
    text: openedConnectionsQuery,
    values: openedConnectionsParams,
  });
  const openedConnectionsValue = openedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: maxConectionsValue,
        used_connections: openedConnectionsValue,
      },
    },
  });
}

export default status;
