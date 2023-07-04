import { Auth } from "../../interfaces/login/login.interface"
import { User } from "../../interfaces/business/user.interface"
import UserModel from "../../models/User"
import { encrypt, verifyPassword } from "../../utils/bcrypt.handle"
import { generateToken } from "../../utils/jwt.handle"

/**
 * The function `registerNewUser` is an asynchronous function that takes in a `userAuth` object and
 * registers a new user by validating the email, checking if the user already exists, encrypting the
 * password, and creating a new user in the UserModel.
 * @param {User} userAuth - The userAuth parameter is an object that represents the user's
 * authentication information. It typically contains properties such as email and password.
 * @returns The function `registerNewUser` returns either a status code or a newly created user object.
 * If the email passed in `userAuth` is valid and not already registered, the function returns the
 * newly created user object. If the email is invalid or already registered, the function returns a
 * status code of 400 or 200 respectively.
 */
const registerNewUser = async (userAuth: User) => {
  const email = userAuth.email
  const validateEmail = /.+@.+/
  if (validateEmail.test(email)) {
    const checkUserExists = await UserModel.findOne({ email: email })
    if (checkUserExists) return 200
    const password = await encrypt(userAuth.password)
    const registerNewUser = await UserModel.create({ email, password })
    return registerNewUser
  } else return 400
}

/**
 * The function `authUser` takes in an email and password, checks if the user exists in the database,
 * verifies the password, generates a token, and returns the token and user data if successful.
 * @param {Auth}  - - `email`: The email of the user trying to authenticate.
 * @returns different values based on certain conditions:
 */
const authUser = async ({ email, password }: Auth) => {
  const checkUserExists = await UserModel.findOne({ email: email })
  if (!checkUserExists) return 404
  const passwordEncrypted = checkUserExists.password
  const isCorrectPassword = await verifyPassword(password, passwordEncrypted)
  if (!isCorrectPassword) return 403
  const token = generateToken(checkUserExists.email)
  if (token) {
    const data = { jwt: token, user: checkUserExists }
    return data
  }
}

export { registerNewUser, authUser }
