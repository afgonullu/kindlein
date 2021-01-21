import React from "react"

import { Col, Container, Row } from "react-bootstrap"
import { Switch } from "react-router-dom"

import MyRoute from "../../components/MyRoute/MyRoute"
import Feed from "../../layouts/Feed/Feed"
import NavBar from "../../layouts/NavBar/NavBar"
import About from "../About/About"
import Profile from "../Profile/Profile"
import SingleMoment from "../SingleMoment/SingleMoment"

const Home: React.FC = () => {
  return (
    <Container fluid="xl" className="kl-home">
      <Row>
        <Col md={1} xl={2}>
          <NavBar></NavBar>
        </Col>
        <Col md={11} xl={10}>
          <Switch>
            <MyRoute path="/moments/:momentId" component={SingleMoment} />
            <MyRoute path="/about" component={About} />
            <MyRoute path="/profile" component={Profile} />
            <MyRoute path="/childs/:childId" component={Feed} />
            <MyRoute path="/" component={Feed} />
          </Switch>
        </Col>
      </Row>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </Container>
  )
}

export default Home
