/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserInputError } from "apollo-server-express"

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
    //   getMoment: async (_root: unknown, args: { momentId: string }) => {
    //     const { momentId } = args
    //     try {
    //       const moment = await Moment.findById(momentId)
    //       if (moment) {
    //         return moment
    //       } else {
    //         throw new Error("Moment not found")
    //       }
    //     } catch (error) {
    //       throw new Error(error)
    //     }
    //   },
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
    }, //(createMomentInput: MomentInput!): Moment!
    // deleteMoment: async (_root, args, context) => {
    //   const { momentId } = args

    //   const token = checkAuthorization(context)

    //   try {
    //     const moment = await Moment.findById(momentId)
    //     if (moment.username === token.username) {
    //       const returnedMoment = await moment.delete()
    //       return returnedMoment
    //     } else {
    //       throw new AuthenticationError("Action not allowed")
    //     }
    //   } catch (error) {
    //     throw new Error(error)
    //   }
    // }, //(momentId: ID!): String!
  },
}
