import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Header from "./layouts/Header/Header"
import About from "./pages/About/About"
import Home from "./pages/Home/Home"

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
