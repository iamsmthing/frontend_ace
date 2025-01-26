"use client";

import { useState, useEffect } from 'react';
import { Problem } from '../lib/types/problem';
import { getChallenge } from '../lib/api/challenges';

export function useChallenge(id: string,userId:string) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null|number>(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        setIsLoading(true);
        if(!userId){
          setError(401);
          return;
        }
        const data = await getChallenge(id,userId);
        setProblem(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch problem'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProblem();
  }, [id]);

  return { problem, isLoading, error };
}