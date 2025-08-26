"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Save, X } from "lucide-react"

interface ProfileEditableProps {
    user?: any
}

export function ProfileEditable({ user }: ProfileEditableProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        firstName: user?.first_name || "Пользователь",
        username: user?.username || "username",
        age: "17",
        city: "Москва",
        timezone: "UTC+3 (Москва)",
        avatar: "👤",
    })

    const stats = {
        selectedOlympiads: 3,
        calendarEvents: 12,
        studyBuddyConnections: 2,
        joinedChats: 2,
    }

    const achievements = [
        { id: 1, title: "Первые шаги", description: "Выбрали первую олимпиаду", icon: "🎯", earned: true },
        { id: 2, title: "Планировщик", description: "Добавили 5+ событий в календарь", icon: "📅", earned: true },
        { id: 3, title: "Социальная бабочка", description: "Присоединились к 3+ чатам", icon: "💬", earned: false },
        { id: 4, title: "Наставник", description: "Помогли 5+ участникам", icon: "🤝", earned: false },
    ]

    const timezones = [
        "UTC+2 (Калининград)",
        "UTC+3 (Москва)",
        "UTC+4 (Самара)",
        "UTC+5 (Екатеринбург)",
        "UTC+6 (Омск)",
        "UTC+7 (Красноярск)",
        "UTC+8 (Иркутск)",
        "UTC+9 (Якутск)",
        "UTC+10 (Владивосток)",
        "UTC+11 (Магадан)",
        "UTC+12 (Камчатка)",
    ]

    const avatars = ["👤", "👨‍🎓", "👩‍🎓", "🧑‍💻", "👨‍🔬", "👩‍🔬", "🤓", "😊", "🚀", "🎯"]

    const handleSave = () => {
        setIsEditing(false)
        console.log("[v0] Profile saved:", profileData)
    }

    const handleCancel = () => {
        setIsEditing(false)
        // Reset to original data if needed
    }

    return (
        <div className="p-4 space-y-4" style={{ backgroundColor: "#F6F7FA" }}>
            <div className="text-center mb-6">
                <div className="relative inline-block">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: "#051F45" }}
                    >
                        <span className="text-white text-2xl">{profileData.avatar}</span>
                    </div>
                    {isEditing && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm"
                                    className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0"
                                    style={{ backgroundColor: "#F2C4CD", color: "#051F45" }}
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md" style={{ backgroundColor: "#F6F7FA" }}>
                                <DialogHeader>
                                    <DialogTitle style={{ color: "#051F45" }}>Выберите аватар</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-5 gap-3 p-4">
                                    {avatars.map((avatar) => (
                                        <Button
                                            key={avatar}
                                            variant="outline"
                                            className="w-12 h-12 text-xl p-0 bg-transparent"
                                            style={{
                                                borderColor: profileData.avatar === avatar ? "#051F45" : "#98A2B3",
                                                backgroundColor: profileData.avatar === avatar ? "rgba(5, 31, 69, 0.1)" : "white",
                                            }}
                                            onClick={() => setProfileData((prev) => ({ ...prev, avatar }))}
                                        >
                                            {avatar}
                                        </Button>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-3">
                        <div>
                            <Label htmlFor="firstName" className="text-sm font-medium" style={{ color: "#051F45" }}>
                                Имя
                            </Label>
                            <Input
                                id="firstName"
                                value={profileData.firstName}
                                onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                                className="mt-1"
                                style={{ borderColor: "#98A2B3" }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="age" className="text-sm font-medium" style={{ color: "#051F45" }}>
                                Возраст
                            </Label>
                            <Input
                                id="age"
                                type="number"
                                value={profileData.age}
                                onChange={(e) => setProfileData((prev) => ({ ...prev, age: e.target.value }))}
                                className="mt-1"
                                style={{ borderColor: "#98A2B3" }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="city" className="text-sm font-medium" style={{ color: "#051F45" }}>
                                Город
                            </Label>
                            <Input
                                id="city"
                                value={profileData.city}
                                onChange={(e) => setProfileData((prev) => ({ ...prev, city: e.target.value }))}
                                className="mt-1"
                                style={{ borderColor: "#98A2B3" }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="timezone" className="text-sm font-medium" style={{ color: "#051F45" }}>
                                Часовой пояс
                            </Label>
                            <Select
                                value={profileData.timezone}
                                onValueChange={(value) => setProfileData((prev) => ({ ...prev, timezone: value }))}
                            >
                                <SelectTrigger className="mt-1" style={{ borderColor: "#98A2B3" }}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {timezones.map((tz) => (
                                        <SelectItem key={tz} value={tz}>
                                            {tz}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button onClick={handleSave} className="flex-1" style={{ backgroundColor: "#051F45", color: "white" }}>
                                <Save className="h-4 w-4 mr-2" />
                                Сохранить
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="outline"
                                className="flex-1 bg-transparent"
                                style={{ borderColor: "#98A2B3", color: "#98A2B3" }}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Отмена
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <h2 className="text-xl font-bold" style={{ color: "#051F45" }}>
                                {profileData.firstName}
                            </h2>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setIsEditing(true)}
                                className="p-1"
                                style={{ color: "#051F45" }}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm" style={{ color: "#98A2B3" }}>
                            @{profileData.username}
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-2 text-sm" style={{ color: "#98A2B3" }}>
                            <span>{profileData.age} лет</span>
                            <span>•</span>
                            <span>{profileData.city}</span>
                            <span>•</span>
                            <span>{profileData.timezone}</span>
                        </div>
                        <Badge className="mt-2" style={{ backgroundColor: "#F2C4CD", color: "#051F45" }}>
                            Активный участник
                        </Badge>
                    </div>
                )}
            </div>

            {/* Statistics */}
            <Card className="p-4" style={{ backgroundColor: "white", borderColor: "#98A2B3" }}>
                <h3 className="font-semibold mb-3" style={{ color: "#051F45" }}>
                    Ваша статистика
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: "#051F45" }}>
                            {stats.selectedOlympiads}
                        </div>
                        <div className="text-xs" style={{ color: "#98A2B3" }}>
                            Выбрано олимпиад
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: "#051F45" }}>
                            {stats.calendarEvents}
                        </div>
                        <div className="text-xs" style={{ color: "#98A2B3" }}>
                            События в календаре
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: "#051F45" }}>
                            {stats.studyBuddyConnections}
                        </div>
                        <div className="text-xs" style={{ color: "#98A2B3" }}>
                            Связи StudyBuddy
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: "#051F45" }}>
                            {stats.joinedChats}
                        </div>
                        <div className="text-xs" style={{ color: "#98A2B3" }}>
                            Чатов присоединено
                        </div>
                    </div>
                </div>
            </Card>

            {/* Achievements */}
            <Card className="p-4" style={{ backgroundColor: "white", borderColor: "#98A2B3" }}>
                <h3 className="font-semibold mb-3" style={{ color: "#051F45" }}>
                    Достижения
                </h3>
                <div className="space-y-3">
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                                achievement.earned ? "bg-opacity-20" : "bg-opacity-10"
                            }`}
                            style={{ backgroundColor: achievement.earned ? "#F2C4CD" : "#98A2B3" }}
                        >
                            <div className={`text-2xl ${achievement.earned ? "" : "grayscale opacity-50"}`}>{achievement.icon}</div>
                            <div className="flex-1">
                                <h4
                                    className={`font-medium ${achievement.earned ? "" : ""}`}
                                    style={{ color: achievement.earned ? "#051F45" : "#98A2B3" }}
                                >
                                    {achievement.title}
                                </h4>
                                <p className="text-xs" style={{ color: "#98A2B3" }}>
                                    {achievement.description}
                                </p>
                            </div>
                            {achievement.earned && <Badge style={{ backgroundColor: "#051F45", color: "white" }}>✓</Badge>}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Settings */}
            <Card className="p-4" style={{ backgroundColor: "white", borderColor: "#98A2B3" }}>
                <h3 className="font-semibold mb-3" style={{ color: "#051F45" }}>
                    Настройки
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "#051F45" }}>
              Уведомления о дедлайнах
            </span>
                        <div className="w-12 h-6 rounded-full flex items-center p-1" style={{ backgroundColor: "#051F45" }}>
                            <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "#051F45" }}>
              Еженедельная сводка
            </span>
                        <div className="w-12 h-6 rounded-full flex items-center p-1" style={{ backgroundColor: "#051F45" }}>
                            <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "#051F45" }}>
              Новые сообщения StudyBuddy
            </span>
                        <div
                            className="w-12 h-6 rounded-full flex items-center p-1"
                            style={{ backgroundColor: "rgba(152, 162, 179, 0.3)" }}
                        >
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
                <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    style={{ color: "#051F45", borderColor: "#051F45" }}
                >
                    Поделиться приложением
                </Button>
                <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    style={{ color: "#051F45", borderColor: "#051F45" }}
                >
                    Связаться с поддержкой
                </Button>
                <Button variant="ghost" className="w-full" style={{ color: "#98A2B3" }}>
                    О приложении
                </Button>
            </div>

            <div className="text-center pt-4">
                <p className="text-xs" style={{ color: "#98A2B3" }}>
                    AnyWay v1.0 • Сделано с ❤️ в Сколково
                </p>
            </div>
        </div>
    )
}
