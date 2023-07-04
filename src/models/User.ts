import { Schema, model } from "mongoose"
import { User } from "../interfaces/business/user.interface"

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String
      // required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
const UserModel = model("users", UserSchema)
export default UserModel
