import { Schema, model, Document } from "mongoose"

export interface IMoment extends Document {
  title: string
  body: string
  username: string
  childName: string
  momentDate: string
  createdAt: string
  location: string
  tags: [
    {
      body: string
      username: string
      createdAt: string
    }
  ]
  comments: [
    {
      body: string
      username: string
      createdAt: string
    }
  ]
  likes: [
    {
      username: string
      createdAt: string
    }
  ]
  user: string
  child: string
}

// validation will be handled in graphql layer
const momentSchema = new Schema({
  title: String,
  body: String,
  username: String,
  childName: String,
  momentDate: String,
  createdAt: String,
  location: String,
  tags: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  child: {
    type: Schema.Types.ObjectId,
    ref: "Child",
  },
})

export const Moment = model<IMoment>("Moment", momentSchema)
