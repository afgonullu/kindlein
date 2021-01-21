/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticationError, UserInputError } from "apollo-server-express"

import { validateCreateChildInput } from "../utils/validators/validateCreateChildInput"
import { IChild, Child } from "../models/Child"
import { checkAuthorization } from "../utils/helpers"

export const childDefs = `
  type Child {
    id: ID!
    name: String!
    birthDate: String!
    createdAt: String!
    username: String!
    parent: String
  }

  input ChildInput {
    name: String!
    birthDate: String!
    parent: String
  }
  
  extend type Query {
    getChilds: [Child]
    getChild(childId: ID!): Child
    getChildsOfUser(userId: ID!): [Child]
  }

  extend type Mutation {
    createChild(createChildInput: ChildInput!): Child!
    deleteChild(childId: ID!): Child!
    updateChild(childId: ID!, updateChildInput: ChildInput!): Child!
  }
`

export const childResolvers = {
  Query: {
    getChilds: async (): Promise<IChild[]> => {
      try {
        const childs = await Child.find().sort({ createdAt: -1 })
        return childs
      } catch (error) {
        throw new Error(error)
      }
    },
    getChild: async (_root: unknown, args: { childId: string }) => {
      const { childId } = args
      try {
        const child = await Child.findById(childId)
        if (child) {
          return child
        } else {
          throw new Error("Child not found")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    getChildsOfUser: async (_root, args, context) => {
      const { userId } = args // we could have get a userId from the token, but this info can be used in profile page. and authenticated user can be different than profile owner.
      const token = checkAuthorization(context)

      console.log(token.username)

      try {
        const childs = await Child.find({ user: userId })
        if (childs) {
          return childs
        } else {
          throw new Error("No children found")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  Mutation: {
    createChild: async (_root, args, context) => {
      const { name, birthDate, parent } = args.createChildInput
      const token = checkAuthorization(context)

      const { errors, valid } = validateCreateChildInput(name, birthDate)

      if (!valid) {
        throw new UserInputError("Errors occured", { errors })
      }

      const child = new Child({
        name,
        birthDate: new Date(birthDate).toString(),
        createdAt: new Date().toISOString(),
        parent: parent || "",
        username: token.username,
        user: token.id,
      })

      const returnedChild = await child.save()

      return returnedChild
    },
    deleteChild: async (_root, args, context) => {
      const { childId } = args

      const token = checkAuthorization(context)

      try {
        const child = await Child.findById(childId)
        if (child.username === token.username) {
          const returnedChild = await child.delete()
          return returnedChild
        } else {
          throw new AuthenticationError("Action not allowed")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
}
