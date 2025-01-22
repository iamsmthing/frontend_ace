"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, ThumbsUp, ThumbsDown, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useAuth, User } from "@/contexts/auth-context"
import { useComments } from "@/hooks/use-comments"
import { LoadingOverlay } from "../ui/loading-overlay"
import { timeAgo } from "@/lib/helpers/util-functions"
import { createComment } from "@/lib/api/posts"
import { toast } from "sonner"


export interface Comments{
    id:string
    parentCommentId:string
    userId:string
    content:string
    postId:string
    createdAt:string
    user:{
        id:string
        username:string
        imageUrl:string
    }
    replies:Comments[];
}
interface CommentDrawerProps {
  isOpen: boolean
  onClose: () => void
  postId: string
}

function CommentThread({ comment, depth = 0,currentUser }: { comment: Comments; depth?: number;currentUser:User | null }) {
  const [isLiked, setIsLiked] = React.useState(false)
  const [isDisliked, setIsDisliked] = React.useState(false)
  const [isReplying, setIsReplying] = React.useState(false)
  const [replyContent, setReplyContent] = React.useState("")
  const token=currentUser?.token as string;
  const userId=currentUser?.id as string;

//   const [likes, setLikes] = React.useState(comment.likes)

//   const handleLike = () => {
//     if (isLiked) {
//       setLikes(likes - 1)
//       setIsLiked(false)
//     } else {
//       setLikes(likes + 1)
//       setIsLiked(true)
//       if (isDisliked) {
//         setIsDisliked(false)
//       }
//     }
//   }

//   const handleDislike = () => {
//     if (isDisliked) {
//       setIsDisliked(false)
//     } else {
//       setIsDisliked(true)
//       if (isLiked) {
//         setLikes(likes - 1)
//         setIsLiked(false)
//       }
//     }
//   }

const handleReply = () => {
  setIsReplying(!isReplying)
  setReplyContent("")
}

const handleSubmitReply = async(e: React.FormEvent) => {
  e.preventDefault()
  // Here you would typically send the reply to your backend
  console.log("Submitting reply:", replyContent)
  const reply=await createComment(token,userId,comment.postId,replyContent,comment.id);
  if(reply){
    toast.success("comment replied successfully!")
  }
  setIsReplying(false)
  setReplyContent("")
}

  return (
    <div className="relative bg-primary-foreground">
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={comment?.user?.imageUrl} alt={comment?.user?.username} />
            <AvatarFallback>{comment?.user?.username.charAt(0)}</AvatarFallback>
          </Avatar>
          {/* {comment?.replies && comment?.replies?.length > 0 && (
            <div className="w-px relative flex-1 border-l-2 border-b-2 border-primary  left-[1px] " />
          )} */}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{comment?.user?.username}</span>
            <span className="text-xs text-gray-500">{timeAgo(comment?.createdAt)}</span>
          </div>
          <p className="text-sm">{comment?.content}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 p-0 h-auto ${isLiked ? 'text-blue-500' : ''}`}
            //   onClick={handleLike}
            onClick={()=>{}}
            >
              <ThumbsUp className="h-3 w-3" />
              <span>{0}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 p-0 h-auto ${isDisliked ? 'text-red-500' : ''}`}
            //   onClick={handleDislike}
            onClick={()=>{}}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto" onClick={handleReply}>
              <MessageCircle className="h-3 w-3" />
              <span>Reply</span>
            </Button>
          </div>
          {isReplying && (
            <form onSubmit={handleSubmitReply} className="mt-2 flex items-start gap-2">
              <Avatar className="h-6 w-6 border">
                <AvatarImage src={currentUser?.imageUrl} alt="Your avatar" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="flex-1 min-h-[60px] text-sm"
              />
              <Button type="submit" size="sm" className="mt-1">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
      {comment?.replies && comment?.replies?.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment?.replies.map((reply, index) => (
            
            <div key={reply?.id} className="relative">
              {/* <div className="absolute left-4 top-[-16px] bottom-0">
                <div className="w-[18px] h-12 border-l-2 border-b-2 border-primary rounded-bl-xl" />
              </div> */}
              <div className="pl-8 pt-2">
                <CommentThread currentUser={currentUser} comment={reply} depth={depth + 1} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentDrawer({ isOpen, onClose, postId }: CommentDrawerProps) {
    console.log(postId)
  const [newComment, setNewComment] = React.useState("")
  const {user}=useAuth();
  const token=user?.token as string;
  const userId=user?.id as string;
  const { comments,setComments,refetch, isLoading, error } = useComments(token,postId);
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the comment to your backend
    console.log("Submitting comment:", newComment)
    const reply=await createComment(token,userId,postId,newComment);
  if(reply){
    toast.success("comment replied successfully!")
  }
    setNewComment("")
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-primary-foreground rounded-t-xl shadow-xl"
            style={{ maxHeight: "90vh" }}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Comments</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[calc(80vh-4rem)]">
              <div className="p-12 space-y-6">
                {/* Comment input */}
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={user?.imageUrl} alt="Your avatar" />
                    <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add comment..."
                      className="min-h-[40px] resize-none"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </div>
                  <Button type="submit" size="sm">Submit</Button>
                </form>

                <Separator />

                {/* Comments list */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <CommentThread currentUser={user} key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

