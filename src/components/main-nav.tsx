"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, CodeIcon, MessagesSquare, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/auth-context";
import { UserMenu } from "@/components/user-menu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { setTheme, theme } = useTheme();
  const router=useRouter();
  const handleClick=()=>{
       router.push('/chat-ai');
  }

  return (
    <header className="px-6 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="flex flex-row gap-4">
          <Link href="/" className=" flex items-center space-x-2">
            <span className="font-bold">Frontend ACE</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Interviews</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-4">
                    <Link href="/interviews" className="block p-4 hover:bg-muted rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-md bg-primary/10">
                          <BookOpenCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Interviews</h3>
                          <p className="text-sm text-muted-foreground">
                            Targeted practice in specific frameworks and languages for interviews
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>Prepare</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-4">
                    <Link href="/practice" className="block p-4 hover:bg-muted rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-md bg-primary/10">
                          <CodeIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Framework / Languages</h3>
                          <p className="text-sm text-muted-foreground">
                            Targeted practice in specific front end frameworks and languages
                          </p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-muted rounded">React</span>
                            <span className="text-xs px-2 py-1 bg-muted rounded">TypeScript</span>
                            <span className="text-xs px-2 py-1 bg-muted rounded">Vue</span>
                            <span className="text-xs px-2 py-1 bg-muted rounded">Angular</span>
                            <span className="text-xs px-2 py-1 bg-muted rounded">+3 more</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/practice"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/practice"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Practice
            </Link>
            <Link
              href="/projects"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/projects"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Projects
            </Link>
            <Link
              href="/feed"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/learn" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Feed
            </Link>
          </nav>
        </div>
        {!user && (
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex flex-row gap-2 items-center">
            {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button> */}
          <ModeToggle/>
              <Link href="/signin">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </nav>
          </div>
        )}
        {user && <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button> */}
              <MessagesSquare className="cursor-pointer" onClick={handleClick} />

           <ModeToggle/>
            <UserMenu/>
          
        </div>
}
      </div>
    </header>
  );
}
