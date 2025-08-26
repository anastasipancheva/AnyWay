"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CalendarEvent } from "./event-modal"

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Регистрация: ВсОШ по математике",
    date: "2025-09-01",
    type: "registration",
    olympiad: "ВсОШ Математика",
    status: "upcoming",
    subject: "Математика",
    level: "ВсОШ",
  },
  {
    id: 2,
    title: "Отборочный этап: Московская математическая олимпиада",
    date: "2025-11-01",
    type: "qualifying",
    olympiad: "Московская математическая олимпиада",
    status: "upcoming",
    subject: "Математика",
    level: "1 уровень",
  },
  {
    id: 3,
    title: "Регистрация: ВсОШ по физике",
    date: "2025-09-01",
    type: "registration",
    olympiad: "ВсОШ Физика",
    status: "upcoming",
    subject: "Физика",
    level: "ВсОШ",
  },
  {
    id: 4,
    title: "Заключительный этап: ВсОШ физика",
    date: "2025-04-05",
    type: "final",
    olympiad: "ВсОШ Физика",
    status: "upcoming",
    subject: "Физика",
    level: "ВсОШ",
  },
  {
    id: 5,
    title: "Отборочный этап: ВсОШ по информатике",
    date: "2025-10-25",
    type: "qualifying",
    olympiad: "ВсОШ Информатика",
    status: "upcoming",
    subject: "Информатика",
    level: "ВсОШ",
  },
  {
    id: 6,
    title: "Заключительный этап: ВсОШ по математике",
    date: "2025-03-15",
    type: "final",
    olympiad: "ВсОШ Математика",
    status: "upcoming",
    subject: "Математика",
    level: "ВсОШ",
  },
  {
    id: 7,
    title: "Регистрация: Турнир городов",
    date: "2025-09-20",
    type: "registration",
    olympiad: "Турнир городов",
    status: "upcoming",
    subject: "Математика",
    level: "1 уровень",
  },
  {
    id: 8,
    title: "Заключительный этап: ВсОШ по химии",
    date: "2025-04-15",
    type: "final",
    olympiad: "ВсОШ Химия",
    status: "upcoming",
    subject: "Химия",
    level: "ВсОШ",
  },
]

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
]

interface CalendarProps {
  onAddEvent?: (event: CalendarEvent) => void
  externalEvents?: CalendarEvent[]
}

