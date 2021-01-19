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
    <Card className="kl-card">
      {/* <Card.Header className="kl-card-header">
        {moment.tags.map((tag) => (
          <span key={tag.body}>{tag.body}</span>
        ))}
      </Card.Header> */}
      <Card.Body className="kl-card-body" onClick={() => (location.href = `/moments/${moment.id}`)}>
        <Card.Title>
          <span className="kl-card-title">{moment.title}</span>{" "}
          <span className="kl-card-meta text-muted">
            {moment.location}, on {new Date(moment.momentDate).toJSON().substr(0, 10)}
          </span>
        </Card.Title>
        <Card.Subtitle></Card.Subtitle>
        <Card.Text className="kl-card-text">{moment.body}</Card.Text>
      </Card.Body>
      <Card.Footer className="kl-card-footer">
        <Link className="kl-card-comment" to={`/moments/${moment.id}`}>
          <i className="bi bi-chat" />
          <span>{moment.commentCount}</span>
        </Link>
        <LikeButton user={context.user} moment={{ id: moment.id, likes: moment.likes, likeCount: moment.likeCount }} />
        {context.user && context.user.username === moment.username ? (
          <DeleteButton momentId={moment.id} commentId={null} />
        ) : null}
      </Card.Footer>
    </Card>
  )
}

export default MomentCard
