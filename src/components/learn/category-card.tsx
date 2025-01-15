import { Card } from "@/components/ui/card"
import Image from "next/image"

interface CategoryCardProps {
  name: string
  courses: number
  hours: string
  icon: string
}

export function CategoryCard({ name, courses, hours, icon }: CategoryCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <Image
        src={icon}
        alt=""
        width={40}
        height={40}
        className="mb-3 rounded"
      />
      <h3 className="font-medium mb-1">{name}</h3>
      <div className="text-sm text-gray-500">
        {courses} Courses • {hours}
      </div>
    </Card>
  )
}

