"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { UniversitySelection } from "@/components/university-selection"
import { Calendar } from "@/components/calendar"
import { StudyBuddy } from "@/components/study-buddy"
import { UniversityChats } from "@/components/university-chats"
import { ProfileEditable } from "@/components/profile-editable"
import type { CalendarEvent } from "@/components/event-modal"

export default function Home() {
  const [activeTab, setActiveTab] = useState("profile")
  const [user, setUser] = useState<any>(null)
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()

      // Get user data from Telegram
      setUser(
          tg.initDataUnsafe?.user || {
            id: 1,
            first_name: "Анна",
            username: "anna_student",
          },
      )
    }
  }, [])

  const handleAddToCalendar = (event: CalendarEvent) => {
    console.log("[v0] Home received event to add to calendar:", event)
    setCalendarEvents((prev) => [...prev, event])
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileEditable user={user} />
      case "universities":
        return <UniversitySelection onAddToCalendar={handleAddToCalendar} />
      case "calendar":
        return <Calendar externalEvents={calendarEvents} />
      case "buddy":
        return <StudyBuddy user={user} />
      case "chats":
        return <UniversityChats />
      default:
        return <ProfileEditable user={user} />
    }
  }

  return (
      <div className="telegram-viewport flex flex-col">
        <header className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg">AnyWay</h1>
              <p className="text-xs opacity-80">Поступи в вуз мечты</p>
            </div>
          </div>
          {user && (
              <div className="text-right">
                <p className="text-sm font-medium">{user.first_name}</p>
                <p className="text-xs opacity-80">@{user.username}</p>
              </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto">{renderContent()}</main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
  )
}
