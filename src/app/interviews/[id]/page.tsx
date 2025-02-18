'use client'
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QuestionList } from "@/components/interviews/questions-list"
import { useParams } from "next/navigation"



export default function ChallengesPage() {
  const params = useParams();
    const id = params.id as string;
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="mb-8 rounded-2xl  p-6 backdrop-blur-xl">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 " />
            <input
              className="w-full rounded-xl border border-purple-500/20  px-12 py-3  outline-none transition-all  focus:border-purple-500/50 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20"
              placeholder="Search challenges..."
              type="search"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className=" hover:bg-purple-500/30">JavaScript functions</Badge>
            <Badge className=" hover:bg-blue-500/30">User interface coding</Badge>
            <Badge className=" hover:bg-emerald-500/30">System design</Badge>
            <Badge className=" hover:bg-pink-500/30">Quiz</Badge>
            <div className="ml-auto">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="border-purple-500/20 ">
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <QuestionList id={id}/>
          <aside className="space-y-6">
            <Card className="border-purple-500/20  p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold ">Topics</h2>
              <div className="space-y-3">
                {topics.map((topic) => (
                  <div key={topic} className="flex items-center space-x-3">
                    <Checkbox
                      id={topic}
                      className="border-purple-500/30 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500"
                    />
                    <label htmlFor={topic} className="text-sm ">
                      {topic}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="border-purple-500/20 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold ">Companies</h2>
              <div className="space-y-3">
                {companies.map((company) => (
                  <div key={company} className="flex items-center space-x-3">
                    <Checkbox
                      id={company}
                      className="border-purple-500/30 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500"
                    />
                    <label htmlFor={company} className="text-sm ">
                      {company}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}

const topics = ["JavaScript", "HTML", "CSS", "React", "System Design", "Data Structures", "Algorithms"]

const companies = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Uber"]

