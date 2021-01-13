/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useReducer } from "react"
import jwtDecode from "jwt-decode"

import { IUser } from "../graphql/interfaces/user"
import { LOCAL_STORAGE_KEY } from "../utils/config"

//TODO: Implement Cookie Based authentication instead of token

const initialState: { user: IUser | null } = { user: null }

if (localStorage.getItem(LOCAL_STORAGE_KEY!)) {
  const decodedToken: IUser = jwtDecode(localStorage.getItem(LOCAL_STORAGE_KEY!)!)

  initialState.user = decodedToken
}

// create a simple app-wide state for user
const AuthContext = createContext<{ user: IUser | null; login: (_userData: any) => any; logout: () => any }>({
  user: null,
  login: (_userData: any) => {},
  logout: () => {},
})

function authReducer(state: any, action: { type: any; payload?: any }) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

// wrapper to serve state
const AuthProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData: any) => {
    localStorage.setItem(LOCAL_STORAGE_KEY!, userData.token)
    dispatch({
      type: "LOGIN",
      payload: userData,
    })
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY!)
    dispatch({
      type: "LOGOUT",
    })
  }

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
}

export { AuthContext, AuthProvider }
