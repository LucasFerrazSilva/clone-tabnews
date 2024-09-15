import orchestrator from "tests/orchestrator.js";

beforeAll(async () => await orchestrator.waitForAllServices());

describe("GET to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody.updated_at).toBeDefined();
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies).toBeDefined();
      expect(responseBody.dependencies.database).toBeDefined();
      const database = responseBody.dependencies.database;
      expect(database.version).toEqual("16.0");
      expect(database.max_connections).toEqual(100);
      expect(database.used_connections).toEqual(1);
    });
  });
});
