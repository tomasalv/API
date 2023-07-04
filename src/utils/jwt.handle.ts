import { sign, verify } from "jsonwebtoken"
const JWT_SECRET = <string>process.env.JWT_SECRET

/**
 * The function generates a JSON Web Token (JWT) with a payload containing the provided email and signs
 * it using a secret key, with an expiration time of 1 hour.
 * @param {string} email - The `email` parameter is a string that represents the email address of the
 * user for whom the token is being generated.
 * @returns The function `generateToken` returns a JSON Web Token (JWT) string.
 */
const generateToken = (email: string) => {
  const payload = { email }
  const jwt = sign(payload, JWT_SECRET, { expiresIn: "1h" })
  return jwt
}
/**
 * The function `verifyJWT` takes a JSON Web Token (JWT) as input and verifies its validity using a
 * secret key.
 * @param {string} jwt - The `jwt` parameter is a string that represents a JSON Web Token (JWT).
 * @returns the value of the `isValid` variable, which is the result of verifying the JWT using the
 * `verify` function.
 */
const verifyJWT = (jwt: string) => {
  try {
    const isValid = verify(jwt, JWT_SECRET)
    return isValid
  } catch (error) {
    console.error("Error verifying JWT")
  }
}

export { generateToken, verifyJWT }
