import { NextFunction, Request, Response } from "express"

/**
 * The function `validateOrigin` checks if the request's origin header is equal to "server" and allows
 * the request to proceed if true, otherwise it sends a 403 Forbidden response.
 * @param {Request} req - The `req` parameter represents the incoming request object, which contains
 * information about the HTTP request made by the client.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to set the response status code and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called at the end of the
 * current middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 */
const validateOrigin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const origin = req.headers.origin
    if (origin === "server") {
      next()
    } else {
      res.status(403).send("Not allowed.")
    }
  } catch (error) {
    res.status(500).send("Error: " + error)
  }
}
export { validateOrigin }
