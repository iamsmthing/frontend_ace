"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "../../contexts/auth-context";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          toast.error("User not found");
          return; // Stop execution and stay on the page
        }
        if (response.status === 401) {
          toast.error("Invalid password");
          return; // Stop execution and stay on the page
        }
        throw new Error(result.error || "Failed to sign in");
      }

      const { id, username, email, token,imageUrl } = result;
      console.log(result)
      const userData = { id, username, email, token ,imageUrl};

      login(userData);
      const lastVistedUrl=localStorage.getItem('lastVisited');
      const redirectUrl=lastVistedUrl?lastVistedUrl:'/practice'
      localStorage.removeItem('lastVisited')
      router.push(redirectUrl);
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error("Something went wrong");
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        {isLoading && <LoadingOverlay />}
    <div className="h-[90vh]  flex items-center justify-center bg-background">
      <Card className="h-[450px] w-screen max-w-md p-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-muted-foreground">Enter your credentials to sign in</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
}