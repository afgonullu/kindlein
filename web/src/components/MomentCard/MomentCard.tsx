import React, { useContext } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/auth"
import { IMoment } from "../../graphql/interfaces/moment"
import DeleteButton from "../DeleteButton/DeleteButton"
import LikeButton from "../LikeButton/LikeButton"

const MomentCard: React.FC<{ moment: IMoment }> = ({ moment }) => {
  const context = useContext(AuthContext)

  return (
    <Card className="mb-2">
      <Card.Header style={{ backgroundColor: "#fff", border: "none" }}>
        {moment.tags.map((tag) => (
          <span key={tag.body}>{tag.body}</span>
        ))}
      </Card.Header>
      <Card.Body>
        <Card.Title>{moment.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <span>in {moment.location}</span> {}
          <span>on {new Date(moment.momentDate).toJSON().substr(0, 10)}</span>
        </Card.Subtitle>
        <Card.Text>{moment.body}</Card.Text>
      </Card.Body>
      <Card.Footer
        style={{ backgroundColor: "#fff", border: "none" }}
        className="text-muted d-flex justify-content-around"
      >
        <Link to={`/moments/${moment.id}`}>
          <i className="bi bi-chat mr-2" />
          {moment.commentCount}
        </Link>
        <LikeButton user={context.user} moment={{ id: moment.id, likes: moment.likes, likeCount: moment.likeCount }} />
        {context.user && context.user.username === moment.username ? <DeleteButton momentId={moment.id} /> : null}
      </Card.Footer>
    </Card>
  )
}

export default MomentCard
