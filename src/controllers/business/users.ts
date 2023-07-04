import { Request, Response } from "express"
import { getUsers } from "../../services/business/user.services"

/**
 * The getUsersController function retrieves users based on an optional email query parameter,
 * paginates the results, and sends a response with the users.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to control the
 * response, such as setting the status code, headers, and sending the response body. In this code
 * snippet, the `res` object
 */
const getUsersController = async (req: Request, res: Response) => {
  try {
    let email = ""
    if (req.query.email) {
      email = req.query.email.toString()
    }
    const responseUsers = await getUsers(email)
    let payload: { [index: number]: { users: any[] } } = {}
    let pageSize = Number(req.query.pageSize) ?? 5
    if (responseUsers.length > 0) {
      //Como voy a dividir por el tamaño de página, me aseguro que no sea 0...
      if (pageSize === 0) {
        pageSize++
      }
      const totalPages = Math.ceil(responseUsers.length / pageSize)
      for (let i = 0; i < totalPages; i++) {
        const usersInPage = responseUsers.slice(
          i * pageSize,
          (i + 1) * pageSize
        )
        payload[i] = { users: usersInPage }
      }
    }
    //1.Debe permitir visualizar todos los usuarios registrados
    const data = { message: "Users found", data: payload }
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

export { getUsersController }
