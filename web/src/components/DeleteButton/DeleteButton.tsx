/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { useDeleteMoment } from "../../graphql/hooks/moments"

const DeleteButton: React.FC<{ momentId: string }> = ({ momentId }) => {
  const deleteMoment = useDeleteMoment()

  //TODO: add confirmation modal
  const handleClick = () => {
    console.log(momentId)
    deleteMoment({ variables: { momentId } })
  }

  return (
    <span onClick={handleClick}>
      <i className="bi bi-trash mr-2" />
    </span>
  )
}

export default DeleteButton
