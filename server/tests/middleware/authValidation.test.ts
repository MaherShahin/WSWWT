import request from "supertest";
import app from "../../src/app"

describe("registerValidation", () => {
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com" });

    expect(response.status).toBe(400);
  });
});


describe("loginValidation", () => {
  it("should return 400 if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com" });

    expect(response.status).toBe(400);
  });
});