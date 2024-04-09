import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  let status;
  let responseBody;
  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const migrationOptions = {
      dbClient,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method == "GET") {
      migrationOptions.dryRun = true;
      responseBody = await migrationRunner(migrationOptions);
      status = 200;
    } else if (request.method == "POST") {
      migrationOptions.dryRun = false;
      responseBody = await migrationRunner(migrationOptions);
      status = responseBody.length > 0 ? 201 : 200;
    } else {
      status = 405;
    }
  } catch (err) {
    console.error(err);
    status = 500;
  } finally {
    if (dbClient) dbClient.end();
  }

  return response.status(status).json(responseBody);
}
