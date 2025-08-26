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

type Settings = {
  deadlineNotifications: boolean
  weeklyDigest: boolean
  studyBuddyMessages: boolean
}

const STORAGE_KEY = "anyway:profile:v1"
const SETTINGS_KEY = "anyway:settings:v1"
const TG_BOT_URL = "https://t.me/anyway_university_bot"
const TG_SUPPORT = "https://t.me/ylnaaaw"

export function ProfileEditable({ user }: ProfileEditableProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const defaultData: ProfileData = {
    firstName: user?.first_name || "Пользователь",
    username: user?.username || "username",
    age: "17",
    city: "Москва",
    timezone: "UTC+3 (Москва)",
    avatar: "👤",
  }

  const [profileData, setProfileData] = useState<ProfileData>(defaultData)

  const defaultSettings: Settings = {
    deadlineNotifications: true,
    weeklyDigest: true,
    studyBuddyMessages: false,
  }
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  // --- Загрузка профиля и настроек из localStorage при первом монтировании
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<ProfileData>
        setProfileData((prev) => ({ ...prev, ...parsed }))
      } else if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
      }
    } catch (e) {
      console.error("Failed to load profile from storage", e)
    }

    try {
      const savedSettings = typeof window !== "undefined" ? localStorage.getItem(SETTINGS_KEY) : null
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings) as Partial<Settings>
        setSettings((prev) => ({ ...prev, ...parsed }))
      } else {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings))
      }
    } catch (e) {
      console.error("Failed to load settings", e)
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
  }

  const handleCancel = () => {
    setIsEditing(false)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setProfileData(JSON.parse(saved))
      else setProfileData(defaultData)
    } catch {}
  }

  // --- Тогглы настроек
  const toggleSetting = (key: keyof Settings) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  // --- Действия нижних кнопок
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(TG_BOT_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Фоллбэк: откроем бота, если не получилось скопировать
      window.open(TG_BOT_URL, "_blank")
    }
  }

  const handleSupport = () => {
    window.open(TG_SUPPORT, "_blank")
  }

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
                <Badge variant="default" className="mt-2 bg-primary text-white px-3 py-1 rounded-full">
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
          <h3 className="font-semibold mb-3" style={{ color: "#051F45" }}>Достижения</h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
                <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned ? "bg-accent/20" : "bg-neutral-gray/10"
                    }`}
                >
                  <div className={`text-2xl ${achievement.earned ? "" : "opacity-60"}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4
                        className={`font-medium ${
                            achievement.earned ? "text-primary" : "text-primary/70"
                        }`}
                    >
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-neutral-gray">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                      <Badge className="bg-primary !text-white">✓</Badge>
                  )}
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
            {/* Deadline notifications */}
            <button
                type="button"
                onClick={() => toggleSetting("deadlineNotifications")}
                className="w-full flex items-center justify-between"
                aria-pressed={settings.deadlineNotifications}
            >
            <span className="text-sm" style={{ color: "#051F45" }}>
              Уведомления о дедлайнах
            </span>
              <div
                  className="w-12 h-6 rounded-full flex items-center p-1 transition-all"
                  style={{ backgroundColor: settings.deadlineNotifications ? "#051F45" : "rgba(152,162,179,0.3)" }}
              >
                <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.deadlineNotifications ? "translate-x-6" : ""
                    }`}
                />
              </div>
            </button>

            {/* Weekly digest */}
            <button
                type="button"
                onClick={() => toggleSetting("weeklyDigest")}
                className="w-full flex items-center justify-between"
                aria-pressed={settings.weeklyDigest}
            >
            <span className="text-sm" style={{ color: "#051F45" }}>
              Еженедельная сводка
            </span>
              <div
                  className="w-12 h-6 rounded-full flex items-center p-1 transition-all"
                  style={{ backgroundColor: settings.weeklyDigest ? "#051F45" : "rgba(152,162,179,0.3)" }}
              >
                <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.weeklyDigest ? "translate-x-6" : ""
                    }`}
                />
              </div>
            </button>

            {/* StudyBuddy messages */}
            <button
                type="button"
                onClick={() => toggleSetting("studyBuddyMessages")}
                className="w-full flex items-center justify-between"
                aria-pressed={settings.studyBuddyMessages}
            >
            <span className="text-sm" style={{ color: "#051F45" }}>
              Новые сообщения StudyBuddy
            </span>
              <div
                  className="w-12 h-6 rounded-full flex items-center p-1 transition-all"
                  style={{ backgroundColor: settings.studyBuddyMessages ? "#051F45" : "rgba(152,162,179,0.3)" }}
              >
                <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.studyBuddyMessages ? "translate-x-6" : ""
                    }`}
                />
              </div>
            </button>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button
              variant="outline"
              className="w-full bg-transparent"
              style={{ color: "#051F45", borderColor: "#051F45" }}
              onClick={handleShare}
          >
            {copied ? "Скопировано! ✨" : "Поделиться приложением"}
          </Button>

          <Button
              variant="outline"
              className="w-full bg-transparent"
              style={{ color: "#051F45", borderColor: "#051F45" }}
              onClick={handleSupport}
          >
            Связаться с поддержкой
          </Button>

          <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full" style={{ color: "#98A2B3" }}>
                О приложении
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl" style={{ backgroundColor: "#F6F7FA" }}>
              <DialogHeader>
                <DialogTitle style={{ color: "#051F45" }}>AnyWay — поступай и береги себя</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm" style={{ color: "#051F45" }}>
                <p>
                  В рамках Стартап Академии Сколково мы разрабатываем образовательный проект для школьников, объединяющий заботу
                  о ментальном здоровье и траекторию поступления. AnyWay — о том, как поступить в вуз мечты и не сойти с ума
                  в процессе.
                </p>
                <p>
                  Для реализации проекта нам необходим разработчик Mini App в Telegram. Пользователи смогут выбрать вуз и
                  направление, а мы расскажем о всех олимпиадах и прочих конкурсах для преимущественного поступления.
                </p>
                <p>
                  В приложении можно прочитать краткую информацию про выбранную олимпиаду: особенности, дедлайны, способы
                  подготовки. Выбранные олимпиады автоматически попадают в персональный календарь с ключевыми датами —
                  от регистрации до заключительного этапа — и напоминаниями о дедлайнах.
                </p>
                <p>
                  Через Mini App можно подключиться к сообществу олимпиадников — закрытый Telegram канал-папка с подразделениями
                  по вузам. У каждого чата будет куратор-студент, который делится «внутрянкой» вуза, публикует видео и отвечает
                  на вопросы.
                </p>
                <p>
                  Также мы помогаем найти напарника для учёбы: анкета с ответами на вопросы и ником в Telegram, по которым
                  пользователи смогут находить друг друга и общаться.
                </p>
                <p className="font-medium">
                  Смогла бы ты сделать такое приложение и если да — за какую стоимость? 🥺
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setAboutOpen(false)} style={{ backgroundColor: "#051F45", color: "#fff" }}>
                  Понятно
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs" style={{ color: "#98A2B3" }}>
            AnyWay v1.0 • Сделано с ❤️ в Сколково
          </p>
        </div>
      </div>
  )
}
