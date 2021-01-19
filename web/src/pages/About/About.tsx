import React from "react"
import { Col, Container, Row } from "react-bootstrap"

const About: React.FC = () => {
  return (
    <Container fluid="xl" className="kl-main kl-about">
      <Row>
        <Col sm={12} lg={7}>
          <h2>About Page</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis nihil atque cum maiores, nulla nobis vero
            inventore fugiat magnam, pariatur eaque nam illo quam ducimus, eos asperiores voluptates possimus quo
            suscipit tenetur. Quidem tempora dolores esse sapiente tenetur repellendus, nisi culpa consequuntur
            temporibus tempore quisquam fuga enim quasi, corporis alias?
          </p>
        </Col>
        <Col lg={5} className="kl-main-side kl-about-side d-none d-lg-block">
          <h3>About Page Sidebar</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quam fugit fugiat commodi reiciendis
            quas ea consequuntur voluptatum, porro, tenetur nobis architecto, exercitationem odio eveniet dolorum sint
            placeat quod? Maxime.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default About
