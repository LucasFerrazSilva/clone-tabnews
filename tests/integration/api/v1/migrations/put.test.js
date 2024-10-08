import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("PUT to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Getting an error response", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });
      const responseBody = await response.text();

      expect(response.status).toBe(405);
      expect(responseBody).toBe("");
    });
  });
});
