import request from "supertest";
import app from "../../src/app"; 
import { AuthService } from "../../src/services/authService";
import { ValidationError } from "../../src/errors/validationError";

jest.mock("../../src/services/authService");

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user successfully", async () => {
    (AuthService.registerUser as jest.Mock).mockResolvedValue("mocked_jwt_token");

    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com", username: "testuser", name: "Test User", password: "testpass" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBe("mocked_jwt_token"); 
  });

  it("should login a user successfully", async () => {
    (AuthService.loginUser as jest.Mock).mockResolvedValue("mocked_jwt_token_for_login");

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@test.com", password: "testpass" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBe("mocked_jwt_token_for_login");
  });

  it("should fail to register a user due to duplicate email", async () => {
    (AuthService.registerUser as jest.Mock).mockRejectedValue(new ValidationError("User already exists"));

    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@test.com", username: "testuser", name: "Test User", password: "testpass" });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty("msg", "User already exists");
  });

  it("should fail to login due to incorrect credentials", async () => {
    (AuthService.loginUser as jest.Mock).mockRejectedValue(new ValidationError("Invalid Credentials"));

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "wrong@test.com", password: "wrongpass" });

    expect(response.status).toBe(400);
    expect(response.body.errors[0]).toHaveProperty("msg", "Invalid Credentials");
  });



});
