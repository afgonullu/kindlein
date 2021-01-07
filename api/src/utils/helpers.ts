/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken"
import { AuthenticationError } from "apollo-server-express"

import { IUser } from "../models/User"
import { SECRET } from "./config"

export const checkAuthorization = (context: {
  req: { headers: { authorization: string } }
}) => {
  const auth = context.req ? context.req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.substring(7)
    try {
      const decodedToken = <IUser>jwt.verify(token, SECRET!)
      return decodedToken
    } catch (error) {
      throw new AuthenticationError("Invalid/Expired token")
    }
  }
  throw new Error("Authentication failed")
}
