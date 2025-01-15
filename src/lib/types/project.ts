export interface Project {
    id: string
    title: string
    description: string
    type: "frontend" | "backend" | "fullstack"
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    techStack: string[]
    githubUrl?: string
    liveUrl?: string
    guide: ProjectGuide
  }
  

  export interface ProjectGuide {
    sections: GuideSection[]
    steps: GuideStep[]
  }
  
  export interface GuideSection {
    id: string
    title: string
    description: string
    steps: GuideStep[]
  }
  

  interface Upvote {
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
  }
  export interface GuideStep {
    id: string
    title: string
    description: string
    code?: string
    resources?: {
      title: string
      url: string
    }[]
  }
  export interface PostProject {
    id: string
    title: string
    userId?:string
    description: string
    user?: {
      id: string
      username: string
      imageUrl: string
    }
    timestamp?: string
    imageUrl?: string
    technologies?: string[]
    createdAt?:string
    updatedAt?:string
    upvotes?: Upvote[]
    comments?: number
  }

  export interface UserPost{
    id:string,
    title: string,
    description: string,
    imageUrl:string
  }