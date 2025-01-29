import ProblemsPage from "../../components/practice/problem-card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { problems } from "../../lib/problems"
import Link from "next/link"


export default function PracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Practice Challenges</h1>
      <Button><Link href='/peer-review'>Peer Review</Link></Button>
      </div>
      
      <div className="grid gap-6">
          <ProblemsPage  />
      </div>
    </div>
  )
}