/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { useDeleteComment } from "../../graphql/hooks/comments"
import { useDeleteMoment } from "../../graphql/hooks/moments"

const DeleteButton: React.FC<{ momentId: string; commentId: string | null }> = ({ momentId, commentId }) => {
  const deleteMoment = useDeleteMoment()
  const deleteComment = useDeleteComment()

  //TODO: add confirmation modal
  const handleClick = () => {
    if (commentId) {
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
