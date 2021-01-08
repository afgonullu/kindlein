/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpLink, split } from "@apollo/client"

import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/client/link/ws"
import { setContext } from "@apollo/client/link/context"

import { LOCAL_STORAGE_KEY, HTTP_LINK, WEBSOCKET_LINK } from "../utils/config"

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY!)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

const httpLink = new HttpLink({ uri: HTTP_LINK })

const wsLink = new WebSocketLink({
  uri: WEBSOCKET_LINK!,
  options: {
    reconnect: true,
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === "OperationDefinition" && definition.operation === "subscription"
  },
  wsLink,
  authLink.concat(httpLink),
)

export { splitLink }
