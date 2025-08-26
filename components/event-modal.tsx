"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react"

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
    const [showSuccess, setShowSuccess] = useState(false)

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
            setShowSuccess(true)
        }, 500)

        setTimeout(() => {
            setShowSuccess(false)
            onClose()
        }, 2000)
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
            <DialogContent className="sm:max-w-md" style={{ backgroundColor: "#F6F7FA" }}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2" style={{ color: "#051F45" }}>
                        <div className="p-2 rounded-lg text-white" style={{ backgroundColor: "#051F45" }}>
                            <Icon className="h-4 w-4" />
                        </div>
                        Добавить в календарь
                    </DialogTitle>
                </DialogHeader>

                {showSuccess ? (
                    <div className="space-y-4 text-center py-8">
                        <div className="flex justify-center">
                            <CheckCircle className="h-16 w-16" style={{ color: "#051F45" }} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: "#051F45" }}>
                                Успешно добавлено в расписание!
                            </h3>
                            <p className="text-sm" style={{ color: "#98A2B3" }}>
                                Событие "{eventInfo.title}" добавлено в ваш календарь
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div
                            className="p-4 rounded-lg border"
                            style={{
                                background: "linear-gradient(135deg, #F2C4CD 0%, #F6F7FA 100%)",
                                borderColor: "#98A2B3",
                            }}
                        >
                            <h3 className="font-semibold mb-2" style={{ color: "#051F45" }}>
                                {olympiadName}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                                    {typeof level === "number" ? `${level} уровень` : level}
                                </Badge>
                                <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                                    {subject}
                                </Badge>
                            </div>
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm"
                                style={{ backgroundColor: "#051F45" }}
                            >
                                <Icon className="h-3 w-3" />
                                {eventInfo.title}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Clock className="h-4 w-4" style={{ color: "#98A2B3" }} />
                                <div>
                                    <p className="font-medium" style={{ color: "#051F45" }}>
                                        {formatDate(date)}
                                    </p>
                                    <p className="text-xs" style={{ color: "#98A2B3" }}>
                                        {eventInfo.description}
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(242, 196, 205, 0.1)" }}>
                                <p className="text-xs" style={{ color: "#98A2B3" }}>
                                    <strong style={{ color: "#051F45" }}>Особенности:</strong> {features}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 bg-transparent"
                                disabled={isAdding}
                                style={{ borderColor: "#98A2B3", color: "#98A2B3" }}
                            >
                                Отмена
                            </Button>
                            <Button
                                onClick={handleAddToCalendar}
                                className="flex-1"
                                disabled={isAdding}
                                style={{
                                    backgroundColor: "#051F45",
                                    color: "white",
                                }}
                            >
                                {isAdding ? "Добавляю..." : "Добавить в расписание"}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
