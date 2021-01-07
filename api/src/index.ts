/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import http from "http"
import express from "express"
import { ApolloServer, PubSub } from "apollo-server-express"
import cors from "cors"
import mongoose from "mongoose"

import { MONGODB_URI, PORT } from "./utils/config"
import middleware from "./utils/middleware"
import { schema } from "./graphql/schema"

//connect to db
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

//create event generator factory
const pubsub = new PubSub()

//create an express app that accepts GraphQL HTPP connections
const app = express()
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req, pubsub }),
})

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

server.applyMiddleware({ app })

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// create express app server
const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  )
})
