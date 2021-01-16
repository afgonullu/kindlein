/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql, StoreObject, useMutation } from "@apollo/client"

// DELETE COMMENT
const DELETE_COMMENT = gql`
  mutation deleteComment($momentId: ID!, $commentId: ID!) {
    deleteComment(momentId: $momentId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
      }
    }
  }
`

export const useDeleteComment = () => {
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update: (cache, result) => {
      console.log(result)
      cache.modify({
        id: cache.identify(result.data.deleteComment),
        fields: {
          comments(existingCommentRefs = [], { readField }) {
            return existingCommentRefs.filter(
              (commentRef: StoreObject) => result.data.deleteComment.comments.id !== readField("id", commentRef),
            )
          },
        },
      })
    },
  })

  return deleteComment
}
// END OF DELETE MOMENT

// CREATE COMMENT
const CREATE_COMMENT = gql`
  mutation createComment($momentId: ID!, $body: String!) {
    createComment(momentId: $momentId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`
// TODO: Error handling
// TODO: clean up update, so far I think nothing needs to be done. but make sure one last time and finish up.
export const useCreateComment = () => {
  const [createComment] = useMutation(CREATE_COMMENT, {
    update: (_cache, result) => {
      console.log(result)
      // cache.modify({
      //   id: cache.identify(result.data.createMoment),
      //   fields: {
      //     comments(existingComments = []) {
      //       const newCommentRef = cache.writeFragment({
      //         data: result.data.createMoment,
      //         fragment: gql`
      //           fragment NewMoment on Moment {
      //             id
      //             title
      //             body
      //             momentDate
      //             createdAt
      //             location
      //             tags {
      //               body
      //             }
      //             username
      //           }
      //         `,
      //       })
      //       return [...existingMoments, newMomentRef]
      //     },
      //   },
      // })
    },
    onError: (_error) => {
      // setErrors(error.graphQLErrors[0]?.extensions?.exception.errors)
    },
  })
  return createComment
}
// END OF CREATE COMMENT
