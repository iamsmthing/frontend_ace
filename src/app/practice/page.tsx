import ProblemsPage from "@/components/practice/problem-card"
import { problems } from "@/lib/problems"


export default function PracticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Practice Problems</h1>
      
      <div className="grid gap-6">
        
          <ProblemsPage  />
       
      </div>
    </div>
  )
}