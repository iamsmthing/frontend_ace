"use client"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import Link from "next/link"
import { useEffect, useState } from "react"

interface AuthFormProps {
  type: 'signin' | 'signup'
}

export function AuthForm({ type }: AuthFormProps) {

  const isSignIn = type === 'signin'
  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{isSignIn ? 'Sign In' : 'Create an Account'}</CardTitle>
        <CardDescription>
          {isSignIn 
            ? 'Enter your email below to sign in to your account'
            : 'Enter your details below to create your account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Input
              id="password"
              type="password"
              placeholder={isSignIn ? "Enter your password" : "Create a password"}
            />
          </div>
          {!isSignIn && (
            <div className="grid gap-2">
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
          )}
          <Button className="w-full" >
            {isSignIn ? 'Sign In' : 'Create Account'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {isSignIn ? (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}