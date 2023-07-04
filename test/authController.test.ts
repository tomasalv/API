import { createMocks } from "node-mocks-http"
import { authUser } from "../src/services/login/login.services"
import { authController } from "../src/controllers/login/login"

jest.mock("../src/services/login/login.services", () => ({
  authUser: jest.fn()
}))

describe("authController", () => {
  it("should return 404 if user is not found", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "nonexistent@example.com",
        password: "password"
      }
    })

    ;(authUser as jest.Mock).mockResolvedValue(404)

    await authController(req, res)

    expect(res.statusCode).toBe(404)
    expect(res._getData()).toBe("User not found")
  })

  it("should return 403 if password is incorrect", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "user@example.com",
        password: "incorrectPassword"
      }
    })

    ;(authUser as jest.Mock).mockResolvedValue(403)

    await authController(req, res)

    expect(res.statusCode).toBe(403)
    expect(res._getData()).toBe("Password is incorrect")
  })

  it("should return 200 with the user data", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "user@example.com",
        password: "correctPassword"
      }
    })

    const mockUserData = {
      id: 1,
      email: "user@example.com",
      name: "John Doe"
    }

    ;(authUser as jest.Mock).mockResolvedValue(mockUserData)

    await authController(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._getData()).toEqual(mockUserData)
  })

  it("should return 500 if an error occurs", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "user@example.com",
        password: "password"
      }
    })

    ;(authUser as jest.Mock).mockRejectedValue(new Error("Some error"))

    await authController(req, res)

    expect(res.statusCode).toBe(500)
    expect(res._getData()).toBe("Error authenticating userError: Some error")
  })
})
