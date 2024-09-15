import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

describe("GET to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);

      const response2 = await fetch("http://localhost:3000/api/v1/migrations");
      const responseBody2 = await response2.json();

      expect(response2.status).toBe(200);
      expect(Array.isArray(responseBody2)).toBe(true);
      expect(responseBody2.length).toBeGreaterThan(0);
    });
  });
});
