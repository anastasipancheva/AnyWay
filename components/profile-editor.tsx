"use client"

import { useEffect, useState } from "react"
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

type ProfileData = {
    firstName: string
    username: string
    age: string
    city: string
    timezone: string
    avatar: string
}

type SettingsData = {
    deadlineNotifications: boolean
    weeklyDigest: boolean
    studyBuddyMessages: boolean
}

const STORAGE_KEY = "anyway:profile:v1"
const SETTINGS_STORAGE_KEY = "anyway:settings:v1"

export function ProfileEditable({ user }: ProfileEditableProps) {
    const [isEditing, setIsEditing] = useState(false)

    const defaultData: ProfileData = {
        firstName: user?.first_name || "Пользователь",
        username: user?.username || "username",
        age: "17",
        city: "Москва",
        timezone: "UTC+3 (Москва)",
        avatar: "👤",
    }

    const defaultSettings: SettingsData = {
        deadlineNotifications: true,
        weeklyDigest: true,
        studyBuddyMessages: false,
    }

    const [profileData, setProfileData] = useState<ProfileData>(defaultData)
    const [settings, setSettings] = useState<SettingsData>(defaultSettings)

    // --- Загрузка из localStorage при первом монтировании
    useEffect(() => {
        try {
            const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
            if (saved) {
                const parsed = JSON.parse(saved) as Partial<ProfileData>
                // Мягкий мёрдж: значения из localStorage перекрывают дефолты
                setProfileData((prev) => ({ ...prev, ...parsed }))
            } else if (user) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
            }

            const savedSettings = typeof window !== "undefined" ? localStorage.getItem(SETTINGS_STORAGE_KEY) : null
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings) as Partial<SettingsData>
                setSettings((prev) => ({ ...prev, ...parsedSettings }))
            } else {
                localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings))
            }
        } catch (e) {
            console.error("Failed to load profile from storage", e)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSave = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData))
        } catch (e) {
            console.error("Failed to save profile", e)
        }
        setIsEditing(false)
        console.log("[v0] Profile saved:", profileData)
    }

    const handleCancel = () => {
        setIsEditing(false)
        try {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) {
                setProfileData(JSON.parse(saved))
            } else {
                setProfileData(defaultData)
            }
        } catch {}
    }

    const handleSettingToggle = (setting: keyof SettingsData) => {
        const newSettings = { ...settings, [setting]: !settings[setting] }
        setSettings(newSettings)
        try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings))
        } catch (e) {
            console.error("Failed to save settings", e)
        }
        console.log("[v0] Settings updated:", newSettings)
    }

    const handleShareApp = async () => {
        const botLink = "https://t.me/anyway_university_bot"
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(botLink)
                // Show feedback to user
                if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showAlert("Ссылка скопирована в буфер обмена!")
                } else {
                    alert("Ссылка скопирована в буфер обмена!")
                }
            } else {
                // Fallback for older browsers
                const textArea = document.createElement("textarea")
                textArea.value = botLink
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand("copy")
                document.body.removeChild(textArea)
                alert("Ссылка скопирована в буфер обмена!")
            }
        } catch (err) {
            console.error("Failed to copy link:", err)
            alert(`Ссылка на бота: ${botLink}`)
        }
    }

    const handleContactSupport = () => {
        const supportLink = "https://t.me/ylnaaaw"
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.openTelegramLink(supportLink)
        } else {
            window.open(supportLink, "_blank")
        }
    }

    const stats = {
        selectedOlympiads: 3,
        calendarEvents: 12,
        studyBuddyConnections: 2,
        joinedChats: 2,
    }

    const achievements = [
        {
            id: 1,
            title: "Первые шаги",
            description: "Выбрали первую олимпиаду",
            icon: "🎯",
            earned: true,
        },
        {
            id: 2,
            title: "Планировщик",
            description: "Добавили 5+ событий в календарь",
            icon: "📅",
            earned: true,
        },
        {
            id: 3,
            title: "Социальная бабочка",
            description: "Присоединились к 3+ чатам",
            icon: "💬",
            earned: false,
        },
        {
            id: 4,
            title: "Наставник",
            description: "Помогли 5+ участникам",
            icon: "🤝",
            earned: false,
        },
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
                                onChange={(e) =>
                                    setProfileData((prev) => ({
                                        ...prev,
                                        firstName: e.target.value,
                                    }))
                                }
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
                                onChange={(e) =>
                                    setProfileData((prev) => ({
                                        ...prev,
                                        age: e.target.value,
                                    }))
                                }
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
                                onChange={(e) =>
                                    setProfileData((prev) => ({
                                        ...prev,
                                        city: e.target.value,
                                    }))
                                }
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
                                <Save className="h-4 w-4 mr-2" /> Сохранить
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="outline"
                                className="flex-1 bg-transparent"
                                style={{ borderColor: "#98A2B3", color: "#98A2B3" }}
                            >
                                <X className="h-4 w-4 mr-2" /> Отмена
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
                        <Badge className="mt-2 bg-primary !text-white px-3 py-1 rounded-full">Активный участник</Badge>
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
                                achievement.earned ? "bg-accent/20" : "bg-neutral-gray/10"
                            }`}
                        >
                            <div className={`text-2xl ${achievement.earned ? "" : "opacity-60"}`}>{achievement.icon}</div>
                            <div className="flex-1">
                                <h4 className={`font-medium ${achievement.earned ? "text-primary" : "text-primary/70"}`}>
                                    {achievement.title}
                                </h4>
                                <p className="text-xs text-neutral-gray">{achievement.description}</p>
                            </div>
                            {achievement.earned && <Badge className="bg-primary !text-white">✓</Badge>}
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
                        <button
                            onClick={() => handleSettingToggle("deadlineNotifications")}
                            className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${
                                settings.deadlineNotifications ? "justify-end" : "justify-start"
                            }`}
                            style={{
                                backgroundColor: settings.deadlineNotifications ? "#051F45" : "rgba(152, 162, 179, 0.3)",
                            }}
                        >
                            <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "#051F45" }}>
              Еженедельная сводка
            </span>
                        <button
                            onClick={() => handleSettingToggle("weeklyDigest")}
                            className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${
                                settings.weeklyDigest ? "justify-end" : "justify-start"
                            }`}
                            style={{
                                backgroundColor: settings.weeklyDigest ? "#051F45" : "rgba(152, 162, 179, 0.3)",
                            }}
                        >
                            <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "#051F45" }}>
              Новые сообщения StudyBuddy
            </span>
                        <button
                            onClick={() => handleSettingToggle("studyBuddyMessages")}
                            className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${
                                settings.studyBuddyMessages ? "justify-end" : "justify-start"
                            }`}
                            style={{
                                backgroundColor: settings.studyBuddyMessages ? "#051F45" : "rgba(152, 162, 179, 0.3)",
                            }}
                        >
                            <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </button>
                    </div>
                </div>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
                <Button
                    onClick={handleShareApp}
                    variant="outline"
                    className="w-full bg-transparent"
                    style={{ color: "#051F45", borderColor: "#051F45" }}
                >
                    Поделиться приложением
                </Button>
                <Button
                    onClick={handleContactSupport}
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
