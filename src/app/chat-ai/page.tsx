"use client";

import { type FormEvent, useState, useEffect, useRef } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Bot, Send, User, Loader2, Settings } from "lucide-react";
import { cn } from "../../lib/utils";
import MarkdownRenderer from "../../components/chat-ai/markdown-renderer";
import { useAuth } from "../../contexts/auth-context";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import '../../components/leaderboard/style.css'

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {user}=useAuth();
  const router=useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    if (!prompt.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: prompt };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setPrompt("");
    setIsStreaming(true);
    

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok || !res.body) throw new Error("Failed to fetch response");

      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      const reader = ChatCompletionStream.fromReadableStream(res.body);
      reader
        .on("content", (delta: string, content: string) => {
          assistantMessage.content = content;
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            assistantMessage,
          ]);
        })
        .on("end", () => setIsStreaming(false));
       
    } catch (error) {
      console.error("Error:", error);
      setIsStreaming(false);
    }
  }

  const toSettings=()=>{
    router.push('/chat-ai/settings')
  }

  return (
    <div className="flex flex-col h-[90vh]   mx-4 bg-background">
      <header className="flex justify-between cursor-pointer border-b px-4 py-2">
        <h1 className="text-xl font-bold">AI Chat</h1>
        <Settings className="h-4 w-4" onClick={toSettings}/>
      </header>
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hidden space-y-6">
       
        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-4",
              message.role === "assistant" ? "mr-0 " : "ml-0 "
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                message.role === "assistant"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.role === "assistant" ? (
                <Bot className="w-5 h-5" />
              ) : (
                // <User className="w-5 h-5" />
                <Avatar className="h-8 w-8">
          <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
          </Avatar>
              )}
            </div>
            {/* <div className="prose prose-neutral dark:prose-invert max-w-none"><p>{message.content}</p></div> */}
            {/* <div
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: message.content.replace(/\n/g, "<br />"),
              }}
            /> */}
            <MarkdownRenderer content={message.content} />
          </div>
          
        ))}
        {messages.length==0 &&<div className="flex flex-col my-auto mx-auto   w-fit  h-full items-center justify-center flex-wrap"><h1 className="text-3xl">What can I help you with?</h1><p className="text-sm">Powered by Meta Llama-3.3 70B</p></div>}
        {isStreaming && (
          <div className="flex items-center gap-4 mr-0 ">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <div className="text-muted-foreground flex-row">AI is thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex items-end gap-4"
        >
          <Textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              adjustTextareaHeight();
            }}
            placeholder="Ask AI..."
            className="flex-1 min-h-[2.5rem] max-h-[200px] resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!prompt.trim() || isStreaming}
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
