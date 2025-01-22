export interface Task {
    id: string
    title: string
    description: string
    assignee: string
    avatarUrl: string
    status: 'Pending Review' | 'Approved' | 'Needs Improvement'
    progress: number
    screenshot: string
    code: string
  }
  
  export interface Review {
    taskId: number
    comments: string
    approved: boolean
  }
  