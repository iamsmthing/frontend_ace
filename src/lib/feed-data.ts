import { PostProject } from "./types/project"

export const feedData: PostProject[] = [
  {
    id: "1",
    title: "Built a Real-time Collaborative Code Editor",
    description: "Just finished building a real-time collaborative code editor using WebSocket and Monaco Editor. It supports multiple programming languages and has features like syntax highlighting and live collaboration.",
    user: {
      id: "user1",
      username: "Sarah Chen",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    timestamp: "2 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    technologies: ["React", "WebSocket", "Monaco Editor", "Node.js"],
    upvotes: [],
    comments: 12
  },
  {
    id: "2",
    title: "Launched My Portfolio Website",
    description: "Excited to share my new portfolio website built with Next.js and Tailwind CSS. It features a dark mode, project showcase, and a blog section.",
    user: {
      id: "user2",
      username: "Alex Kim",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    timestamp: "5 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    upvotes: [],
    comments: 8
  },
  {
    id: "3",
    title: "Created an E-commerce Platform",
    description: "Just completed building a full-stack e-commerce platform with features like cart management, payment integration, and order tracking.",
    user: {
      id: "user3",
      username: "Maria Garcia",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    timestamp: "1 day ago",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    upvotes: [],
    comments: 15
  }
]