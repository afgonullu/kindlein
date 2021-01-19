/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserInputError } from "apollo-server-express"

import { validateRegisterInput } from "../utils/validators/validateRegisterInput"
import { validateLoginInput } from "../utils/validators/validateLoginInput"
import { SECRET } from "../utils/config"
import { IUser, User } from "../models/User"

export const userDefs = `
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  extend type Query {
    me(userId: ID!): User!
  }

  extend type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!, password:String!): User!
  }
`

const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
    SECRET!
  )
}

export const userResolvers = {
  Query: {
    me: async (_root, args) => {
      const { userId } = args
      try {
        const user = await User.findById(userId)
        if (user) {
          return user
        } else {
          throw new Error("User not found")
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  Mutation: {
    register: async (_root, args) => {
      const { username, email, password, confirmPassword } = args.registerInput

      //validate user input
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError("Errors occured", { errors })
      }

      //make sure user doesn't exist
      const user = await User.findOne({ username })

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        })
      }

      //hash password, create user and create token
      const passwordHash = await bcrypt.hash(password, 12)

      const newUser = new User({
        username,
        passwordHash,
        email,
        createdAt: new Date().toISOString(),
      })

      const returnedUser = await newUser.save()

      const token = generateToken(returnedUser)

      return {
        username: returnedUser.username,
        email: returnedUser.email,
        createdAt: returnedUser.createdAt,
        token,
        id: returnedUser._id,
      }
    },
    login: async (_root, args) => {
      const { username, password } = args

      //validate user input
      const { errors, valid } = validateLoginInput(username, password)

      if (!valid) {
        throw new UserInputError("Errors occured", { errors })
      }

      //check if user exists
      const returnedUser = await User.findOne({ username })
      if (!returnedUser) {
        errors.general = "User not found"
        throw new UserInputError("User not found", { errors })
      }

      // user exists, check if password correct
      const match = await bcrypt.compare(password, returnedUser.passwordHash)
      if (!match) {
        errors.general = "Wrong credentials"
        throw new UserInputError("Wrong credentials", { errors })
      }

      //can safely login
      const token = generateToken(returnedUser)

      return {
        username: returnedUser.username,
        email: returnedUser.email,
        createdAt: returnedUser.createdAt,
        token,
        id: returnedUser._id,
      }
    },
  },
}
