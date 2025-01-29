import { Card } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import Image from "next/image"

interface CourseProgressCardProps {
  title: string
  progress: number
  totalHours: number
  completedHours: number
  icon: string
}

export function CourseProgressCard({
  title,
  progress,
  totalHours,
  completedHours,
  icon
}: CourseProgressCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <Image
          src={icon}
          alt=""
          width={40}
          height={40}
          className="rounded"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-2 truncate">{title}</h3>
          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{completedHours} of {totalHours}h</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

