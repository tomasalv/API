import { NextFunction, Request, Response } from "express"
import { verifyJWT } from "../utils/jwt.handle"

/**
 * The function `checkJwt` is a middleware function in TypeScript that checks if a JSON Web Token (JWT)
 * is valid and allows the request to proceed if it is, otherwise it returns an error response.
 * @param {Request} req - The `req` parameter represents the incoming request object in Express. It
 * contains information about the HTTP request made by the client, such as the request headers, request
 * body, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties for manipulating the response, such as
 * setting the status code, sending data, and setting headers.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 */
const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const externalJWT = req.headers.authorization

    const jwt = externalJWT?.split(" ").pop()
    const isValidUser = verifyJWT(`${jwt}`)
    if (!isValidUser) {
      res.status(401).send("JWT is invalid")
    } else next()
  } catch (error) {
    res.status(500).send("Error: " + error)
  }
}
export { checkJwt }
