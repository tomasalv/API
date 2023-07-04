import UserModel from "../../models/User"

/**
 * The getUsers function retrieves users from the UserModel based on an optional email filter.
 * @param {string} email - The `email` parameter is a string that represents the email address of a
 * user.
 * @returns an array of user objects that match the given email filter. Each user object in the array
 * will only contain the email property.
 */
const getUsers = async (email: string) => {
  let filter = {}
  if (email) {
    //3. Debe permitir buscar de manera no sensitiva por el mail
    const emailFilter = new RegExp(`^${email}$`, "i")
    filter = { email: emailFilter }
  }
  const users = await UserModel.find(filter, { email: 1 })
  return users
}

export { getUsers }
