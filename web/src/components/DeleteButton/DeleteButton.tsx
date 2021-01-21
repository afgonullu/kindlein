/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { useDeleteComment } from "../../graphql/hooks/comments"
import { useDeleteMoment } from "../../graphql/hooks/moments"
import { useDeleteChild } from "../../graphql/hooks/childs"

const DeleteButton: React.FC<{ childId: string | null; momentId: string | null; commentId: string | null }> = ({
  childId,
  momentId,
  commentId,
}) => {
  const deleteMoment = useDeleteMoment()
  const deleteComment = useDeleteComment()
  const deleteChild = useDeleteChild()

  //TODO: add confirmation modal
  const handleClick = () => {
    if (childId) {
      deleteChild({ variables: { childId } })
    } else if (commentId) {
      deleteComment({ variables: { commentId, momentId } })
    } else {
      deleteMoment({ variables: { momentId } })
    }
  }

  return (
    <a className="kl-card-delete" onClick={handleClick}>
      <i className="bi bi-trash" />
    </a>
  )
}

export default DeleteButton
