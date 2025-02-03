"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ProjectPost } from "../../components/feed/project-post";
import { feedData } from "../../lib/feed-data";
import {
  PlusCircle,
  TrendingUp,
  Clock,
  Star,
  HomeIcon,
  SparklesIcon,
  FileTextIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Textarea } from "../../components/ui/textarea";
import PostEditor from "../../components/feed/post-editor";
import { useAuth } from "../../contexts/auth-context";
import { LoadingOverlay } from "../../components/ui/loading-overlay";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadToCloudinary } from "../../lib/helpers/upload";
import { createPost, deletePost, fetchAllPosts, upvotePost } from "../../lib/api/posts";
import { usePosts } from "../../hooks/use-posts";

export default function FeedPage() {
  const [post, setPost] = useState<any>(feedData);
  const [sortBy, setSortBy] = useState("trending");
  const[ clearContent,setClearContent]=useState(false);
  const { user } = useAuth();
  const [isPosting, setIsPosting] = useState(false);
  const token = user?.token as string;
  const { posts: userPosts,setPosts,refetch, isLoading, error } = usePosts(token);
  const userId = user?.id;
  const router = useRouter();
  const pathname = usePathname();


  // Redirect to login page if no user is found
  useEffect(() => {
    if (!userId) {
      const redirectUrl = pathname;
      localStorage.setItem("lastVisited", redirectUrl);
      router.push(`/signin`);
      toast.error("Sign in to continue");
    }

   
  }, [userId, router]);

  if (isLoading||!userId) {
    return <LoadingOverlay />;
  }

  const handleUpvote = async(postId: string) => {

      const upvote=await upvotePost(userId,postId,token)
      if(upvote){
        await refetch();
        toast.success("Post upvoted successfully");
      }

    // setPosts(
    //   post.map((post: any) =>
    //     post.id === postId ? { ...post, upvotes: post?.upvotes! + 1 } : post
    //   )
    // );
  };

  const allTechnologies = Array.from(
    new Set(post.flatMap((post: any) => post.technologies))
  );

  // const filteredPosts = userPosts.filter(
  //   (post: any) =>
  //     selectedTech === "all" || post?.technologies!.includes(selectedTech)
  // );

  const handlePostSubmit = async (data: {
    title: string;
    content: string;
    images: string[];
  }) => {
    try {
      setIsPosting(true);
      const { title, images, content: description } = data;
      const uploadedUrl = await uploadToCloudinary(images);
      const newPost=await createPost(userId, title, description, uploadedUrl, user?.token);
      await refetch();
      if(newPost.length>0){

        toast.success('Post created successfully!');
        setIsPosting(false);
        setClearContent(true);
      }
    
    } catch (error) {
      toast.error('Failed to create post.');
      setIsPosting(false);
      setIsPosting(false);
    }
    finally{
      setIsPosting(false);
      setClearContent(false);
    }
  };


  const handleDeletePost = async (postId: string,token:string) => {
    try {  
       await deletePost(postId,token);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete post.');
    }
  };



  const RightSideBar=()=>{

    return (
    <div className="p-4">
    <div className="rounded-lg border p-4 mb-6">
      <h3 className="font-semibold mb-2">
        🌟 Today's Most Upvoted Post!
      </h3>
      <div className="rounded-lg overflow-hidden mb-2">
      </div>
      <h4 className="font-medium">Featured Post</h4>
      <p className="text-sm text-muted-foreground">
        Post description goes here
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-4">Active Discussions</h3>
      <div className="space-y-4">{/* Add discussion items here */}</div>
    </div>
  </div>
    )
  }

  const LeftSidebar=()=>{
    return (
      <div className="p-4">
      <nav className="space-y-4">
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
          <HomeIcon className="h-5 w-5" />
          <span>Scroll</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
          <SparklesIcon className="h-5 w-5" />
          <span>Spotlight</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
          <FileTextIcon className="h-5 w-5" />
          <span>Articles</span>
        </div>
      </nav>
    </div>
    )
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_300px] h-screen bg-background">
      {/* Left Sidebar */}
      <ScrollArea className="hidden md:block h-screen border-r">
        <LeftSidebar/>
      </ScrollArea>

      {/* Main Feed */}
      <ScrollArea className="h-[calc(100vh-4rem)] md:h-screen">
        <div className="p-4 max-w-3xl mx-auto">
          <div className="stop-0 bg-background z-10 pb-4 space-y-4">
            <div className="flex items-center gap-4">
              {/* <Textarea rows={5} placeholder="What are you building..?" className="flex-1" />
              <Button variant="default">Post</Button> */}

              <PostEditor
                onSubmit={handlePostSubmit}
                isLoading={isPosting}
                clearContent={clearContent}
              />
            </div>

            <div className="flex gap-4">
              <Button variant={sortBy === "newest" ? "default" : "ghost"}>
                NEWEST
              </Button>
              <Button variant={sortBy === "trending" ? "default" : "ghost"}>
                TRENDING
              </Button>
              <Button variant={sortBy === "following" ? "default" : "ghost"}>
                FOLLOWING
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            {userPosts.map((post: any,index:any) => (
              <ProjectPost
               onDelete={()=>handleDeletePost(post.id,token)}
                key={post.id || index}
                post={post}
                onUpvote={() => handleUpvote(post.id)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Right Sidebar */}
      <ScrollArea className="hidden lg:block h-screen border-l">
        <RightSideBar/>
      </ScrollArea>
      
    </div>
  );
}
