/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql, StoreObject, useMutation, useQuery } from "@apollo/client"
import { IChild } from "../interfaces/child"

// GET CHILDS
const GET_CHILDS = gql`
  query {
    getChilds {
      id
      name
      birthDate
      createdAt
      username
      parent
    }
  }
`

export const useGetChilds = (): IChild[] => {
  const { data } = useQuery(GET_CHILDS)

  if (data) {
    return data.getChilds
  }

  return []
}
// END OF GET CHILDS

// GET SINGLE CHILD
const GET_SINGLE_CHILD = gql`
  query getChild($childId: ID!) {
    getChild(childId: $childId) {
      id
      name
      birthDate
      createdAt
      username
      parent
    }
  }
`

export const useGetSingleChild = (childId: string): IChild | null => {
  const { data } = useQuery(GET_SINGLE_CHILD, { variables: { childId } })

  if (data) {
    return data.getChild
  }

  return null
}
// END OF GET SINGLE CHILD

// GET CHILDS OF USER
const GET_CHILDS_OF_USER = gql`
  query getChildsOfUser($userId: ID!) {
    getChildsOfUser(userId: $userId) {
      id
      name
      birthDate
      createdAt
      username
      parent
    }
  }
`

export const useGetChildsOfUser = (userId: string): IChild[] => {
  const { data } = useQuery(GET_CHILDS_OF_USER, { variables: { userId } })

  if (data) {
    return data.getChildsOfUser
  }

  return []
}
// END OF GET CHILDS OF USER

// CREATE CHILD
const CREATE_CHILD = gql`
  mutation createChild($name: String!, $parent: String!, $birthDate: String!) {
    createChild(createChildInput: { name: $name, parent: $parent, birthDate: $birthDate }) {
      id
      name
      birthDate
      createdAt
      username
      parent
    }
  }
`
// TODO: Error handling
export const useCreateChild = () => {
  const [createChild] = useMutation(CREATE_CHILD, {
    update: (cache, result) => {
      cache.modify({
        fields: {
          getChildsOfUser(existingChilds = []) {
            const newChildRef = cache.writeFragment({
              data: result.data.createChild,
              fragment: gql`
                fragment NewChild on Child {
                  id
                  name
                  birthDate
                  createdAt
                  username
                  parent
                }
              `,
            })
            return [...existingChilds, newChildRef]
          },
        },
      })
    },
    onError: (_error) => {
      // setErrors(error.graphQLErrors[0]?.extensions?.exception.errors)
    },
  })
  return createChild
}

// END OF CREATE CHILD

// DELETE CHILD
const DELETE_CHILD = gql`
  mutation deleteChild($childId: ID!) {
    deleteChild(childId: $childId) {
      id
    }
  }
`

export const useDeleteChild = () => {
  const [deleteChild] = useMutation(DELETE_CHILD, {
    update: (cache, result) => {
      cache.modify({
        fields: {
          getChildsOfUser(existingChildRefs = [], { readField }) {
            return existingChildRefs.filter(
              (childRef: StoreObject) => result.data.deleteChild.id !== readField("id", childRef),
            )
          },
        },
      })
    },
  })

  return deleteChild
}
// END OF DELETE CHILD
