import { Card } from "../../components/ui/card"
import { ChevronRight } from 'lucide-react'

interface FocusAreaCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  questions: string
}

export function FocusAreaCard({ icon: Icon, title, questions }: FocusAreaCardProps) {
  return (
    <Card className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Icon className="h-8 w-8" />
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{questions}</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  )
}

