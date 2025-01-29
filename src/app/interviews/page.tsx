import { Card } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { ChevronRight,Zap, Star, Accessibility, FileCode, FormInput, Grid, Library, RefreshCw } from 'lucide-react'
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { ScrollArea } from "../../components/ui/scroll-area"
import { LayoutGrid, BookOpen, Code2, Clock, BookMarked, Menu } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">

      <div className="flex h-[100vh]">
        {/* Sidebar */}
        <aside className="w-60 border-r flex-shrink-0">
          <div className="h-full py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground bg-accent/50"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="space-y-1">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                  >
                    <BookOpen className="h-4 w-4" />
                    Practice questions
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground pl-10"
                  >
                    All practice questions
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground pl-10"
                  >
                    Framework / Languages
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground pl-10"
                  >
                    Question formats
                  </Link>
                </div>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Code2 className="h-4 w-4" />
                  Recommended strategy
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Clock className="h-4 w-4" />
                  Time-savers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <BookMarked className="h-4 w-4" />
                  Guides
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto">
          <ScrollArea className="h-full">
          <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-16">
      {/* Continue Learning Section */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Continue learning</h2>
        </div>
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Front End Interview Playbook</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 mr-2" />
                2/10 articles
              </div>
            </div>
            <Button>Resume</Button>
          </div>
          <Progress value={20} className="mt-4" />
        </Card>
      </section>

      {/* Recommended Preparation */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Recommended preparation</h2>
          <p className="text-muted-foreground">
            Not sure where to start? This preparation roadmap has been proven to work for most of our users.
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              number: "1",
              title: "Front End Interview Playbook",
              description: "A starter guide to preparing for front end interviews",
              progress: "2/10 articles"
            },
            {
              number: "2",
              title: "GFE 75",
              description: "The 75 most important front end interview questions. Covers a wide range of interview patterns and formats.",
              progress: "0/70 questions"
            },
            {
              number: "3",
              title: "Blind 75",
              badge: "if you expect DSA questions",
              description: "The famed list of questions commonly used to prepare for standard data structures and algorithms style software engineering interviews. Solved in JavaScript / TypeScript for front end engineers.",
              progress: "0/75 questions"
            }
          ].map((item) => (
            <Card 
              key={item.title} 
              className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {item.number}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.badge && (
                      <span className="rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs text-yellow-500">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {item.progress}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Study Plans */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Study plans</h2>
          <p className="text-muted-foreground">
            Prepare the best you can within any timeline.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "1 Week",
              description: "Efficiently focus on the most important concepts through a good mix of coding and quiz questions.",
              questions: "51 questions",
              time: "2 hours daily"
            },
            {
              icon: Star,
              title: "1 Month",
              description: "All rounded coverage that is sure to bring your front end interview skills to the next level.",
              questions: "107 questions",
              time: "6 hours weekly"
            },
            {
              icon: Star,
              title: "3 Months",
              description: "With over 140 questions, this is the most complete all-in-one front end interview preparation you can ever dream of.",
              questions: "280 questions",
              time: "3 hours weekly"
            }
          ].map((plan) => (
            <Card 
              key={plan.title} 
              className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className="space-y-4">
                <plan.icon className="h-8 w-8" />
                <h3 className="font-semibold">{plan.title}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {plan.questions}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {plan.time}
                  </div>
                </div>
              </div>
              {/* <ChevronRight className="h-5 w-5 text-muted-foreground absolute right-6 top-1/2 -translate-y-1/2 group-hover:translate-x-1 transition-transform" /> */}
            </Card>
          ))}
        </div>
      </section>

      {/* Frameworks and Languages */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Frameworks and languages</h2>
          <p className="text-muted-foreground">
            Targeted practice in specific front end frameworks and languages.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: "/js-logo.png",
              title: "JavaScript",
              badge: "TypeScript supported",
              questions: "3/443 questions",
              progress: 20
            },
            {
              icon: "/react-logo.png",
              title: "React",
              questions: "1/58 questions",
              progress: 15
            },
            {
              icon: "/angular-logo.png",
              title: "Angular",
              questions: "1/32 questions",
              progress: 10
            },
            {
              icon: "/vue-logo.png",
              title: "Vue",
              questions: "1/31 questions",
              progress: 10
            },
            {
              icon: "/svelte-logo.png",
              title: "Svelte",
              questions: "1/28 questions",
              progress: 5
            },
            {
              icon: "/css-logo.png",
              title: "CSS",
              questions: "1/74 questions",
              progress: 8
            },
            {
              icon: "/html-logo.png",
              title: "HTML",
              questions: "1/90 questions",
              progress: 12
            },
            {
              icon: "/ts-logo.png",
              title: "TypeScript",
              questions: "2/192 questions",
              progress: 25
            }
          ].map((framework) => (
            <Card 
              key={framework.title} 
              className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-lg overflow-hidden bg-background">
                    <img 
                      src={framework.icon} 
                      alt={framework.title} 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{framework.title}</h3>
                      {framework.badge && (
                        <span className="text-xs text-muted-foreground">
                          {framework.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {framework.questions}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <Progress value={framework.progress} className="mt-4" />
            </Card>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Focus Areas</h2>
          <p className="text-muted-foreground">
            Deep-dive into topical focus areas critical for front end interviews
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: Accessibility,
              title: "Accessibility",
              questions: "12 questions"
            },
            {
              icon: RefreshCw,
              title: "Async Operations",
              questions: "33 questions"
            },
            {
              icon: Code2,
              title: "Data Structures & Algorithms",
              questions: "22 questions"
            },
            {
              icon: Grid,
              title: "Design System Components",
              questions: "15 questions"
            },
            {
              icon: FileCode,
              title: "DOM Manipulation",
              questions: "10 questions"
            },
            {
              icon: FormInput,
              title: "Forms",
              questions: "10 questions"
            },
            {
              icon: Code2,
              title: "JavaScript Polyfills",
              questions: "28 questions"
            },
            {
              icon: Library,
              title: "Lodash Functions",
              questions: "28 questions"
            }
          ].map((area) => (
            <Card 
              key={area.title} 
              className="p-6 hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <area.icon className="h-8 w-8" />
                  <div>
                    <h3 className="font-semibold">{area.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {area.questions}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}
