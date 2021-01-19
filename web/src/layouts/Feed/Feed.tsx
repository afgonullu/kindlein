import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import MomentCard from "../../components/MomentCard/MomentCard"

import { useGetMoments } from "../../graphql/hooks/moments"
import Footer from "../Footer/Footer"
import MomentForm from "../MomentForm/MomentForm"

const Feed: React.FC = () => {
  const moments = useGetMoments()

  return (
    <Container fluid="xl" className="kl-main kl-feed">
      <Row>
        <Col lg={7} className="kl-moments">
          <h1 className="kl-title">X&apos;s Moments</h1>
          {moments.map((moment) => {
            return <MomentCard key={moment.id} moment={moment} />
          })}
        </Col>
        <Col lg={5} className="kl-main-side kl-feed-side d-none d-lg-block">
          <div>
            <h3 className="kl-title">Add Another Moment</h3>
            <MomentForm></MomentForm>
          </div>
          <div>
            <Footer />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Feed
