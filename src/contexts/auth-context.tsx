"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define User type
export interface User {
  id:string,  
  username: string,
  email: string,
  imageUrl?:string ,
  token: string;
}

// Define AuthContext type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize User State
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const imageUrl=localStorage.getItem("imgUrl")!;
    const id=localStorage.getItem("id");

    if (token && username && email && id) {
      // Set user if data exists
      setUser({ username, email, token ,id,imageUrl});
    } else {
      router.push("/"); // Redirect to login page
    }

    setIsLoading(false); // Mark initialization complete
  }, []); // Empty dependency array to run only once on mount

  // Login function
  const login = (userData: User) => {
    localStorage.setItem("token", userData.token); // Store in localStorage
    localStorage.setItem("username", userData.username);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("id",userData.id)
    if(userData.imageUrl) localStorage.setItem('imgUrl',userData.imageUrl)
    setUser(userData); // Update user state
    if(userData) router.push("/practice"); // Redirect to dashboard
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Clear stored data
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem('imgUrl');
    toast.success("Logged out successfully");
    setUser(null); // Clear user state
    router.push("/signin"); // Redirect to login
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
