import React from "react"

import { Col, Container, Row } from "react-bootstrap"
import { Switch } from "react-router-dom"

import MyRoute from "../../components/MyRoute/MyRoute"
import Feed from "../../layouts/Feed/Feed"
import MomentForm from "../../layouts/MomentForm/MomentForm"
import NavBar from "../../layouts/NavBar/NavBar"
import About from "../About/About"
import SingleMoment from "../SingleMoment/SingleMoment"

const Home: React.FC = () => {
  return (
    <Container fluid="xl">
      <Row>
        <Col sm={1} lg={1} xl={2}>
          <NavBar></NavBar>
        </Col>
        <Col sm={11} lg={7} xl={6}>
          <Switch>
            <MyRoute path="/moments/:momentId" component={SingleMoment} />
            <MyRoute path="/about" component={About} />
            <MyRoute path="/" component={Feed} />
          </Switch>
        </Col>
        <Col lg={4} xl={4} className="d-none d-lg-block">
          <MomentForm></MomentForm>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
