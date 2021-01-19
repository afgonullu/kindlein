import { Schema, model, Document } from "mongoose"

export interface IChild extends Document {
  name: string
  birthDate: string
  createdAt: string
  username: string
  parent: string
  user: string
}

// validation will be handled in graphql layer
const childSchema = new Schema({
  name: String,
  birthDate: String,
  createdAt: String,
  username: String,
  parent: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

export const Child = model<IChild>("Child", childSchema)
