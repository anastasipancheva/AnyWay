"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SelfTracking } from "./self-tracking"

interface ProfileProps {
  user: any
}

export function Profile({ user }: ProfileProps) {
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

  return (
      <div className="p-4 space-y-4">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl">👤</span>
          </div>
          <h2 className="text-xl font-bold text-primary">
            {user?.first_name || "Пользователь"}
          </h2>
          <p className="text-sm text-neutral-gray">@{user?.username || "username"}</p>
          <Badge
              className="mt-2 bg-[#051F45] !text-white px-3 py-1 rounded-full"
          >
            Активный участник
          </Badge>
        </div>

        {/* Self-Tracking */}
        <div className="mb-6">
          <h3 className="font-semibold text-primary mb-3">Селф-трекинг</h3>
          <SelfTracking />
        </div>

        {/* Statistics */}
        <Card className="p-4">
          <h3 className="font-semibold text-primary mb-3">Ваша статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.selectedOlympiads}</div>
              <div className="text-xs text-neutral-gray">Выбрано олимпиад</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.calendarEvents}</div>
              <div className="text-xs text-neutral-gray">События в календаре</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.studyBuddyConnections}</div>
              <div className="text-xs text-neutral-gray">Связи StudyBuddy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.joinedChats}</div>
              <div className="text-xs text-neutral-gray">Чатов присоединено</div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4">
          <h3 className="font-semibold text-primary mb-3">Достижения</h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
                <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                        achievement.earned ? "bg-accent/20" : "bg-neutral-gray/10"
                    }`}
                >
                  <div className={`text-2xl ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4
                        className={`font-medium ${
                            achievement.earned ? "text-primary" : "text-neutral-gray"
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
        <Card className="p-4">
          <h3 className="font-semibold text-primary mb-3">Настройки</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary">Уведомления о дедлайнах</span>
              <div className="w-12 h-6 bg-primary rounded-full flex items-center p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary">Еженедельная сводка</span>
              <div className="w-12 h-6 bg-primary rounded-full flex items-center p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary">Новые сообщения StudyBuddy</span>
              <div className="w-12 h-6 bg-neutral-gray/30 rounded-full flex items-center p-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-primary border-primary bg-transparent">
            Поделиться приложением
          </Button>
          <Button variant="outline" className="w-full text-primary border-primary bg-transparent">
            Связаться с поддержкой
          </Button>
          <Button variant="ghost" className="w-full text-neutral-gray">
            О приложении
          </Button>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-neutral-gray">
            AnyWay v1.0 • Сделано с ❤️ в Сколково
          </p>
        </div>
      </div>
  )
}
