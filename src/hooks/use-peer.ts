"use client";

import { useState, useEffect } from 'react';
import { getPeer } from '../lib/api/peer';

export function usePeerData(id: string,token:string) {
  const [peerData, setPeerData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null|number>(null);

  useEffect(() => {
    async function fetchPeerData() {
      try {
        setIsLoading(true);
        // const data = await getProject(id);
        const data=await getPeer(id,token);
        console.log(data)
        setPeerData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch problem'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPeerData();
  }, [id]);

  return { peerData, isLoading, error };
}