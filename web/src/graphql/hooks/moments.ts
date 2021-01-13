import { gql, useQuery } from "@apollo/client"
import { IMoment } from "../interfaces/moment"

const GET_MOMENTS = gql`
  query {
    getMoments {
      id
      title
      body
      username
      momentDate
      createdAt
      location
      tags {
        body
      }
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        username
      }
      likeCount
      commentCount
      tagCount
    }
  }
`

export const useGetMoments = (): IMoment[] => {
  const { data } = useQuery(GET_MOMENTS)

  if (data) {
    return data.getMoments
  }

  return []
}
