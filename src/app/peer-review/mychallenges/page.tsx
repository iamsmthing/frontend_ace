"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/auth-context";
import {
  calculatePercentage,
  getSubstring,
} from "../../../lib/helpers/util-functions";
import { toast } from "sonner";
import Image from "next/image";
import { Review, Task } from "../../../lib/types/peer-review";
import { LoadingOverlay } from "../../../components/ui/loading-overlay";
import { useMyChallengeStatus } from "../../../hooks/use-mychallengeStatus";

export default function PeerReviewsList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { user } = useAuth();
  const userId = user?.id as string;
  const router = useRouter();
  const { myReviews, isLoading, error } = useMyChallengeStatus(
    user?.token as string
  );
  console.log(myReviews)
  const handleNavigation = (id: string) => {
    router.push(`/peer-review/${id}`);
  };

  const handleReviewSubmit = (review: Review) => {
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask?.id
          ? {
              ...task,
              status: review.approved ? "Approved" : "Needs Improvement",
            }
          : task
      )
    );
    setSelectedTask(null);
  };

  useEffect(() => {
    if (!userId) {
      // const redirectUrl = pathname;
      // localStorage.setItem("lastVisited", redirectUrl);
      router.push(`/signin`);
      toast.error("Sign in to continue");
    }
  }, [userId, router]);
  // Handle loading state
  if (isLoading || !userId) {
    return <LoadingOverlay />; // Show loading overlay while fetching data
  }

  if (myReviews?.length == 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        No pending reviews
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
        <h1 className="px-2 mb-2 text-xl">My Challenges</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {myReviews?.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden transition-shadow hover:shadow-lg"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">
                  {item?.challenge?.title}
                </CardTitle>
                <Badge
                  variant={
                    item.isCompleted === true ? "default" : "destructive"
                  }
                >
                  {item.isCompleted ? "Approved" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative w-full h-[200px] rounded-md overflow-hidden border">
                {item?.imageUrl ? (
                  <Image
                    src={item?.imageUrl || "/placeholder.svg"}
                    alt={`Screenshot for ${item.challenge.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-110 transition-transform duration-1000"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    No image
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {getSubstring(item?.challenge?.description, 40)}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{calculatePercentage(item.peerReviews.length)}%</span>
                </div>
                <Progress
                  value={calculatePercentage(item.peerReviews.length) || 0}
                  className="h-2"
                />
              </div>
              <div className="flex items-center justify-between">
                {!item.isCompleted && (
                  <Button onClick={() => handleNavigation(item.id)} size="sm">
                    Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {/* {selectedTask && (
        <ReviewForm task={selectedTask} onSubmit={handleReviewSubmit} onCancel={() => setSelectedTask(null)} />
      )} */}
      </div>
    </div>
  );
}
