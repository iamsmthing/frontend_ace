import type { Problem } from "../../lib/types/problem"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { markAsComplete } from "../../lib/api/challenges"
import { useAuth } from "../../contexts/auth-context"
import { toast } from "sonner"
import { SubmitForReviewSidebar } from "./submit-for-review"

interface ProblemDescriptionProps {
  problem: Problem
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const {user}=useAuth();
  const userId=user?.id as string;
  const token=user?.token as string;
  const initialIsCompleted = problem.progress?.[0]?.isCompleted || false;
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted)
  



  const toggleCompletion = async() => {
    try {
       // Toggle local state immediately for a snappy UI
       const newStatus = !isCompleted;
       setIsCompleted(newStatus);
        // Make API call to update the server
      await markAsComplete(userId, problem.id, newStatus,token);
      toast.success("Challenge status updated");
    } catch (error) {
      console.error("Failed to update completion status:", error);
      toast.error("Failed to update completion status")
      // Revert the state in case of an error
      setIsCompleted((prev) => !prev);
      
    }

  }
  return (
    <div className="h-full border-r flex flex-col">
      <div className="p-4 border-b flex-grow overflow-auto">
        <h2 className="text-xl font-semibold mb-4">{problem.title}</h2>
        <pre className="text-primary whitespace-pre-wrap">
          {problem.description}
        </pre>
      </div>
      <div className="p-4  h-48 overflow-auto">
        <h3 className="font-medium mb-2">Hints:</h3>
        <ul className="list-disc list-inside space-y-2 text-primary">
          {problem.hints.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </div>
      <div className="p-4  mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Status: {isCompleted? 'Completed' : 'Not completed'}
          </span>
          {/* <Button onClick={toggleCompletion} variant="outline" className={isCompleted?`bg-green-500`:`bg-orange-500`}>
            {isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          </Button> */}
          <SubmitForReviewSidebar
          challengeId={problem.id}
          triggerButton={
            <Button variant="outline">Submit Challenge</Button>
          }
        />
        </div>
      </div>
    </div>
  )
}