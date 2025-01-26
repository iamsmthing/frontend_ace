"use client";

import { useState, useEffect } from 'react';
import { getPeer, getPendingReviews } from '../lib/api/peer';

// Interface for the Challenge Data
export interface Challenge {
    id: string;
    title: string;
    difficulty: string;
    category: string;
    description: string;
    hints: string[];
    score: number;
  }
  
  // Interface for the User Data
  export interface User {
    username: string;
    imageUrl: string;
  }
  
  // Interface for the Peer Review (if applicable)
  export interface PeerReview {
    reviewerId: string;
    feedback: string;
    rating: number;
  }
  
  // Main Interface for the Challenge Submission
  export interface ChallengeSubmission {
    id: string;
    userId: string;
    challengeId: string;
    isCompleted: boolean;
    completedAt: string | null; // Can be null if not completed
    updatedAt: string;
    code: string | null; // Can be null if no code is submitted
    imageUrl: string | null; // Can be null if no image is provided
    challenge: Challenge;
    user: User;
    peerReviews: PeerReview[]; // Array of peer reviews (empty if no reviews)
  }
  

export function usePendingReview(id: string) {
  const [pendingReviews, setPendingReviews] = useState<ChallengeSubmission[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null|number>(null);

  useEffect(() => {
    async function fetchPendingReviews() {
      try {
        setIsLoading(true);
        // const data = await getProject(id);
        const data=await getPendingReviews(id);
        if(!data){
          setPendingReviews([]);
          setIsLoading(false);
        }
        setPendingReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch reviews'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPendingReviews();
  }, [id]);

  return { pendingReviews, isLoading, error };
}