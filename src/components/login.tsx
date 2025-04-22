"use client"

import type React from "react"
import { useState } from "react"
import { Github, Facebook, Instagram } from "lucide-react"
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components"
import { ThemeProvider, useTheme } from "@/theme/theme"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Modified to remove full-screen container since it's now in a split layout
const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  width: 100%;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 28rem;
  background-color: #F6F8D5;
  border: 1px solid #98D2C0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(76, 88, 91, 0.1);
`;

const LoginButton = styled(Button)`
  background-color: #205781;
  color: #F6F8D5;
  border-radius: 6px;
  padding: 10px 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #4F959D;
  }
`;

const LinkText = styled.a`
  color: #205781;
  transition: color 0.3s ease;
  
  &:hover {
    color: #4F959D;
    text-decoration: underline;
  }
`;

// Wrapper component that uses the theme
const LoginContent = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", email, password)
  }

  return (
    <LoginContainer>
      <LoginCard>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold" style={theme.components.text.heading}>
            Cultural Heritage Preservation
          </CardTitle>
          <CardDescription style={theme.components.text.small}>
            Sign in to access the preservation system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" style={theme.components.text.body}>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={theme.components.input.base}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" style={theme.components.text.body}>Password</Label>
                <LinkText href="/forgot-password" className="text-sm">
                  Forgot password?
                </LinkText>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={theme.components.input.base}
              />
            </div>
            <LoginButton type="submit" className="w-full">
              Sign in
            </LoginButton>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2" style={theme.components.text.small}>Or continue with</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="w-full" type="button" style={theme.components.button.secondary.base}>
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" className="w-full" type="button" style={theme.components.button.secondary.base}>
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </Button>
              <Button variant="outline" className="w-full" type="button" style={theme.components.button.secondary.base}>
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm" style={theme.components.text.small}>
            Don&apos;t have an account?{" "}
            <LinkText href="/register" className="font-medium">
              Create one
            </LinkText>
          </p>
        </CardFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default function LoginPage() {
  return (
    <ThemeProvider>
      <LoginContent />
    </ThemeProvider>
  )
}
