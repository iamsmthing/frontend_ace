"use client"

import { useState, useEffect } from "react"
import { Card } from "../../components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"
import '../../components/leaderboard/style.css'
import { useLeaderboard } from "../../hooks/use-leaderboard"
import { useAuth } from "../../contexts/auth-context"


type Challenge = {
  id:string
  difficulty: "Easy" | "Medium" | "Hard";
};

type Progress = {
  challenge: Challenge;
};
export interface LeaderboardUser {
  id: string
  username: string
  score: number
  progress:Progress[]

}

export function Leaderboard() {
  const {user}=useAuth();
   const { leaderboard:users, isLoading, error } = useLeaderboard(user?.token as string);
   console.log(users)

   // Function to count difficulties (Hard > Medium > Easy)
const countDifficulties = (progress: Progress[]): [number, number, number] => {
  let hard = 0, medium = 0, easy = 0;
  for (const entry of progress) {
      if (entry.challenge.difficulty === "Hard") hard++;
      else if (entry.challenge.difficulty === "Medium") medium++;
      else if (entry.challenge.difficulty === "Easy") easy++;
  }
  return [hard, medium, easy];  // Higher difficulty comes first
};

// Sorting users
const sortedUsers = users.sort((a, b) => {
  // Sort by score (descending)
  if (b.score !== a.score) return b.score - a.score;

  // Sort by difficulty (Hard > Medium > Easy)
  const [hardA, mediumA, easyA] = countDifficulties(a.progress);
  const [hardB, mediumB, easyB] = countDifficulties(b.progress);
  console.log(countDifficulties(a.progress))
  
  if (hardB !== hardA) return hardB - hardA;
  if (mediumB !== mediumA) return mediumB - mediumA;
  return easyB - easyA;
});



// Assigning ranks
let leaderboard: { rank: number; username: string; score: number,challengesCompleted:number }[] = [];
let rank = 1;

for (let i = 0; i < sortedUsers.length; i++) {
    if (i > 0) {
        const prevUser = sortedUsers[i - 1];
        const currUser = sortedUsers[i];

        const prevDifficulty = countDifficulties(prevUser.progress);
        const currDifficulty = countDifficulties(currUser.progress);

        if (
            prevUser.score === currUser.score &&
            prevDifficulty[0] === currDifficulty[0] &&
            prevDifficulty[1] === currDifficulty[1] &&
            prevDifficulty[2] === currDifficulty[2]
        ) {
            // If same score & same difficulty count, keep the same rank
            leaderboard.push({ rank: leaderboard[leaderboard.length - 1].rank, username: currUser.username, score: currUser.score,challengesCompleted:currUser.progress.length });
        } else {
            // Otherwise, assign new rank
            leaderboard.push({ rank: rank, username: currUser.username, score: currUser.score,challengesCompleted:currUser.progress.length });
        }
    } else {
        leaderboard.push({ rank: rank, username: sortedUsers[i].username, score: sortedUsers[i].score,challengesCompleted:sortedUsers[i].progress.length });
    }
    rank++;
}
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Leaderboard</h2>
        <Trophy className="h-6 w-6 text-yellow-500" />
      </div>

      <div className="space-y-4  min-h-[50%] overflow-auto scrollbar-hidden  overflow-y-scroll">
        {leaderboard.map((user, index) => (
          <div
            key={user.rank}
            className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
          >
            <div className="flex-shrink-0 w-8 text-center">
              {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
              {index === 1 && <Medal className="h-5 w-5 text-gray-400 mx-auto" />}
              {index === 2 && <Award className="h-5 w-5 text-amber-600 mx-auto" />}
              {index > 2 && <span className="text-muted-foreground">{index+1 }</span>}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.username}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>{user.challengesCompleted} challenges</span>
                <span>{0} quizzes</span>
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