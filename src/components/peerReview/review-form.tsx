"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Task } from '../../lib/types/peer-review'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { ChallengeSubmission } from '@/hooks/use-pending-review'
import { submitPeerReview } from '@/lib/api/peer'
import { useAuth } from '@/contexts/auth-context'
import { toast } from 'sonner'

interface ReviewFormProps {
  task: ChallengeSubmission
}

export default function ReviewForm({ task }: ReviewFormProps) {
  const [comments, setComments] = useState('')
  const [approved, setApproved] = useState<boolean | null>(null)
  const [isImageOpen, setIsImageOpen] = useState(false);
  const {user}=useAuth();
  const userId=user?.id as string;
  const token =user?.token as string;

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // TO DO: implement form submission logic
    const data={
    reviewerId:userId,
    userProgressId: task.id,
    challengeId: task.challengeId,
    comment: comments,
    isApproved: approved
    }

    console.log(data)
    const newSubmit=await submitPeerReview(token,data);
    
    if(!newSubmit.error){
      toast.success("Peer review submitted");
    }
    else{
      if(newSubmit.error){
        toast.error(newSubmit.error);
      }
      else{

        toast.error("Failed to submit peer review");
      }
    }
  }

  const openImage=()=>{
    setIsImageOpen(true)

  }

  return (
    <div className="w-[80vw] h-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Review : {task.challenge.title}</h1>
      <Tabs defaultValue="screenshot" className="w-full h-full flex flex-col">
        <TabsList className="w-fit justify-start mb-4">
          <TabsTrigger value="screenshot">Screenshot</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <div className="flex-grow overflow-hidden ">
          <TabsContent value="screenshot" className="h-[60vh] ">
            <div className="relative w-full h-full border rounded-md">
              <Image
              onClick={openImage}
                src={task.imageUrl || "/placeholder.svg"}
                alt={`Screenshot for ${task.challenge.title}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </TabsContent>
          <TabsContent value="code" className="h-full">
            <ScrollArea className="h-full rounded-md border p-4 ">
              <pre className="text-sm whitespace-pre-wrap">{task.code}</pre>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="comments" className="text-base font-semibold">Comments</Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your review comments here..."
            className="min-h-[100px] resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-base font-semibold">Approval</Label>
          <RadioGroup value={approved === null ? undefined : approved.toString()} onValueChange={(value) => setApproved(value === 'true')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="approve" />
              <Label htmlFor="approve">Approve</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="reject" />
              <Label htmlFor="reject">Needs Improvement</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex space-x-4 mt-4">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" disabled={approved === null}>Submit Review</Button>
        </div>
      </form>
      {/* Image Popup Dialog */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogTitle> </DialogTitle>
        <DialogContent className='w-[100vw] h-auto p-0'>
          <Image
            src={task.imageUrl || "/placeholder.svg"}
            alt={`Screenshot for ${task.challenge.title}`}
            width={2000}
            height={1000}
            className="w-full h-auto rounded-md cover"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
