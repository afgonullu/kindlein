import React, { useContext } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"

import { AuthContext } from "../../context/auth"

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container fluid="xl" className="kl-main kl-profile">
      <Row>
        <Col sm={12} lg={7}>
          <Card className="kl-card">
            <Card.Body className="kl-card-body">
              <Card.Title>
                <span className="kl-card-title">{user?.username}</span>
              </Card.Title>
              <Card.Text className="kl-card-text">Email: {user?.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} className="kl-main-side kl-profile-side d-none d-lg-block"></Col>
      </Row>
    </Container>
  )
}

export default Profile
