export interface Problem {
  id: string
  title: string
  difficulty: string
  category?:string
  description: string
  hints: string[]
  progress?:Progress[]
}

export interface Progress{
id:string
userId:string
challengeId:string
isCompleted:boolean
completedAt:Date
updatedAt:Date
}