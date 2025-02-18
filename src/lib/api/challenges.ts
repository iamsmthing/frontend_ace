"use client";
import { LeaderboardUser } from "../../components/leaderboard/leaderboard";
import { Problem } from "../../lib/types/problem";

export async function getChallenge(id: string,userId:string): Promise<Problem> {
  const response = await fetch(`/api/getChallengeById?id=${id}`,{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({userId}),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch problem');
  }
  console.log(response)
  return response.json();
}

export async function getChallenges(): Promise<Problem[]> {
  const response = await fetch('/api/getChallenges');
  if (!response.ok) {
    throw new Error('Failed to fetch problems');
  }
  return response.json();
}

export async function markAsComplete(userId:string,challengeId:string,isCompleted:boolean,token:string):Promise<Problem[]>{
  const response=await fetch('/api/v1/api/markAsComplete',{
    method: "POST",
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
    body: JSON.stringify({userId,challengeId,isCompleted}),
  });
  if(!response.ok){
    throw new Error('failed to fetch problems');
  }
  return response.json();
}
export const getLeaderboard=async(token:string):Promise<LeaderboardUser[]>=>{
  const response=await fetch('/api/v1/api/fetchLeaderBoardScore',{
    method:'GET',
    headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
  })
  console.log(response.status)
  if(!response.ok){
    throw new Error('failed to fetch leaderboard');
  }

  return response.json()
}