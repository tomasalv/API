import UserModel from "../../models/User"

/**
 * The getUsers function retrieves users from the UserModel based on an optional email filter and a
 * limit on the number of results.
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user you want to search for. It is used to filter the users based on their email address.
 * @param {number} limit - The `limit` parameter is used to specify the maximum number of users to be
 * returned in the result. If a value is provided for `limit`, the query will be limited to that number
 * of users. If `limit` is not provided or is set to 0, all users that match the
 * @returns a promise that resolves to an array of user objects.
 */
const getUsers = async (email: string, limit: number) => {
  let filter = {}
  if (email) {
    //3. Debe permitir buscar de manera no sensitiva por el mail
    const emailFilter = new RegExp(`^${email}$`, "i")
    filter = { email: emailFilter }
  }
  let query = UserModel.find(filter, { email: 1 })

  if (limit) {
    query = query.limit(limit)
  }

  const users = await query.exec()
  return users
}

export { getUsers }
