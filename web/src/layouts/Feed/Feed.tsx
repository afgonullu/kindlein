import React from "react"
import { Card } from "react-bootstrap"

import { useGetMoments } from "../../graphql/hooks/moments"

const Feed: React.FC = () => {
  const moments = useGetMoments()

  return (
    <div>
      {moments.map((moment) => {
        return (
          <Card key={moment.id}>
            <Card.Header>
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
            <Card.Footer className="text-muted d-flex">
              <span>
                <i className="bi bi-chat mr-2" />
                {moment.commentCount}
              </span>
              <span>
                <i className="bi bi-heart mr-2" />
                {moment.likeCount}
              </span>
            </Card.Footer>
          </Card>
        )
      })}
    </div>
  )
}

export default Feed
