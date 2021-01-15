/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import MomentCard from "../../components/MomentCard/MomentCard"
import { useGetSingleMoment } from "../../graphql/hooks/moments"
import { RouteComponentProps } from "react-router-dom"

interface ExtendedProps extends RouteComponentProps {
  momentId: string
}
const SingleMoment: React.FC<ExtendedProps> = (props) => {
  const params: any = props.match.params
  const momentId = params.momentId

  const getMoment = useGetSingleMoment(momentId)

  if (!getMoment) {
    return <p>loading...</p>
  }
  return <MomentCard moment={getMoment} />
}

export default SingleMoment
