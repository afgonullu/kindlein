import { makeExecutableSchema } from "@graphql-tools/schema"

import { Query } from "./_type"
import { bookDefs, bookResolvers } from "./book"
import { momentDefs, momentResolvers } from "./moment"
import { childDefs, childResolvers } from "./child"
import { userDefs, userResolvers } from "./user"

const typeDefs = [Query, bookDefs, momentDefs, childDefs, userDefs]
const resolvers = [
  bookResolvers,
  momentResolvers,
  childResolvers,
  userResolvers,
]

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
