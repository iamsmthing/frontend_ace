"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2 } from "lucide-react"
import { LoadingOverlay } from "../ui/loading-overlay"
import { useAuth } from "@/contexts/auth-context"
import { Leaderboard } from "../leaderboard/leaderboard"
import Link from "next/link"

type Difficulty = "Easy" | "Medium" | "Hard";

type Progress = {
  id: string;
  userId: string;
  challengeId: string;
  isCompleted: boolean;
  completedAt: string;
  updatedAt: string;
};
type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  hints?: string[];
  progress?:Progress[]
}

const truncate = (input: string, length: number) => {
  return input.length > length ? `${input.substring(0, length)}...` : input;
};


const difficultyColors:Record<Difficulty, string> = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-red-500",
}

export default function ProblemsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true);
  const [problems, setProblems] = useState<Problem[]>([])
  const {user}=useAuth();

  useEffect(() => {
    async function fetchChallenges() {
      try {
        console.log(user?.id)
        const response:any = !user?await fetch("/api/getChallenges"):await fetch('/api/v1/api/getChallengesForUser', {
          method: "POST",
          headers: { "Content-Type": "application/json","Authorization": `Bearer ${user?.token}` },
          body: JSON.stringify({userID:user?.id}),
        })
        const data = await response.json()
        setProblems(data.problems || [])
      } catch (error) {
        console.error("Failed to fetch challenges:", error)
      }
      finally{
        setIsLoading(false);
      }
    }
    fetchChallenges()
  }, [])

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-8">
        <Input
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-[300px]"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="React">React</SelectItem>
            <SelectItem value="Vue">Vue</SelectItem>
            <SelectItem value="Next.js">Next.js</SelectItem>
            <SelectItem value="Angular">Angular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProblems.map((problem) => (
          <Card key={problem.id} className="p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">{problem.title}</h3>
          {problem.progress?.some(p => p.isCompleted) && (
            <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Completed" />
          )}
        </div>
        <Badge variant="secondary">{problem.category}</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {truncate(problem.description, 70)}
      </p>
      <div className="flex items-center justify-between">
        <Badge className={difficultyColors[problem.difficulty]}>
          {problem.difficulty}
        </Badge>
        <a 
          href={`/practice/${problem.id}`} 
          className="text-sm text-primary hover:underline"
        >
          {problem.progress?.some(p => p.isCompleted)? 'Review Solution →' : 'Solve Challenge →'}
        </a>
      </div>
    </Card>
        ))}
      </div> */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {filteredProblems.map((problem) => (
          <Card key={problem.id} className="p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">{problem.title}</h3>
          {problem.progress?.some(p => p.isCompleted) && (
            <CheckCircle2 className="h-5 w-5 text-green-500" aria-label="Completed" />
          )}
        </div>
        <Badge variant="secondary">{problem.category}</Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        {truncate(problem.description, 70)}
      </p>
      <div className="flex items-center justify-between">
        <Badge className={difficultyColors[problem.difficulty]}>
          {problem.difficulty}
        </Badge>
        <Link 
          href={`/practice/${problem.id}`} 
          className="text-sm text-primary hover:underline"
        >
          {problem.progress?.some(p => p.isCompleted)? 'Review Solution →' : 'Solve Challenge →'}
        </Link>
      </div>
    </Card>
        ))}
      </div> 
        </div>

        <div className="lg:w-[350px] flex-shrink-0">
          <div className="sticky top-[5rem]">
            <Leaderboard />
          </div>
        </div>
      </div>
   
    </div>
  )
}