/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react"

import { AuthContext } from "../../context/auth"
import MomentCard from "../../components/MomentCard/MomentCard"
import { useGetSingleMoment } from "../../graphql/hooks/moments"
import { useCreateComment } from "../../graphql/hooks/comments"
import { RouteComponentProps } from "react-router-dom"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import DeleteButton from "../../components/DeleteButton/DeleteButton"
import MomentForm from "../../layouts/MomentForm/MomentForm"

interface ExtendedProps extends RouteComponentProps {
  momentId: string
}
const SingleMoment: React.FC<ExtendedProps> = (props) => {
  const [commentBody, setCommentBody] = useState("")
  const context = useContext(AuthContext)
  const params: any = props.match.params
  const momentId = params.momentId

  const moment = useGetSingleMoment(momentId)
  const createComment = useCreateComment()

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    createComment({ variables: { momentId: moment.id, body: commentBody } })
    setCommentBody("")
  }

  if (!moment) {
    return <p>loading...</p>
  }

  return (
    <Container fluid="xl" className="kl-main kl-single">
      <Row>
        <Col sm={12} lg={7}>
          <MomentCard moment={moment} />
          {
            //TODO: seperate component for comment input
            //TODO: disable button if input is empty
            //TODO: out of focus after submit with click or pressing enter
          }
          <Form noValidate onSubmit={onSubmit} className="kl-card kl-form">
            <Form.Group controlId="formBasicComment" className="kl-form-group">
              {/* <Form.Label>Comment</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter Your Comment"
                name="comment"
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)}
                className="kl-form-control"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="kl-form-button">
              Add Comment
            </Button>
          </Form>
          {
            //TODO: Seperate component.
            //TODO: like & unlike comment
            moment.comments.map((comment: { id: string; body: string; username: string; createdAt: string }) => (
              <Card key={comment.id} className="kl-card kl-comment-card">
                <Card.Header className="kl-card-header">{comment.username}</Card.Header>
                <Card.Body className="kl-card-body">{comment.body}</Card.Body>
                <Card.Footer className="kl-card-fotter">
                  {comment.createdAt}
                  {context.user && context.user.username === comment.username ? (
                    <DeleteButton momentId={moment.id} commentId={comment.id} />
                  ) : null}
                </Card.Footer>
              </Card>
            ))
          }
        </Col>
        <Col lg={5} className="kl-main-side kl-single-side d-none d-lg-block">
          <MomentForm></MomentForm>
        </Col>
      </Row>
    </Container>
  )
}

export default SingleMoment
