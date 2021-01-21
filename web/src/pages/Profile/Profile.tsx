/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import DeleteButton from "../../components/DeleteButton/DeleteButton"

import { AuthContext } from "../../context/auth"
import { useGetChildsOfUser } from "../../graphql/hooks/childs"
import ChildForm from "../../layouts/ChildForm/ChildForm"
import Footer from "../../layouts/Footer/Footer"

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext)

  const childs = useGetChildsOfUser(user?.id!)

  const childList = childs
    ? childs.map((child) => (
        <div key={child.id}>
          <span>{child.name}</span>
          {user && user.username === child.username ? (
            <DeleteButton childId={child.id} momentId={null} commentId={null} />
          ) : null}
        </div>
      ))
    : "no children yet"

  console.log(childs)

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
          {childList}
        </Col>
        <Col lg={5} className="kl-main-side kl-profile-side d-none d-lg-block">
          <div>
            <h3 className="kl-title">Add Another Child</h3>
            <ChildForm />
          </div>
          <div>
            <Footer />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
