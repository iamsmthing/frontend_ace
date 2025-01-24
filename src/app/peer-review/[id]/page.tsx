"use client"

import { useState } from "react"
import { useRouter,useParams, notFound } from "next/navigation"
import ProjectPageClient from "@/components/projects/project-page-client"
import { useAuth } from "@/contexts/auth-context"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { usePeerData } from "@/hooks/use-peer"
import ReviewForm from "@/components/peerReview/review-form"

export default function ProjectGuidePage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();
  const userId = user?.id as string;
  const token =user?.token as string;
  const { peerData, isLoading, error } = usePeerData(id,token);
  console.log(peerData)
  if (!userId) {
    return <LoadingOverlay />;
  }
  // Handle loading state
  if (isLoading) {
    return <LoadingOverlay />; // Show loading overlay while fetching data
  }

  // Handle problem not found state
  if (!peerData) {
    return <div className="container mx-auto px-4 py-8">Problem nott found</div>;
  }
  

  return <ReviewForm task={peerData}/>
  
}

