import { PostProject, UserPost } from "../../lib/types/project";





export async function createPost(userId:string,title:string,description:string,imageUrl:string,token:string):Promise<UserPost[]>{
  const response=await fetch('/api/v1/api/post/createPost',{
    method: "POST",
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
    body: JSON.stringify({userId,title,description,imageUrl}),
  });
  if(!response.ok){
    throw new Error('failed to fetch problems');
  }
  return response.json();
}


export async function deletePost(id: string,token:string): Promise<UserPost> {
  const response = await fetch(`/api/v1/api/post/deletePost/${id}`,{
    method: "DELETE",
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch problem');
  }
  console.log(response)
  return response.json();
}
export async function fetchAllPosts(token:string):Promise<any>{
    const response=await fetch('/api/v1/api/post/fetchAllPosts',{
      method: "GET",
      headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
    });
    if(response.status===401){
      return {message:"JWT Expired",status:'401'};
    }
    if(!response.ok){
      throw new Error('failed to fetch posts');
    }
    return response.json();
  }


export const upvotePost=async(userId:string,postId:string,token:string)=>{
    
  const response=await fetch('/api/v1/api/post/upvote',{
    method: "POST",
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
    body: JSON.stringify({userId,postId}),
  });
  if(!response.ok){
    throw new Error('failed to upvote the post');
  }
  return response.json();
}


export async function getAllComments (token:string,id:string):Promise<any>{
  const response=await fetch(`/api/v1/api/post/comments/${id}`,{
    method: "GET",
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
  });
  if(!response.ok){
    throw new Error('failed to fetch posts');
  }
  return response.json();
}

export const createComment=async(token:string,userId:string,postId:string,content:string,parentCommentId?:string|null)=>{
  const response=await fetch('/api/v1/api/post/comments',{
    method: "POST",
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
    body: JSON.stringify({userId,postId,content,parentCommentId})
  })
  if(!response.ok){
    throw new Error('failed to fetch posts');
  }
  return response.json();
}
