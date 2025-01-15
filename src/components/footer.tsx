import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Github, Linkedin, Twitter, DiscIcon as Discord } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Newsletter Section */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h3 className="text-xl font-bold">Frontend ACE</h3>
            </Link>
            <div className="space-y-4">
              <h4 className="font-medium">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="max-w-[240px] bg-background"
                />
                <Button>Notify me</Button>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">Practice</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Get Started</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">JavaScript Functions</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">User Interface Coding</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">System Design</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Guides</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Front End Interview Playbook</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Front End System Design Playbook</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Behavioral Interview Playbook</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Team</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Discord className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2025 Frontend ACE. All rights reserved.</span>
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

