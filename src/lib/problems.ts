import type { Problem } from "../lib/types/problem"

export const problems: Problem[] = [
  {
    id: "1",
    title: "Counter App",
    difficulty: "Easy",
    description: `Create a counter application with the following requirements:
    
1. Display a number (starting from 0)
2. Add a button to increment the number
3. Add a button to decrement the number
4. Add a reset button to set the number back to 0`,
    hints: [
      "Use the useState hook to manage the counter state",
      "Create separate functions for increment, decrement, and reset",
      "Consider adding input validation to prevent negative numbers",
    ],
  },
  {
    id: "2",
    title: "Todo List",
    difficulty: "Medium",
    description: `Build a todo list application with the following features:

1. Add new todos with a text input
2. Display a list of todos
3. Mark todos as complete
4. Delete todos from the list`,
    hints: [
      "Use useState to manage the list of todos",
      "Each todo should have a unique id, text, and completed status",
      "Consider using array methods like map and filter",
    ],
  },
  {
    id: "3",
    title: "Data Fetching",
    difficulty: "Hard",
    description: `Create a component that fetches and displays data:

1. Fetch data from an API
2. Show loading state while fetching
3. Handle and display errors
4. Display the fetched data in a list`,
    hints: [
      "Use useEffect for data fetching",
      "Implement proper error boundaries",
      "Consider using async/await",
    ],
  },
]
  export function getProblem(id: string): Problem | undefined {
    return problems.find(p => p.id === id);
  }
  
  export function getAllProblemIds(): string[] {
    return problems.map(p => p.id);
  }