export function Calendar({ onAddEvent, externalEvents = [] }: CalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear] = useState(2025)
  const [reminders, setReminders] = useState<Set<number>>(new Set())

  useEffect(() => {
    console.log("[v0] Calendar received external events:", externalEvents)
    if (externalEvents && externalEvents.length > 0) {
      setEvents((prevEvents) => {
        const existingIds = new Set(prevEvents.map((e) => e.id))
        const newEvents = externalEvents.filter((e) => !existingIds.has(e.id))
        console.log("[v0] Adding new events to calendar:", newEvents)

        if (newEvents.length > 0) {
          const updatedEvents = [...prevEvents, ...newEvents]
          console.log("[v0] Updated events list:", updatedEvents)
          return updatedEvents
        }
        return prevEvents
      })
    }
  }, [externalEvents?.length, externalEvents])

  const addEvent = (newEvent: CalendarEvent) => {
    console.log("[v0] Adding event directly:", newEvent)
    setEvents((prev) => [...prev, newEvent])
    if (onAddEvent) {
      onAddEvent(newEvent)
    }
  }

  const toggleReminder = (eventId: number, eventTitle: string) => {
    setReminders((prev) => {
      const newReminders = new Set(prev)
      if (newReminders.has(eventId)) {
        newReminders.delete(eventId)
        console.log("[v0] Reminder removed for:", eventTitle)
        // Here you could remove browser notification
      } else {
        newReminders.add(eventId)
        console.log("[v0] Reminder set for:", eventTitle)
        // Here you could set up browser notification
        if ("Notification" in window) {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Напоминание установлено", {
                body: `Напоминание для "${eventTitle}" активировано`,
                icon: "/favicon.ico",
              })
            }
          })
        }
      }
      return newReminders
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "registration":
        return "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200"
      case "qualifying":
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200"
      case "final":
        return "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200"
      case "event":
        return "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "registration":
        return "📝 Регистрация"
      case "qualifying":
        return "📚 Отборочный"
      case "final":
        return "🏆 Заключительный"
      case "event":
        return "📅 Мероприятие"
      default:
        return type
    }
  }

  const removeEvent = (eventId: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId))
    setReminders((prev) => {
      const newReminders = new Set(prev)
      newReminders.delete(eventId)
      return newReminders
    })
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === selectedMonth && eventDate.getFullYear() === selectedYear
  })

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = events.filter((event) => event.date === dateStr)
      const isToday = new Date().toDateString() === new Date(selectedYear, selectedMonth, day).toDateString()

      days.push(
          <div
              key={day}
              className={`h-12 flex flex-col items-center justify-center text-sm relative rounded-lg transition-all duration-200 hover:bg-primary/5 ${
                  isToday ? "bg-gradient-to-br from-[#051F45] to-[#051F45]/80 text-white shadow-lg" : ""
              }`}
          >
            <span className="font-semibold">{day}</span>
            {dayEvents.length > 0 && (
                <div className="absolute -bottom-1 flex gap-1">
                  {dayEvents.slice(0, 3).map((_, index) => (
                      <div key={index} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F2C4CD" }}></div>
                  ))}
                </div>
            )}
          </div>,
      )
    }

    return days
  }

  return (
      <div
          className="p-6 space-y-6 min-h-screen"
          style={{ background: "linear-gradient(135deg, #F6F7FA 0%, rgba(5, 31, 69, 0.05) 100%)" }}
      >
        <div className="text-center">
          <h2
              className="text-3xl font-bold mb-3"
              style={{
                background: "linear-gradient(to right, #051F45, rgba(5, 31, 69, 0.7))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
          >
            Календарь олимпиад 2025
          </h2>
          <p className="text-lg" style={{ color: "#98A2B3" }}>
            Ваши олимпиады и важные даты
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <Button
              variant="ghost"
              size="lg"
              onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
              className="font-semibold hover:bg-white"
              style={{ color: "#051F45" }}
          >
            ← Предыдущий
          </Button>
          <h3 className="font-bold text-2xl" style={{ color: "#051F45" }}>
            {months[selectedMonth]} {selectedYear}
          </h3>
          <Button
              variant="ghost"
              size="lg"
              onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
              className="font-semibold hover:bg-white"
              style={{ color: "#051F45" }}
          >
            Следующий →
          </Button>
        </div>

        <Card className="p-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                <div
                    key={day}
                    className="h-10 flex items-center justify-center text-sm font-bold rounded-lg"
                    style={{ color: "#051F45", backgroundColor: "rgba(5, 31, 69, 0.05)" }}
                >
                  {day}
                </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">{renderCalendarGrid()}</div>
        </Card>

        <div className="space-y-4">
          <h3 className="font-bold text-xl flex items-center gap-2" style={{ color: "#051F45" }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F2C4CD" }}></span>
            События в {months[selectedMonth].toLowerCase()} ({filteredEvents.length})
          </h3>
          {filteredEvents.length === 0 ? (
              <Card className="p-8 text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-lg" style={{ color: "#98A2B3" }}>
                  Нет событий в этом месяце
                </p>
              </Card>
          ) : (
              filteredEvents.map((event) => (
                  <Card
                      key={event.id}
                      className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-lg" style={{ color: "#051F45" }}>
                        {event.title}
                      </h4>
                      <Badge className={`${getEventTypeColor(event.type)} font-semibold px-3 py-1`}>
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <p className="text-sm font-medium" style={{ color: "#98A2B3" }}>
                        {event.olympiad}
                      </p>
                      {event.subject && (
                          <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                            {event.subject}
                          </Badge>
                      )}
                      {event.level && (
                          <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                            {event.level}
                          </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-4" style={{ color: "#98A2B3" }}>
                      {new Date(event.date).toLocaleDateString("ru", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="flex gap-3">
                      <Button
                          size="sm"
                          variant="outline"
                          className={`text-sm bg-transparent hover:bg-white ${reminders.has(event.id) ? "border-green-500 text-green-600" : ""}`}
                          style={{ borderColor: reminders.has(event.id) ? "#10b981" : "rgba(5, 31, 69, 0.2)" }}
                          onClick={() => toggleReminder(event.id, event.title)}
                      >
                        {reminders.has(event.id) ? "🔔 Напоминание установлено" : "🔔 Напомнить"}
                      </Button>
                      <Button
                          size="sm"
                          variant="ghost"
                          className="text-sm text-red-500 hover:bg-red-50"
                          onClick={() => removeEvent(event.id)}
                      >
                        🗑️ Удалить
                      </Button>
                    </div>
                  </Card>
              ))
          )}
        </div>
      </div>
  )
}

export type { CalendarEvent }
