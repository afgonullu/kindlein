import React from "react"
import MomentCard from "../../components/MomentCard/MomentCard"

import { useGetMoments } from "../../graphql/hooks/moments"

const Feed: React.FC = () => {
  const moments = useGetMoments()

  return (
    <div>
      {moments.map((moment) => {
        return <MomentCard key={moment.id} moment={moment} />
      })}
    </div>
  )
}

export default Feed
