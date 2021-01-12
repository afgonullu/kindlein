import React from "react"

import { Col, Container, Row } from "react-bootstrap"
import { Route, Switch } from "react-router-dom"

import Feed from "../../layouts/Feed/Feed"
import NavBar from "../../layouts/NavBar/NavBar"
import About from "../About/About"

const Home: React.FC = () => {
  return (
    <Container fluid="xl">
      <Row>
        <Col sm={1} lg={1} xl={2}>
          <NavBar></NavBar>
        </Col>
        <Col sm={11} lg={7} xl={6}>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Feed />
            </Route>
          </Switch>
        </Col>
        <Col lg={4} xl={4} className="d-none d-lg-block">
          Sidebar
        </Col>
      </Row>
    </Container>
  )
}

export default Home
