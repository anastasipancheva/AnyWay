"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface EventModalProps {
    isOpen: boolean
    onClose: () => void
    onAddToCalendar: (event: CalendarEvent) => void
    olympiadName: string
    eventType: "registration" | "qualifying" | "final"
    date: string
    subject: string
    level: string | number
    features: string
}

export interface CalendarEvent {
    id: number
    title: string
    date: string
    type: "registration" | "qualifying" | "final" | "event"
    olympiad: string
    status: "upcoming" | "completed"
    subject?: string
    level?: string | number
}

export function EventModal({
                               isOpen,
                               onClose,
                               onAddToCalendar,
                               olympiadName,
                               eventType,
                               date,
                               subject,
                               level,
                               features,
                           }: EventModalProps) {
    const [isAdding, setIsAdding] = useState(false)

    const getEventTypeInfo = (type: string) => {
        switch (type) {
            case "registration":
                return {
                    title: "Регистрация",
                    description: "Период подачи заявок на участие в олимпиаде",
                    color: "bg-blue-500",
                    icon: Users,
                }
            case "qualifying":
                return {
                    title: "Отборочный этап",
                    description: "Первый тур олимпиады, обычно проводится дистанционно",
                    color: "bg-yellow-500",
                    icon: Calendar,
                }
            case "final":
                return {
                    title: "Заключительный этап",
                    description: "Финальный тур олимпиады, проводится очно",
                    color: "bg-green-500",
                    icon: MapPin,
                }
            default:
                return {
                    title: type,
                    description: "",
                    color: "bg-gray-500",
                    icon: Calendar,
                }
        }
    }

    const eventInfo = getEventTypeInfo(eventType)
    const Icon = eventInfo.icon

    const handleAddToCalendar = () => {
        setIsAdding(true)

        const newEvent: CalendarEvent = {
            id: Date.now(),
            title: `${eventInfo.title}: ${olympiadName}`,
            date,
            type: eventType,
            olympiad: olympiadName,
            status: "upcoming",
            subject,
            level: typeof level === "number" ? `${level} уровень` : level,
        }

        onAddToCalendar(newEvent)

        setTimeout(() => {
            setIsAdding(false)
            onClose()
        }, 500)
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("ru", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${eventInfo.color} text-white`}>
                            <Icon className="h-4 w-4" />
                        </div>
                        Добавить в календарь
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                        <h3 className="font-semibold text-gray-900 mb-2">{olympiadName}</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                                {typeof level === "number" ? `${level} уровень` : level}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {subject}
                            </Badge>
                        </div>
                        <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm ${eventInfo.color}`}
                        >
                            <Icon className="h-3 w-3" />
                            {eventInfo.title}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900">{formatDate(date)}</p>
                                <p className="text-gray-500 text-xs">{eventInfo.description}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-600">
                                <strong>Особенности:</strong> {features}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isAdding}>
                            Отмена
                        </Button>
                        <Button
                            onClick={handleAddToCalendar}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            disabled={isAdding}
                        >
                            {isAdding ? "Добавляю..." : "Добавить в расписание"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
