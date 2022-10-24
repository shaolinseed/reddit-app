import { User } from "firebase/auth"
import React from "react"
import { Post } from "../../../store/postState"

type Props = {
  user: User
  openPost: Post
  communityId: string
}

const Comments: React.FC<Props> = ({ user, openPost, communityId }) => {
  const onCreateComment = async (commentText: string) => {}

  const onDeleteComment = async (commentText: string) => {}

  return <div>Comments</div>
}
export default Comments
