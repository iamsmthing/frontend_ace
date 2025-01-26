import { Project } from "@/lib/types/project"

export const projectsData: Project[] = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description: "Build a modern e-commerce admin dashboard with real-time analytics, order management, and inventory tracking.",
    type: "frontend",
    difficulty: "Intermediate",
    techStack: ["React", "TypeScript", "Tailwind CSS", "React Query"],
    githubUrl: "https://github.com/example/ecommerce-dashboard",
    guide: {
      sections: [
        {
          id: "setup",
          title: "Project Setup",
          description: "Set up your development environment and install dependencies",
          steps: [
            {
              id: "step-1",
              title: "Create Next.js Project",
              description: "Create a new Next.js project with TypeScript and Tailwind CSS",
              code: "npx create-next-app@latest my-dashboard --typescript --tailwind --eslint"
            },
            {
              id: "step-2",
              title: "Install Dependencies",
              description: "Install required packages for the project",
              code: "npm install @tanstack/react-query axios recharts @radix-ui/react-dialog"
            }
          ]
        },
        {
          id: "auth",
          title: "Authentication",
          description: "Implement user authentication and protected routes",
          steps: [
            {
              id: "step-3",
              title: "Set up Authentication Context",
              description: "Create an authentication context to manage user state",
              code: `export const AuthContext = createContext({})
              
export function AuthProvider({ children }) {
  // Add authentication logic here
}`
            },
            {
              id: "step-4",
              title: "Create Login Form",
              description: "Build a login form with validation"
            }
          ]
        }
      ],
      steps: []
    }
  },
  {
    id: "2",
    title: "Social Media API",
    description: "Create a RESTful API for a social media platform with authentication, posts, comments, and user relationships.",
    type: "backend",
    difficulty: "Advanced",
    techStack: ["Node.js", "Express", "PostgreSQL", "JWT"],
    githubUrl: "https://github.com/example/social-media-api",
    guide: {
      sections: [
        {
          id: "setup",
          title: "Initial Setup",
          description: "Set up your Node.js project and install dependencies",
          steps: [
            {
              id: "step-1",
              title: "Initialize Project",
              description: "Create a new Node.js project and install dependencies",
              code: "npm init -y\nnpm install express pg jsonwebtoken bcrypt cors dotenv"
            }
          ]
        }
      ],
      steps: []
    }
  }
]