/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"

import { useSwitchLikeMoment } from "../../graphql/hooks/moments"

const LikeButton: React.FC<{ user: any; moment: any }> = ({ user, moment }) => {
  const [liked, setLiked] = useState(false)

  const switchLikeMoment = useSwitchLikeMoment()

  const handleClick = () => {
    console.log(moment.id)
    switchLikeMoment({ variables: { momentId: moment.id } })
  }

  useEffect(() => {
    if (user && moment.likes.find((like: { username: any }) => like.username === user.username)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [user, moment.likes])

  return (
    <a className="kl-card-like" onClick={handleClick}>
      {liked ? <i className="bi bi-heart-fill" /> : <i className="bi bi-heart" />}
      <span>{moment.likeCount}</span>
    </a>
  )
}

export default LikeButton
