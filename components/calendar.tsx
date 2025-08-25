"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Регистрация на ВсОШ по математике",
    date: "2024-09-01",
    type: "registration",
    olympiad: "ВсОШ Математика",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Отборочный этап ММО",
    date: "2024-11-01",
    type: "qualifying",
    olympiad: "Московская математическая олимпиада",
    status: "upcoming",
  },
  {
    id: 3,
    title: "День открытых дверей МГУ",
    date: "2024-10-15",
    type: "event",
    olympiad: "МГУ",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Заключительный этап ВсОШ физика",
    date: "2024-12-12",
    type: "final",
    olympiad: "ВсОШ Физика",
    status: "upcoming",
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

export function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear] = useState(new Date().getFullYear())

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "registration":
        return "bg-blue-100 text-blue-800"
      case "qualifying":
        return "bg-yellow-100 text-yellow-800"
      case "final":
        return "bg-green-100 text-green-800"
      case "event":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "registration":
        return "Регистрация"
      case "qualifying":
        return "Отборочный"
      case "final":
        return "Заключительный"
      case "event":
        return "Мероприятие"
      default:
        return type
    }
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
    return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = events.filter((event) => event.date === dateStr)
      const isToday = new Date().toDateString() === new Date(selectedYear, selectedMonth, day).toDateString()

      days.push(
        <div
          key={day}
          className={`h-10 flex flex-col items-center justify-center text-xs relative ${isToday ? "bg-primary text-white rounded-lg" : ""}`}
        >
          <span className="font-medium">{day}</span>
          {dayEvents.length > 0 && <div className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full"></div>}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary mb-2">Календарь событий</h2>
        <p className="text-sm text-neutral-gray">Ваши олимпиады и важные даты</p>
      </div>

      {/* Month selector */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
          className="text-primary"
        >
          ←
        </Button>
        <h3 className="font-semibold text-primary">
          {months[selectedMonth]} {selectedYear}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
          className="text-primary"
        >
          →
        </Button>
      </div>

      {/* Calendar grid */}
      <Card className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-neutral-gray">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendarGrid()}</div>
      </Card>

      {/* Events list */}
      <div className="space-y-3">
        <h3 className="font-semibold text-primary">События в {months[selectedMonth].toLowerCase()}</h3>
        {filteredEvents.length === 0 ? (
          <Card className="p-4 text-center">
            <p className="text-neutral-gray text-sm">Нет событий в этом месяце</p>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <Card key={event.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-primary text-sm">{event.title}</h4>
                <Badge className={getEventTypeColor(event.type)}>{getEventTypeLabel(event.type)}</Badge>
              </div>
              <p className="text-xs text-neutral-gray mb-1">{event.olympiad}</p>
              <p className="text-xs text-neutral-gray">
                {new Date(event.date).toLocaleDateString("ru", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  Напомнить
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-red-500">
                  Удалить
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
