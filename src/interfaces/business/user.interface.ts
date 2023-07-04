import { Auth } from "../login/login.interface"

export interface User extends Auth {
  name: string
}
