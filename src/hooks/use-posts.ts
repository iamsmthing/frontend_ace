import { useState, useEffect, useCallback } from "react";
import { fetchAllPosts } from "../lib/api/posts";
import { PostProject } from "../lib/types/project";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export function usePosts(token: string) {
  const [posts, setPosts] = useState<PostProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null |string>(null);
  const pathname=usePathname();
  const router=useRouter();
  const {logout}=useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      console.log("called")
      setIsLoading(true);
      const data = await fetchAllPosts(token);
      if(data.status==401){
        logout();
      const redirectUrl = pathname;
      localStorage.setItem("lastVisited", redirectUrl);
      router.push(`/signin`);
      toast.error("Token Expired!Sign to continue.");
      }
      setPosts(data);
    } catch (err:any) {
      console.log(err)
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
