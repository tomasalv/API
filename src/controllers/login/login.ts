import { Request, Response } from "express"
import { registerNewUser, authUser } from "../../services/login/login.services"
import axios from "axios"

/**
 * The registerController function handles the registration of a new user, checking if the user already
 * exists and returning appropriate responses.
 * @param {Request} req - The `req` parameter is an object representing the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body. In this code snippet, the `res` object is used to send
 * different responses based
 */
const registerController = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const responseUser = await registerNewUser(body)
    if (responseUser == 200) res.status(200).send("User already exists")
    else {
      if (responseUser === 400) {
        res.status(400).send("Please insert a valid email address.")
      } else {
        const data = {
          message: "User created successfully",
          user: responseUser
        }
        res.status(201).send(data)
      }
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

/**
 * The authController function is responsible for authenticating a user by checking their email and
 * password, and returning an appropriate response based on the outcome.
 * @param {Request}  - - `body`: The request body, which contains the email and password of the user
 * trying to authenticate.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class, which provides methods for setting
 * the response status code and sending the response body.
 */
const authController = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body
    const responseUser = await authUser({ email, password })
    if (responseUser === 404) res.status(404).send("User not found")
    if (responseUser === 403) res.status(403).send("Password is incorrect")
    else res.status(200).send(responseUser)
  } catch (error) {
    res.status(500).send("Error authenticating user" + error)
  }
}

/**
 * The usersController function is an asynchronous function that retrieves user data from a specified
 * API endpoint and sends the response back to the client.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It has methods like `status()` to set the status code of the response,
 * `send()` to send the response body, and `json()` to send a JSON response. In this code
 */
const usersController = async (req: Request, res: Response) => {
  try {
    const responseUser = await axios.get(
      `http://localhost:${process.env.PORT}/business/users?email=${
        req.query.email ?? ""
      }&limit=${req.query.limit ?? ""}&pageSize=${req.query.pageSize ?? ""}`,
      {
        headers: {
          Authorization: req.headers.authorization,
          Origin: "server"
        }
      }
    )
    if (responseUser) {
      res.status(200).send(responseUser.data)
    } else res.status(404).send("None user found")
  } catch (error) {
    res.status(500).send(error)
  }
}

export { registerController, authController, usersController }
