"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLinkIcon, Key, Save } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState({
    openAI: "",
    anthropic: "",
    llamaApi: "",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate saving API keys
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.message('Settings saved', {
        description: 'Your API keys have been updated successfully.',
      })

    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-primary-foreground text-primary p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Card className="border-gray-800 bg-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Keys
            </CardTitle>
            <CardDescription className="text-gray-400">
              Configure your API keys for different AI providers. These keys are stored securely and used to make
              requests to the respective APIs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai" className="text-sm text-gray-300">
                    Together AI API Key
                  </Label>
                  <div className="flex items-center content-center flex-row gap-2">
                    <p>Get free api key here</p>
                    <Link  target="_blank" href="https://api.together.xyz/settings/api-keys"><ExternalLinkIcon className="h-4 w-4"/></Link>
                  </div>
                  <Input
                    id="openai"
                    type="password"
                    placeholder="3e7..."
                    value={apiKeys.openAI}
                    onChange={(e) => setApiKeys((prev) => ({ ...prev, openAI: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anthropic" className="text-sm text-gray-300">
                    Anthropic API Key (coming soon)
                  </Label>
                  <Input
                  disabled
                    id="anthropic"
                    type="password"
                    placeholder="sk-ant-..."
                    value={apiKeys.anthropic}
                    onChange={(e) => setApiKeys((prev) => ({ ...prev, anthropic: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="llama" className="text-sm text-gray-300">
                    Llama API Key (coming soon)
                  </Label>
                  <Input
                  disabled
                    id="llama"
                    type="password"
                    placeholder="llama-..."
                    value={apiKeys.llamaApi}
                    onChange={(e) => setApiKeys((prev) => ({ ...prev, llamaApi: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

