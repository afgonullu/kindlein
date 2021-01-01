import { makeExecutableSchema } from "@graphql-tools/schema"

import { Query } from "./_type"
import { bookDefs, bookResolvers } from "./book"
import { momentDefs, momentResolvers } from "./moment"

const typeDefs = [Query, bookDefs, momentDefs]
const resolvers = [bookResolvers, momentResolvers]

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
