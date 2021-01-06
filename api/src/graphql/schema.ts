import { makeExecutableSchema } from "@graphql-tools/schema"

import { Query } from "./_type"
import { bookDefs, bookResolvers } from "./book"
import { momentDefs, momentResolvers } from "./moment"
import { userDefs, userResolvers } from "./user"

const typeDefs = [Query, bookDefs, momentDefs, userDefs]
const resolvers = [bookResolvers, momentResolvers, userResolvers]

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
