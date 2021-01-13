/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Authenticated Users Cannot Access Certain Routes and Redirected to Index
import React, { useContext } from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"

import { AuthContext } from "../../context/auth"

interface PrivateRouteProps extends Omit<RouteProps, "component"> {
  component: React.ElementType
  // any additional vars
}

const MyRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)

  return <Route {...rest} render={(props) => (!user ? <Redirect to="/login" /> : <Component {...props} />)} />
}

export default MyRoute
