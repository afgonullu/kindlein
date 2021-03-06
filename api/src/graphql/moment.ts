/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticationError, UserInputError } from "apollo-server-express"

import { validateCreateMomentInput } from "../utils/validators/validateMomentInput"
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
    deleteMoment(momentId: ID!): Moment!
    updateMoment(momentId: ID!, updateMomentInput: MomentInput!): Moment!
    createComment(momentId: ID!, body:String!): Moment!
    deleteComment(momentId: ID!, commentId: ID!): Moment!
    switchLikeMoment(momentId: ID!): Moment!
  }

  extend type Subscription {
    newMoment: Moment!
    newComment: Moment!
    newLike: Moment!
  }
`

export const momentResolvers = {
  Moment: {
    likeCount: (root) => root.likes.length,
    commentCount: (root) => root.comments.length,
    tagCount: (root) => root.tags.length,
  },
  Query: {
    getMoments: async (): Promise<IMoment[]> => {
      try {
        const moments = await Moment.find().sort({ createdAt: -1 })
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

      const { errors, valid } = validateCreateMomentInput(
        title,
        body,
        momentDate,
        location
      )

      if (!valid) {
        throw new UserInputError("Errors occured", { errors })
      }

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

      context.pubsub.publish("NEW_MOMENT", { newMoment: returnedMoment })

      return returnedMoment
    }, //(createMomentInput: MomentInput!): Moment!
    deleteMoment: async (_root, args, context) => {
      const { momentId } = args

      const token = checkAuthorization(context)

      try {
        const moment = await Moment.findById(momentId)
        if (moment.username === token.username) {
          const returnedMoment = await moment.delete()
          return returnedMoment
        } else {
          throw new AuthenticationError("Action not allowed")
        }
      } catch (error) {
        throw new Error(error)
      }
    }, //(momentId: ID!): String!
    createComment: async (_root, args, context) => {
      const { momentId, body } = args

      const token = checkAuthorization(context)

      //validate input
      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: { body: "Comment body cannot be empty" },
        })
      }

      const moment = await Moment.findById(momentId)

      if (moment) {
        moment.comments.unshift({
          body,
          username: token.username,
          createdAt: new Date().toISOString(),
        })

        const returnedMoment = await moment.save()
        return returnedMoment
      } else {
        throw new UserInputError("Moment not found")
      }
    }, //(momentId: ID!, body:String!): Moment!
    deleteComment: async (_root, args, context) => {
      const { momentId, commentId } = args

      const token = checkAuthorization(context)

      const moment = await Moment.findById(momentId)

      if (moment) {
        const commentIndex = moment.comments.findIndex(
          (c) => c.id === commentId
        )
        if (commentIndex === -1) {
          throw new UserInputError("Comment not found")
        }

        if (moment.comments[commentIndex].username === token.username) {
          moment.comments.splice(commentIndex, 1)
          const returnedMoment = await moment.save()
          return returnedMoment
        } else {
          throw new AuthenticationError("Action not allowed")
        }
      } else {
        throw new UserInputError("Moment not found")
      }
    }, //(momentId: ID!, commentId: ID!): Moment!
    switchLikeMoment: async (_root, args, context) => {
      const { momentId } = args

      const token = checkAuthorization(context)

      const moment = await Moment.findById(momentId)

      if (moment) {
        if (moment.likes.find((like) => like.username === token.username)) {
          // moment already liked by the user, unlike it
          moment.likes = moment.likes.filter(
            (like) => like.username !== token.username
          )
        } else {
          //not liked, like it
          moment.likes.push({
            username: token.username,
            createdAt: new Date().toISOString(),
          })
        }
        const returnedMoment = await moment.save()
        return returnedMoment
      } else {
        throw new UserInputError("Moment not found")
      }
    }, //(momentId: ID!): Moment!
  },
  Subscription: {
    newMoment: {
      subscribe: (_root, _args, context) =>
        context.pubsub.asyncIterator("NEW_MOMENT"),
    },
  },
}
