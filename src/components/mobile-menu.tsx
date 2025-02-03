"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LogOut, Menu, MessagesSquare, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAuth } from "@/contexts/auth-context"

import { ModeToggle } from "./mode-toggle"
import { DropdownMenuItem } from "./ui/dropdown-menu"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user,logout } = useAuth();
  const router=useRouter();
  const navItems = [
    {
      title: "Practice",
      href: "/practice",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Feed",
      href: "/feed",
    },
    {
      title: "Profile",
      href: "/profile",
    },
  ]
  const handleClick = () => {
    router.push("/chat-ai");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-[300px] sm:max-w-[340px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Frontend ACE</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-3 flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleClick}>
              <MessagesSquare className="h-5 w-5" />
            </Button>
            <ModeToggle />
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col px-4 py-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="interviews">
              <AccordionTrigger className="text-base py-3">Interviews</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3 py-2">
                  <Link
                    href="/interviews"
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-3 hover:bg-muted"
                  >
                    <h3 className="font-medium mb-1">Interviews</h3>
                    <p className="text-sm text-muted-foreground">Targeted practice in specific frameworks and
                    languages for interviews</p>
                  </Link>
                  
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center h-12 px-3 text-base font-medium rounded-lg transition-colors hover:bg-muted",
                  pathname === item.href ? "text-foreground font-semibold" : "text-foreground/60",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Button onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

