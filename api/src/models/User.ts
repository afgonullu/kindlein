import { Schema, model, Document } from "mongoose"

export interface IUser extends Document {
  username: string
  passwordHash: string
  email: string
  createdAt: string
}

// validation will be handled in graphql layer
const userSchema = new Schema({
  username: String,
  passwordHash: String,
  email: String,
  createdAt: String,
})

export const User = model<IUser>("User", userSchema)
