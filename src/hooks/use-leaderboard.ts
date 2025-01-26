import { useState, useEffect, useCallback } from "react";
import { fetchAllPosts, getAllComments } from "@/lib/api/posts";
import { PostProject } from "@/lib/types/project";
import { Comments } from "@/components/feed/comment-drawer";
import { LeaderboardUser } from "@/components/leaderboard/leaderboard";
import { getLeaderboard } from "@/lib/api/challenges";

export function useLeaderboard(token: string) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      console.log("called")
      setIsLoading(true);
      const data = await getLeaderboard(token);
      setLeaderboard(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
        fetchLeaderboard();
    }
  }, [token, fetchLeaderboard]);

  return { leaderboard, setLeaderboard, isLoading, error, refetch: fetchLeaderboard };
}
