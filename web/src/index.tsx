import React from "react"
import ReactDOM from "react-dom"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import { splitLink } from "./graphql/clientLink"
import App from "./App"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
)
