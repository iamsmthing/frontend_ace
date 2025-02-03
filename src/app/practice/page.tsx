import { ChevronRight } from "lucide-react"
import ProblemsPage from "../../components/practice/problem-card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { problems } from "../../lib/problems"
import Link from "next/link"


export default function PracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" flex flex-col sm:flex-row gap-2 items-center  justify-between">
      <h1 className="text-3xl font-bold">Practice Challenges</h1>
      <Link className="flex border items-center content-center p-2 rounded-lg" href='/peer-review'>Peer Review Challenges<ChevronRight className="h-5 w-5 animate-bounce-horizontal"/></Link>
      </div>
      
      <div className="grid gap-6">
          <ProblemsPage  />
      </div>
    </div>
  )
}