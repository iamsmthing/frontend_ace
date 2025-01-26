"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PostProject } from "@/lib/types/project"
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, ArrowUp } from "lucide-react"
import { PostMenu } from "@/components/feed/post-menu"
import { useAuth } from "@/contexts/auth-context"
import { RenderHtml, timeAgo } from "@/lib/helpers/util-functions"
import { useState } from "react"
import { CommentDrawer } from "@/components/feed/comment-drawer"

interface ProjectPostProps {
  post:PostProject
  onUpvote: () => void
  onDelete:()=>void
}

export function ProjectPost({ post, onUpvote ,onDelete}: ProjectPostProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const {user}=useAuth();

   const isUpvotedByCurrentUser=(upvote:any):Boolean=>{
     const userId=user?.id;
     const isUpvoted:boolean=upvote.some((data:any)=>{
      return data.userId===userId;
     })

     return isUpvoted;
   }

  return (
    <Card className="p-4 hover:bg-accent/5 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-10 h-10">
        <AvatarImage src={post?.user?.imageUrl} />
        <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{post?.user?.username}</h3>
            {user?.id===post.userId ?<PostMenu onDelete={onDelete}/>:<span className="h-8 w-8 p-0"></span>}
          </div>
          <p className="text-sm text-muted-foreground">{timeAgo(post?.timestamp?post?.timestamp:post?.createdAt!)}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <p className="text-muted-foreground">{RenderHtml(post.description)}</p>
      </div>

      {post.imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden border">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[350px] object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
        <Button variant="ghost" size="sm" className={`h-8 ${isUpvotedByCurrentUser(post.upvotes) ?'bg-primary text-primary-foreground hover:scale-110 transition-transform duration-1000':''}`} onClick={onUpvote}>
          <ArrowUp className="h-4 w-4 mr-2 " />
          {post.upvotes?.length}
        </Button>
        <Button variant="ghost" size="sm" className="h-8" onClick={() => setIsDrawerOpen(true)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          {post?.comments?.length}
        </Button>
        <Button variant="ghost" size="sm" className="h-8 ml-auto">
          <Share2 className="h-4 w-4" />
        </Button>
      {isDrawerOpen &&<CommentDrawer
        isOpen={isDrawerOpen}
        key={post.id}
        onClose={() => setIsDrawerOpen(false)}
        postId={post?.id}
      />}
      </div>
    </Card>
  )
}