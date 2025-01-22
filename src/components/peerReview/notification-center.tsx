"use client"

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New task assigned for review" },
    { id: 2, message: "Your task 'Redesign Landing Page' was approved" },
  ])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
          {/* {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
          )} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="divide-y">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 text-sm">
              {notification.message}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

