"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import ReviewForm from './review-form'
import { Task, Review } from '../../lib/types/peer-review';
import { useRouter } from 'next/navigation'
import { usePendingReview } from '@/hooks/use-pending-review'
import { useAuth } from '@/contexts/auth-context'
import { calculatePercentage, getSubstring } from '@/lib/helpers/util-functions'
import { LoadingOverlay } from '../ui/loading-overlay'
import { toast } from 'sonner'
import Image from 'next/image'

// const initialTasks: Task[] = [
//     {
//         id: '1',
//         title: "Redesign Landing Page",
//         description: "Complete redesign of our company's landing page",
//         assignee: "Alice Johnson",
//         avatarUrl: "/placeholder.svg?height=40&width=40",
//         status: "Pending Review",
//         progress: 75,
//         screenshot: "https://res.cloudinary.com/dtzsujhps/image/upload/v1737098984/j8nerxgoz7vh56o02vmm.webp",
//         code: `
//     import React from 'react';
    
//     const LandingPage = () => {
//       return (
//         <div className="landing-page">
//           <header>
//             <h1>Welcome to Our Company</h1>
//             <nav>{/* Navigation items */}</nav>
//           </header>
//           <main>
//             <section className="hero">
//               <h2>Transform Your Business with Our Solutions</h2>
//               <button>Get Started</button>
//             </section>
//             {/* More sections */}
//           </main>
//           <footer>{/* Footer content */}</footer>
//         </div>
//       );
//     };
    
//     export default LandingPage;
//         `
//       },
//       {
//         id: '2',
//         title: "Implement User Authentication",
//         description: "Add secure user authentication to the platform",
//         assignee: "Bob Smith",
//         avatarUrl: "/placeholder.svg?height=40&width=40",
//         status: "Pending Review",
//         progress: 50,
//         screenshot: "/placeholder.svg?height=300&width=500",
//         code: `
//     import { useState } from 'react';
//     import { signIn } from 'next-auth/react';
    
//     const LoginForm = () => {
//       const [email, setEmail] = useState('');
//       const [password, setPassword] = useState('');
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         await signIn('credentials', { email, password });
//       };
    
//       return (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />
//           <button type="submit">Log In</button>
//         </form>
//       );
//     };
    
//     export default LoginForm;
//         `
//       },
//       {
//         id: '3',
//         title: "Optimize Database Queries",
//         description: "Improve performance of key database queries",
//         assignee: "Charlie Brown",
//         avatarUrl: "/placeholder.svg?height=40&width=40",
//         status: "Approved",
//         progress: 100,
//         screenshot: "/placeholder.svg?height=300&width=500",
//         code: `
    
    
//     async function getUsers() {
//       const client = await pool.connect();
//       try {
//         const result = await client.query('SELECT * FROM users WHERE active = true');
//         return result.rows;
//       } finally {
//         client.release();
//       }
//     }
    
//     async function getUserPosts(userId) {
//       const client = await pool.connect();
//       try {
//         const result = await client.query(
//           'SELECT p.* FROM posts p JOIN users u ON p.user_id = u.id WHERE u.id = $1',
//           [userId]
//         );
//         return result.rows;
//       } finally {
//         client.release();
//       }
//     }
    
//     module.exports = { getUsers, getUserPosts };
//         `
//       },
// ]
// Interface for the Challenge Data





export default function PeerReviewsList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const {user}=useAuth();
  const userId=user?.id as string;
  const router=useRouter();
  const {pendingReviews,isLoading,error}=usePendingReview(user?.token as string)
  console.log(pendingReviews);
  const handleNavigation=(id:string)=>{
    router.push(`/peer-review/${id}`);
  }

  const handleReviewSubmit = (review: Review) => {
    setTasks(tasks.map(task => 
      task.id === selectedTask?.id 
        ? { ...task, status: review.approved ? "Approved" : "Needs Improvement" }
        : task
    ))
    setSelectedTask(null)
  }

  useEffect(() => {
    if (!userId) {
      // const redirectUrl = pathname;
      // localStorage.setItem("lastVisited", redirectUrl);
      router.push(`/signin`);
      toast.error("Sign in to continue");
    }
  }, [userId, router]);
    // Handle loading state
    if (isLoading ||!userId) {
      return <LoadingOverlay />; // Show loading overlay while fetching data
    }

     if(pendingReviews?.length==0){
      return <div className='flex items-center justify-center h-[50vh]'>No pending reviews</div>;
     }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pendingReviews?.map((item) => (
        <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold">{item?.challenge?.title}</CardTitle>
              <Badge variant={item.isCompleted === true ? "default" : "destructive"}>
                {item.isCompleted?"Approved":"Pending"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="relative w-full h-[200px] rounded-md overflow-hidden border">
                          {item?.imageUrl?<Image
                            src={item?.imageUrl || "/placeholder.svg"}
                            alt={`Screenshot for ${item.challenge.title}`}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-110 transition-transform duration-1000"
                          />:<div className='flex items-center justify-center h-full'>No image</div>}
                        </div>
            <p className="text-sm text-muted-foreground">{getSubstring(item?.challenge?.description,40)}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{calculatePercentage(item.peerReviews.length)}%</span>
              </div>
              <Progress value={calculatePercentage(item.peerReviews.length)|| 0} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={item?.user?.imageUrl} alt={item.user?.username} />
                  <AvatarFallback>{item.user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{item.user.username}</span>
              </div>
              {!item.isCompleted && (
                <Button onClick={()=>handleNavigation(item.id)} size="sm">Review</Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      {/* {selectedTask && (
        <ReviewForm task={selectedTask} onSubmit={handleReviewSubmit} onCancel={() => setSelectedTask(null)} />
      )} */}
    </div>
  )
}
