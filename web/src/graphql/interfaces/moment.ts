export interface Moment {
  id: string
  title: string
  body: string
  username: string
  momentDate: string
  createdAt: string
  location: string
  tags: [
    {
      body: string
    },
  ]
  likes: string[]
  likeCount: number
  commentCount: number
  tagCount: number
  comments: [
    {
      id: string
      body: string
      username: string
      createdAt: string
    },
  ]
}
