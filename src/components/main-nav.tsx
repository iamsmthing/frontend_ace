"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  BookOpenCheck,
  CodeIcon,
  MessagesSquare,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "../contexts/auth-context";
import { UserMenu } from "../components/user-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { ModeToggle } from "../components/mode-toggle";
import { MobileMenu } from "./mobile-menu";

export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const handleClick = () => {
    router.push("/chat-ai");
  };

  return (
    <header className="px-6 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="flex flex-row gap-4 justify-between">
          <Link href="/" className=" flex items-center space-x-2">
            <span className="font-bold">Frontend ACE</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NavigationMenu >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Interviews</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-4">
                    <Link
                      href="/interviews"
                      className="block p-4 hover:bg-muted rounded-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-md bg-primary/10">
                          <BookOpenCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Interviews</h3>
                          <p className="text-sm text-muted-foreground">
                            Targeted practice in specific frameworks and
                            languages for interviews
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
                pathname === "/feed" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Community
            </Link>
          </nav>
        </div>
        {!user && (
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex flex-row gap-2 items-center">
              <ModeToggle />
              <Link href="/signin">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </nav>
          </div>
        )}
        {user && (
          <div className="flex flex-1 items-center justify-between space-x-2  md:justify-end">
            <div className="hidden md:flex items-center gap-4">

            <Button variant="ghost" size="icon" onClick={handleClick}>
              <MessagesSquare className="h-5 w-5 cursor-pointer hover:text-foreground/80" />
            </Button>
            <ModeToggle />
            <UserMenu />
            </div>
            <div className="md:hidden flex justify-end w-full">
            <MobileMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
