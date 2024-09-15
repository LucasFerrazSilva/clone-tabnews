import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const acceptedMethods = ["GET", "POST"];
  if (!acceptedMethods.includes(request.method)) {
    return response.status(405).end();
  }

  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const dryRun = request.method == "GET";
    const migrationOptions = {
      dbClient,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
      dryRun,
    };
    const responseBody = await migrationRunner(migrationOptions);
    const status = dryRun || !responseBody.length ? 200 : 201;
    return response.status(status).json(responseBody);
  } catch (err) {
    console.error(err);
    return response.status(500).end();
  } finally {
    if (dbClient) dbClient.end();
  }
}
