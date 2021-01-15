/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql, StoreObject, useMutation, useQuery } from "@apollo/client"
import { IMoment } from "../interfaces/moment"

// GET MOMENTS
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
        id
        body
      }
      comments {
        id
        body
        username
      }
      likes {
        id
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
// END OF GET MOMENTS

// GET SINGLE MOMENT
const GET_SINGLE_MOMENT = gql`
  query getMoment($momentId: ID!) {
    getMoment(momentId: $momentId) {
      id
      title
      body
      username
      momentDate
      createdAt
      location
      tags {
        id
        body
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
      tagCount
    }
  }
`

export const useGetSingleMoment = (momentId: string) => {
  const { data } = useQuery(GET_SINGLE_MOMENT, { variables: { momentId } })

  if (data) {
    return data.getMoment
  }

  return null
}
// END OF GET SINGLE MOMENT

// CREATE MOMENT
const CREATE_MOMENT = gql`
  mutation createMoment($title: String!, $body: String!, $momentDate: String!, $location: String!) {
    createMoment(
      createMomentInput: { title: $title, body: $body, momentDate: $momentDate, location: $location, tags: [] }
    ) {
      id
      title
      body
      momentDate
      createdAt
      location
      tags {
        body
      }
      username
    }
  }
`
// TODO: Error handling
export const useCreateMoment = () => {
  const [createMoment] = useMutation(CREATE_MOMENT, {
    update: (cache, result) => {
      cache.modify({
        fields: {
          getMoments(existingMoments = []) {
            const newMomentRef = cache.writeFragment({
              data: result.data.createMoment,
              fragment: gql`
                fragment NewMoment on Moment {
                  id
                  title
                  body
                  momentDate
                  createdAt
                  location
                  tags {
                    body
                  }
                  username
                }
              `,
            })
            return [...existingMoments, newMomentRef]
          },
        },
      })
    },
    onError: (_error) => {
      // setErrors(error.graphQLErrors[0]?.extensions?.exception.errors)
    },
  })
  return createMoment
}

// END OF CREATE MOMENT

// DELETE MOMENT
const DELETE_MOMENT = gql`
  mutation deleteMoment($momentId: ID!) {
    deleteMoment(momentId: $momentId) {
      id
    }
  }
`

export const useDeleteMoment = () => {
  const [deleteMoment] = useMutation(DELETE_MOMENT, {
    update: (cache, result) => {
      cache.modify({
        fields: {
          getMoments(existingMomentRefs = [], { readField }) {
            return existingMomentRefs.filter(
              (momentRef: StoreObject) => result.data.deleteMoment.id !== readField("id", momentRef),
            )
          },
        },
      })
    },
  })

  return deleteMoment
}
// END OF DELETE MOMENT

//LIKE & UNLIKE A MOMENT
const SWITCH_LIKE_MOMENT = gql`
  mutation switchLikeMoment($momentId: ID!) {
    switchLikeMoment(momentId: $momentId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

export const useSwitchLikeMoment = () => {
  const [switchLikeMoment] = useMutation(SWITCH_LIKE_MOMENT)

  return switchLikeMoment
}
// END OF LIKE & UNLIKE A MOMENT
