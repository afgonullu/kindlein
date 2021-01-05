/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MONGODB_URI } from "./utils/config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import mongoose from "mongoose"

import middleware from "./utils/middleware"

import { schema } from "./schema/schema"

mongoose
  .connect(MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const app = express()
const server = new ApolloServer({
  schema,
})

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

server.applyMiddleware({ app })

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
