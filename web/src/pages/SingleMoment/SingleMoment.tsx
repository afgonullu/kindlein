/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react"

import { AuthContext } from "../../context/auth"
import MomentCard from "../../components/MomentCard/MomentCard"
import { useGetSingleMoment } from "../../graphql/hooks/moments"
import { useCreateComment } from "../../graphql/hooks/comments"
import { RouteComponentProps } from "react-router-dom"
import { Button, Card, Form } from "react-bootstrap"
import DeleteButton from "../../components/DeleteButton/DeleteButton"

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
    <>
      <MomentCard moment={moment} />
      {
        //TODO: seperate component for comment input
        //TODO: disable button if input is empty
        //TODO: out of focus after submit with click or pressing enter
      }
      <Card>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formBasicComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Comment"
              name="comment"
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card>
      {
        //TODO: Seperate component.
        //TODO: like & unlike comment
        moment.comments.map((comment: { id: string; body: string; username: string; createdAt: string }) => (
          <Card key={comment.id}>
            <Card.Header>{comment.username}</Card.Header>
            <Card.Body>{comment.body}</Card.Body>
            <Card.Footer>
              {comment.createdAt}
              {context.user && context.user.username === comment.username ? (
                <DeleteButton momentId={moment.id} commentId={comment.id} />
              ) : null}
            </Card.Footer>
          </Card>
        ))
      }
    </>
  )
}

export default SingleMoment
