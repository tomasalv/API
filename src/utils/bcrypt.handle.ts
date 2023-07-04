import { hash, compare } from "bcryptjs"

/**
 * The encrypt function takes a password as input, encrypts it using a hashing algorithm with a cost
 * factor of 10, and returns the encrypted password.
 * @param {string} password - The `password` parameter is a string that represents the password that
 * needs to be encrypted.
 * @returns The encrypted password is being returned.
 */
const encrypt = async (password: string) => {
  const passwordEncrypted = await hash(password, 10)
  return passwordEncrypted
}
/**
 * The function `verifyPassword` compares a given password with an encrypted password and returns
 * whether they are equal.
 * @param {string} password - The `password` parameter is a string that represents the user's inputted
 * password.
 * @param {string} passwordEncrypted - The `passwordEncrypted` parameter is a string that represents
 * the encrypted version of the password.
 * @returns The function `verifyPassword` returns a promise that resolves to a boolean value indicating
 * whether the provided `password` matches the `passwordEncrypted` after trimming any leading or
 * trailing whitespace.
 */
const verifyPassword = async (password: string, passwordEncrypted: string) => {
  const isEqual = await compare(password.trim(), passwordEncrypted)
  return isEqual
}
export { encrypt, verifyPassword }
