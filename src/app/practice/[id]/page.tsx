"use client";
import { PracticeProblemClient } from "../../../components/practice/practice-problem-client";
import { notFound, usePathname, useRouter } from "next/navigation";
import { LoadingOverlay } from "../../../components/ui/loading-overlay";
import { useChallenge } from "../../../hooks/use-challenge";
import { useParams } from "next/navigation";
import { useAuth } from "../../../contexts/auth-context";
import { useEffect } from "react";
import { toast } from "sonner";

// Define the type of params
interface PracticeProblemProps {
  params: {
    id: string;
  };
}

export default function PracticeProblem() {
  // Ensure hooks are called directly in the function body
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();
  const userId = user?.id as string;
  const router = useRouter();
  const pathname = usePathname()
  const { problem, isLoading, error } = useChallenge(id, userId);
  console.log(problem)
  // Redirect to login page if no user is found
  useEffect(() => {
    if (!userId) {
      const redirectUrl = pathname;
      localStorage.setItem("lastVisited", redirectUrl);
      router.push(`/signin`);
      toast.error("Sign in to continue")
    }
  }, [userId, router]);
  if (!userId) {
    return <LoadingOverlay />;
  }
  if (error) {
    return notFound();
  }

  // Handle loading state
  if (isLoading) {
    return <LoadingOverlay />; // Show loading overlay while fetching data
  }

  // Handle problem not found state
  if (!problem) {
    return <div className="container mx-auto px-4 py-8">Problem not found</div>;
  }

  // Render PracticeProblemClient with the fetched problem
  return <PracticeProblemClient problem={problem} />;
}
