test("PUT to /api/v1/status should return 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });
  const responseBody = await response.text();

  expect(response.status).toBe(405);
  expect(responseBody).toBe("");
});
