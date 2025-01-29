import { useState, useEffect, useCallback } from "react";
import { fetchAllPosts } from "../lib/api/posts";
import { PostProject } from "../lib/types/project";

export function usePosts(token: string) {
  const [posts, setPosts] = useState<PostProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      console.log("called")
      setIsLoading(true);
      const data = await fetchAllPosts(token);
      setPosts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token, fetchPosts]);

  return { posts, setPosts, isLoading, error, refetch: fetchPosts };
}
