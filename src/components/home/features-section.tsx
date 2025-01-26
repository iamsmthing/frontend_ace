import { Card } from "../../components/ui/card"
import { Code2, BookOpen, MessageSquare } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Interactive Problems",
    description: "Practice with real-world coding challenges in your preferred framework"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Learning",
    description: "Access detailed explanations and best practices for each solution"
  },
  {
    icon: MessageSquare,
    title: "Community Discussion",
    description: "Engage with other developers and share different approaches"
  }
]

export function FeaturesSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center p-8 text-center h-full">
              <feature.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}