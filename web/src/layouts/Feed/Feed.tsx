/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react"
import { Col, Container, Row } from "react-bootstrap"

import MomentCard from "../../components/MomentCard/MomentCard"
import Footer from "../Footer/Footer"
import MomentForm from "../MomentForm/MomentForm"
import { useGetMoments } from "../../graphql/hooks/moments"
import { RouteComponentProps } from "react-router-dom"

interface ExtendedProps extends RouteComponentProps {
  childId: string | null
}

const Feed: React.FC<ExtendedProps> = (props) => {
  const params: any = props.match.params
  const childId = params.childId

  const moments = useGetMoments(childId)
  console.log(moments)

  return (
    <Container fluid="xl" className="kl-main kl-feed">
      <Row>
        <Col lg={7} className="kl-moments">
          {childId ? <h1 className="kl-title">{childId} Feed</h1> : <h1 className="kl-title">Your Feed</h1>}
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
