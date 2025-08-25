"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const profiles = [
  {
    id: 1,
    name: "Мария",
    age: 17,
    university: "МГУ",
    direction: "Математика",
    olympiad: "ВсОШ Математика",
    timezone: "МСК",
    telegram: "@maria_math",
    comment: "Ищу напарника для подготовки к олимпиаде по математике. Уровень - призёр регионального этапа.",
    avatar: "👩‍🎓",
  },
  {
    id: 2,
    name: "Алексей",
    age: 16,
    university: "МФТИ",
    direction: "Физика",
    olympiad: "ВсОШ Физика",
    timezone: "МСК+3",
    telegram: "@alex_physics",
    comment: "Готовлюсь к физике, хочу найти команду для решения задач и обсуждения сложных тем.",
    avatar: "👨‍🔬",
  },
  {
    id: 3,
    name: "София",
    age: 17,
    university: "ВШЭ",
    direction: "Экономика",
    olympiad: "Высшая проба",
    timezone: "МСК",
    telegram: "@sofia_eco",
    comment: "Изучаю экономику, ищу единомышленников для подготовки к олимпиадам и поступления.",
    avatar: "👩‍💼",
  },
]

interface StudyBuddyProps {
  user: any
}

export function StudyBuddy({ user }: StudyBuddyProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.first_name || "",
    age: "",
    university: "",
    direction: "",
    olympiad: "",
    timezone: "МСК",
    telegram: user?.username ? `@${user.username}` : "",
    comment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would save the profile
    console.log("Profile saved:", formData)
    setShowForm(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (showForm) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="text-primary">
            ← Назад
          </Button>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-primary mb-2">Создать анкету</h2>
          <p className="text-sm text-neutral-gray">Расскажите о себе, чтобы найти напарника</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Имя</label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ваше имя"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Возраст</label>
            <Input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              placeholder="16"
              min="14"
              max="19"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Куда поступаете</label>
            <Input
              value={formData.university}
              onChange={(e) => handleInputChange("university", e.target.value)}
              placeholder="МГУ, МФТИ, ВШЭ..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Направление</label>
            <Input
              value={formData.direction}
              onChange={(e) => handleInputChange("direction", e.target.value)}
              placeholder="Математика, Физика, Экономика..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Олимпиада</label>
            <Input
              value={formData.olympiad}
              onChange={(e) => handleInputChange("olympiad", e.target.value)}
              placeholder="ВсОШ Математика, Высшая проба..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Часовой пояс</label>
            <select
              value={formData.timezone}
              onChange={(e) => handleInputChange("timezone", e.target.value)}
              className="w-full p-2 border border-neutral-gray/20 rounded-lg"
              required
            >
              <option value="МСК-1">МСК-1 (Калининград)</option>
              <option value="МСК">МСК (Москва)</option>
              <option value="МСК+1">МСК+1 (Самара)</option>
              <option value="МСК+2">МСК+2 (Екатеринбург)</option>
              <option value="МСК+3">МСК+3 (Омск)</option>
              <option value="МСК+4">МСК+4 (Красноярск)</option>
              <option value="МСК+5">МСК+5 (Иркутск)</option>
              <option value="МСК+6">МСК+6 (Якутск)</option>
              <option value="МСК+7">МСК+7 (Владивосток)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Telegram</label>
            <Input
              value={formData.telegram}
              onChange={(e) => handleInputChange("telegram", e.target.value)}
              placeholder="@username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">О себе</label>
            <Textarea
              value={formData.comment}
              onChange={(e) => handleInputChange("comment", e.target.value)}
              placeholder="Расскажите о своих целях, уровне подготовки, что ищете в напарнике..."
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-white">
            Создать анкету
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">StudyBuddy</h2>
        <p className="text-sm text-neutral-gray">Найдите напарника для подготовки</p>
      </div>

      <Button onClick={() => setShowForm(true)} className="w-full bg-accent text-primary font-semibold">
        + Создать анкету
      </Button>

      <div className="space-y-4">
        <h3 className="font-semibold text-primary">Анкеты других участников</h3>

        {profiles.map((profile) => (
          <Card key={profile.id} className="p-4 card-hover">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-2xl">{profile.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-primary">{profile.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {profile.age} лет
                  </Badge>
                </div>
                <div className="space-y-1 text-xs text-neutral-gray">
                  <p>
                    <strong>Вуз:</strong> {profile.university}
                  </p>
                  <p>
                    <strong>Направление:</strong> {profile.direction}
                  </p>
                  <p>
                    <strong>Олимпиада:</strong> {profile.olympiad}
                  </p>
                  <p>
                    <strong>Часовой пояс:</strong> {profile.timezone}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-primary mb-3">{profile.comment}</p>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-primary text-white"
                onClick={() => window.open(`https://t.me/${profile.telegram.replace("@", "")}`, "_blank")}
              >
                Написать {profile.telegram}
              </Button>
              <Button size="sm" variant="outline" className="text-primary bg-transparent">
                ❤️
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
