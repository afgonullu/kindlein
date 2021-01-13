import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { AuthProvider } from "./context/auth"
import AuthRoute from "./components/AuthRoute/AuthRoute"

import "./App.scss"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
