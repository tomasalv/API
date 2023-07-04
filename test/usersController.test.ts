import axios from "axios"
import { createMocks } from "node-mocks-http"
import { usersController } from "../src/controllers/login/login"

jest.mock("axios")

describe("usersController", () => {
  it("should return 200 with user data", async () => {
    const mockRequest = createMocks({
      method: "GET",
      query: {
        email: "test@example.com",
        pageSize: "10"
      },
      headers: {
        authorization: "Bearer TOKEN"
      }
    }).req

    const mockResponse = createMocks().res

    const mockUserData = {
      id: 1,
      name: "John Doe",
      email: "test@example.com"
    }

    const mockAxiosGet = jest.fn().mockResolvedValue({ data: mockUserData })
    axios.get = mockAxiosGet

    await usersController(mockRequest, mockResponse)

    expect(mockResponse.statusCode).toBe(200)
    expect(mockResponse._getData()).toEqual(mockUserData)
  })

  it("should return 404 if no user found", async () => {
    const mockRequest = createMocks().req
    const mockResponse = createMocks().res

    const mockAxiosGet = jest.fn().mockResolvedValue(null)
    axios.get = mockAxiosGet

    await usersController(mockRequest, mockResponse)

    expect(mockResponse.statusCode).toBe(404)
    expect(mockResponse._getData()).toBe("None user found")
  })
})
