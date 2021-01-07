/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticationError } from "apollo-server-express"

import { IMoment, Moment } from "../models/Moment"
import { checkAuthorization } from "../utils/helpers"

export const momentDefs = `
  type Tag {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Moment {
    id: ID!
    title: String!
    body: String!
    username: String!
    momentDate: String!
    createdAt: String!
    location: String!
    tags: [Tag]!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    tagCount: Int!
  }

  input MomentInput {
    title: String!
    body: String!
    momentDate: String!
    location: String!
    tags: [String]!
  }
  
  extend type Query {
    getMoments: [Moment]
    getMoment(momentId: ID!): Moment
  }

  extend type Mutation {
    createMoment(createMomentInput: MomentInput!): Moment!
    deleteMoment(momentId: ID!): String!
    updateMoment(momentId: ID!, updateMomentInput: MomentInput!): Moment!
    createComment(momentId: ID!, body:String!): Moment!
    deleteComment(momentId: ID!, commentId: ID!): Moment!
    switchLikeMoment(momentId: ID!): Moment!
  }
`

export const momentResolvers = {
  Query: {
    getMoments: async (): Promise<IMoment[]> => {
      try {
        const moments = await Moment.find().sort({ createdAt: -1 })
        console.log(moments)
        return moments
      } catch (error) {
        throw new Error(error)
      }
    },
    getMoment: async (_root: unknown, args: { momentId: string }) => {
      const { momentId } = args
      try {
        const moment = await Moment.findById(momentId)
        if (moment) {
          return moment
        } else {
          throw new Error("Moment not found")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  Mutation: {
    createMoment: async (_root, args, context) => {
      const { title, body, momentDate, location, tags } = args.createMomentInput
      const token = checkAuthorization(context)

      const updatedTags = tags.map((t) => {
        return {
          body: t,
          username: token.username,
          createdAt: new Date().toISOString(),
        }
      })

      const moment = new Moment({
        title,
        body,
        momentDate: new Date(momentDate).toString(),
        createdAt: new Date().toISOString(),
        location,
        tags: updatedTags,
        username: token.username,
        user: token.id,
      })

      const returnedMoment = await moment.save()

      return returnedMoment
    }, //(createMomentInput: MomentInput!): Moment!
    deleteMoment: async (_root, args, context) => {
      const { momentId } = args

      const token = checkAuthorization(context)

      try {
        const moment = await Moment.findById(momentId)
        if (moment.username === token.username) {
          await moment.delete()
          return "Moment deleted :("
        } else {
          throw new AuthenticationError("Action not allowed")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
