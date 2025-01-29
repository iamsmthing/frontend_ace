'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet"
import { ScrollArea } from "../../components/ui/scroll-area"
import { X } from 'lucide-react'
import { uploadToCloudinary } from '../../lib/helpers/upload'
import { submitChallengeForReview } from '../../lib/api/peer'
import { useAuth } from '../../contexts/auth-context'
import { toast } from 'sonner'

interface SubmitForReviewSidebarProps {
  triggerButton?: React.ReactNode;
  challengeId:string
}

export function SubmitForReviewSidebar({ triggerButton,challengeId }: SubmitForReviewSidebarProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images,setImages]=useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const {user}=useAuth();
  const userId=user?.id as string;
  const token=user?.token as string;
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // const formData = new FormData(event.currentTarget)

    const uploadedUrl = await uploadToCloudinary(images);
    const formData={
        userId,
        challengeId:challengeId,
        code:code,
        imageUrl:uploadedUrl
    }
    console.log(formData)
    const result = await submitChallengeForReview(token,formData);
    console.log(result)
    setIsSubmitting(false)
    setOpen(false)
    
    if (result) {
      toast.success("Challenged submitted for review")
    } else {
      toast.error("Failed to submit challenge")
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setPreviewImage(reader.result as string)
        setImages([imageUrl])
        
      }
      console.log(file)
      reader.readAsDataURL(file)
    }
  }


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setImages([...images, imageUrl])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {triggerButton || <Button variant="outline">Submit Challenge</Button>}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Submit Challenge for Peer Review</SheetTitle>
          <SheetDescription>
            Note:A Particular Challenge will be marked as Completed only when at least three peer reviewers have approved it. 
            Upload a screenshot and paste your code to submit your challenge for peers to review. Once approved you'll get your challenge score.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="screenshot">Screenshot</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="screenshot" 
                name="screenshot" 
                type="file" 
                accept="image/*" 
                required 
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              {previewImage && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleRemoveImage}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {previewImage && (
              <div className="mt-2 max-h-[200px] overflow-hidden relative">
                <Image 
                  src={previewImage || "/placeholder.svg"} 
                  alt="Preview" 
                  width={300} 
                  height={200} 
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="code">Code</Label>
            <ScrollArea className="h-[300px] w-full rounded-md border">
              <Textarea 
                id="code" 
                name="code" 
                placeholder="Paste your code here" 
                required 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="font-mono min-h-[300px] border-none"
              />
            </ScrollArea>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

