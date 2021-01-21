export interface IMoment {
  id: string
  title: string
  body: string
  username: string
  childName: string
  momentDate: string
  createdAt: string
  location: string
  tags: [
    {
      body: string
    },
  ]
  likes: [
    {
      username: string
    },
  ]
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
  user: string
  child: string
}
