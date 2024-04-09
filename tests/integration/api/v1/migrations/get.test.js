import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
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
