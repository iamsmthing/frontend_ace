"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"

interface LeaderboardUser {
  id: string
  name: string
  score: number
  challengesCompleted: number
  quizzesPassed: number
}

export function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([
    // Temporary mock data
    { id: "1", name: "Sarah Chen", score: 850, challengesCompleted: 12, quizzesPassed: 8 },
    { id: "2", name: "Alex Kim", score: 720, challengesCompleted: 10, quizzesPassed: 6 },
    { id: "3", name: "Maria Garcia", score: 680, challengesCompleted: 8, quizzesPassed: 7 },
    { id: "4", name: "John Smith", score: 590, challengesCompleted: 7, quizzesPassed: 5 },
    { id: "5", name: "David Lee", score: 520, challengesCompleted: 6, quizzesPassed: 4 },
  ])

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Leaderboard</h2>
        <Trophy className="h-6 w-6 text-yellow-500" />
      </div>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
          >
            <div className="flex-shrink-0 w-8 text-center">
              {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
              {index === 1 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
              {index === 2 && <Award className="h-5 w-5 text-amber-600 mx-auto" />}
              {index > 2 && <span className="text-muted-foreground">{index + 1}</span>}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>{user.challengesCompleted} challenges</span>
                <span>{user.quizzesPassed} quizzes</span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <span className="text-lg font-bold">{user.score}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}