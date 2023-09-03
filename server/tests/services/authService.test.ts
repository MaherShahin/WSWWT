import { AuthService } from "../../src/services/authService";
import User from "../../src/models/User";
import { comparePasswords } from "../../src/utils/encryptionUtils";
import jwt from "jsonwebtoken";
import config from "config";

jest.mock("../../src/models/User");
jest.mock("../../src/utils/encryptionUtils");
jest.mock("jsonwebtoken");
jest.mock("config");

const mockUserFindOne = (returnValue: any) => {
  (User.findOne as jest.Mock).mockReturnValue({
    select: jest.fn().mockResolvedValue(returnValue),
  });
};

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if email is not found during login", async () => {
    mockUserFindOne(null);
    await expect(AuthService.loginUser("notfound@test.com", "password"))
      .rejects.toThrow("Invalid credentials");
  });

  it("should throw an error if password does not match during login", async () => {
    mockUserFindOne({ id: "userId", password: "hashedPassword" });
    (comparePasswords as jest.Mock).mockResolvedValue(false);
    await expect(AuthService.loginUser("test@test.com", "wrongPassword"))
      .rejects.toThrow("Invalid credentials");
  });

  it("should throw an error if user already exists during registration", async () => {
    mockUserFindOne({ email: "existing@test.com" });
    await expect(AuthService.registerUser("existing@test.com", "username", "Test User", "password"))
      .rejects.toThrow("User already exists");
  });

  it("should return a JWT token after successful registration", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);  // Explicitly set mock to return null for this test
    (User.create as jest.Mock).mockResolvedValue({ id: "newUserId" });
    (jwt.sign as jest.Mock).mockReturnValue("validRegistrationToken");

    const token = await AuthService.registerUser("new@test.com", "newUsername", "New User", "newPassword");
    expect(typeof token).toBe("string");
    expect(token).toEqual("validRegistrationToken");

  });
});
