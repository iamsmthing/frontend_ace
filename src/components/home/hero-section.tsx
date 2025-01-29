import { Button } from "../../components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="max-w-[800px] mx-auto text-center space-y-8">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
          🚀 Just launched Beta
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Pratice on Tech Specific Problems to Learn and Showcase
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          A platform to practice problems and build scalable frontend systems, guided by senior engineers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="min-w-[200px]">
            <Link href="/practice">
              Explore Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="min-w-[200px]">
            <Link href="/learn">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}