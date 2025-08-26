"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ProfileEditable } from "@/components/profile-editable"
import { Calendar } from "@/components/calendar"
import { UniversitySelection } from "@/components/generate-olympiads-for-direction"
import { SelfTracking } from "@/components/self-tracking"
import type { CalendarEvent } from "@/components/event-modal"

function StudyBuddy() {
  return (
      <div className="p-4 space-y-4" style={{ backgroundColor: "#F6F7FA", minHeight: "400px" }}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#051F45" }}>
            StudyBuddy
          </h2>
          <p style={{ color: "#98A2B3" }}>Найдите напарника для подготовки к олимпиадам</p>
        </div>

        <SelfTracking />
      </div>
  )
}

function UniversityChats() {
  return (
      <div className="p-4 text-center" style={{ backgroundColor: "#F6F7FA", minHeight: "400px" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "#051F45" }}>
          Чаты университетов
        </h2>
        <p style={{ color: "#98A2B3" }}>Раздел в разработке</p>
      </div>
  )
}

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
        return <Calendar externalEvents={calendarEvents} onAddEvent={handleAddToCalendar} />
      case "buddy":
        return <StudyBuddy />
      case "chats":
        return <UniversityChats />
      default:
        return <ProfileEditable user={user} />
    }
  }

  return (
      <div className="telegram-viewport flex flex-col min-h-screen">
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
