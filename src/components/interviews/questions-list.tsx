import Link from "next/link"
import { ChevronRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function QuestionList({id}:{id:string}) {
  return (
    <div className="flex flex-col gap space-y-4 ">
      {questions.map((question) => (
        <Link key={question.id} href={`/interviews/${id}/${question.slug}`}>
          <Card className="group relative overflow-hidden border-purple-500/20  p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)] hover:backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-sm font-semibold ">
                    {question.number}
                  </span>
                  <h3 className="text-lg font-semibold ">{question.title}</h3>
                  {question.isPro && <Star className="h-5 w-5 text-amber-400 fill-amber-400" />}
                </div>
                <p className="text-sm ">{question.description}</p>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className={cn(
                        "rounded-lg px-3 py-1 text-xs font-medium",
                        tag === "Easy" && " hover:bg-emerald-500/30",
                        tag === "Medium" && " hover:bg-amber-500/30",
                        tag === "Hard" && " hover:bg-rose-500/30",
                        tag === "JS functions" && " hover:bg-blue-500/30",
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

const questions = [
  {
    id: 1,
    number: 1,
    title: "Debounce",
    slug: "debounce",
    description:
      "Implement a function to limit how many times a function can be executed by delaying the execution of the function until after a specified time after its last execution attempt",
    tags: ["JS functions", "Medium"],
    isPro: true,
  },
  {
    id: 2,
    number: 2,
    title: "Array.prototype.reduce",
    slug: "array-prototype-reduce",
    description: "Implement the Array.prototype.reduce() method",
    tags: ["JS functions", "Easy"],
    isPro: false,
  },
  {
    id: 3,
    number: 3,
    title: "Classnames",
    slug: "classnames",
    description: "Implement a function that conditionally joins CSS class names together",
    tags: ["JS functions", "Medium"],
    isPro: true,
  },
]

