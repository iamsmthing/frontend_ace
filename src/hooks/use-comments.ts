import { useState, useEffect, useCallback } from "react";
import { fetchAllPosts, getAllComments } from "../lib/api/posts";
import { Comments } from "../components/feed/comment-drawer";

export function useComments(token: string,postId:string) {
  const [comments, setComments] = useState<Comments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      console.log("called")
      setIsLoading(true);
      const data = await getAllComments(token,postId);
      setComments(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchComments();
    }
  }, [token, fetchComments]);

  return { comments, setComments, isLoading, error, refetch: fetchComments };
}
