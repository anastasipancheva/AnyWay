"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MoodEntry {
  date: string
  mood: string
  energy: string[]
  hardest: string[]
  customEnergy?: string
  customHardest?: string
}

const moods = [
  { id: "super", label: "супер", color: "bg-green-400", emoji: "😄" },
  { id: "good", label: "хорошо", color: "bg-lime-400", emoji: "😊" },
  { id: "okay", label: "так себе", color: "bg-blue-400", emoji: "😐" },
  { id: "bad", label: "плохо", color: "bg-orange-400", emoji: "😞" },
  { id: "terrible", label: "ужасно", color: "bg-red-400", emoji: "😢" },
]

const energyOptions = [
  "друзья и семья",
  "продуктивность",
  "физическая активность",
  "хобби",
  "отдых",
  "мне просто хорошо",
]

const hardestOptions = [
  "общение",
  "недосып",
  "соц.сети",
  "беспричинная тревожность",
  "загруженность на учебе",
  "мне просто плохо",
]

export function SelfTracking() {
  const [currentStep, setCurrentStep] = useState<"mood" | "energy" | "hardest" | "complete">("mood")
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [selectedEnergy, setSelectedEnergy] = useState<string[]>([])
  const [selectedHardest, setSelectedHardest] = useState<string[]>([])
  const [customEnergy, setCustomEnergy] = useState<string>("")
  const [customHardest, setCustomHardest] = useState<string>("")
  const [showCustomEnergy, setShowCustomEnergy] = useState(false)
  const [showCustomHardest, setShowCustomHardest] = useState(false)
  const [todayCompleted, setTodayCompleted] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if today's tracking is already completed
    const today = new Date().toDateString()
    const savedEntries = localStorage.getItem("selfTrackingEntries")
    if (savedEntries) {
      const entries: MoodEntry[] = JSON.parse(savedEntries)
      const todayEntry = entries.find((entry) => new Date(entry.date).toDateString() === today)
      if (todayEntry) {
        setTodayCompleted(true)
      }
    }
  }, [])

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId)
    setTimeout(() => setCurrentStep("energy"), 300)
  }

  const handleEnergyToggle = (option: string) => {
    setSelectedEnergy((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]))
  }

  const handleHardestToggle = (option: string) => {
    setSelectedHardest((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]))
  }

  const handleSaveEntry = () => {
    if (typeof window === "undefined") return

    const entry: MoodEntry = {
      date: new Date().toISOString(),
      mood: selectedMood,
      energy: selectedEnergy,
      hardest: selectedHardest,
      customEnergy: customEnergy || undefined,
      customHardest: customHardest || undefined,
    }

    const savedEntries = localStorage.getItem("selfTrackingEntries")
    const entries: MoodEntry[] = savedEntries ? JSON.parse(savedEntries) : []
    entries.push(entry)
    localStorage.setItem("selfTrackingEntries", JSON.stringify(entries))

    setCurrentStep("complete")
    setTodayCompleted(true)
  }

  const resetTracking = () => {
    setCurrentStep("mood")
    setSelectedMood("")
    setSelectedEnergy([])
    setSelectedHardest([])
    setCustomEnergy("")
    setCustomHardest("")
    setShowCustomEnergy(false)
    setShowCustomHardest(false)
    setTodayCompleted(false)
  }

  if (todayCompleted) {
    return (
        <Card className="p-6 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-primary mb-2">Отлично!</h3>
          <p className="text-sm text-neutral-gray mb-4">Вы уже отметились сегодня. Увидимся завтра!</p>
          <Button
              variant="outline"
              size="sm"
              onClick={resetTracking}
              className="text-primary border-primary bg-transparent"
          >
            Заполнить заново
          </Button>
        </Card>
    )
  }

  if (currentStep === "complete") {
    return (
        <Card className="p-6 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-lg font-semibold text-primary mb-2">Спасибо!</h3>
          <p className="text-sm text-neutral-gray mb-4">Ваши данные сохранены. Следите за статистикой в профиле!</p>
          <Button onClick={() => setCurrentStep("mood")} className="bg-primary text-white">
            Готово
          </Button>
        </Card>
    )
  }

  if (currentStep === "mood") {
    return (
        <Card className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Как прошел день?</h3>
            <p className="text-xs text-neutral-gray">
              📅 {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "short" })}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
                <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-neutral-light/50 transition-all"
                >
                  <div
                      className={`w-12 h-12 rounded-full ${mood.color} flex items-center justify-center text-white text-lg`}
                  >
                    {mood.emoji}
                  </div>
                  <span className="text-xs font-medium text-primary">{mood.label}</span>
                </button>
            ))}
          </div>
        </Card>
    )
  }

  if (currentStep === "energy") {
    return (
        <Card className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Что дало энергию?</h3>
            <p className="text-xs text-neutral-gray">Можно выбрать несколько вариантов</p>
          </div>

          <div className="space-y-2 mb-4">
            {energyOptions.map((option) => (
                <button
                    key={option}
                    onClick={() => handleEnergyToggle(option)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedEnergy.includes(option)
                            ? "bg-accent text-primary border border-primary"
                            : "bg-neutral-light/30 text-neutral-gray hover:bg-neutral-light/50"
                    }`}
                >
                  <span className="text-sm">{option}</span>
                  {selectedEnergy.includes(option) && <span className="float-right">✓</span>}
                </button>
            ))}

            {!showCustomEnergy ? (
                <button
                    onClick={() => setShowCustomEnergy(true)}
                    className="w-full p-3 rounded-lg text-left bg-neutral-light/30 text-neutral-gray hover:bg-neutral-light/50 transition-all"
                >
                  <span className="text-sm">+ Добавить свой вариант</span>
                </button>
            ) : (
                <input
                    type="text"
                    placeholder="Введите свой вариант..."
                    value={customEnergy}
                    onChange={(e) => setCustomEnergy(e.target.value)}
                    className="w-full p-3 rounded-lg border border-neutral-gray/30 text-sm"
                    autoFocus
                />
            )}
          </div>

          <Button
              onClick={() => setCurrentStep("hardest")}
              disabled={selectedEnergy.length === 0 && !customEnergy}
              className="w-full bg-primary text-white"
          >
            Далее
          </Button>
        </Card>
    )
  }

  if (currentStep === "hardest") {
    return (
        <Card className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Что было самым тяжелым?</h3>
            <p className="text-xs text-neutral-gray">Можно выбрать несколько вариантов</p>
          </div>

          <div className="space-y-2 mb-4">
            {hardestOptions.map((option) => (
                <button
                    key={option}
                    onClick={() => handleHardestToggle(option)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedHardest.includes(option)
                            ? "bg-accent text-primary border border-primary"
                            : "bg-neutral-light/30 text-neutral-gray hover:bg-neutral-light/50"
                    }`}
                >
                  <span className="text-sm">{option}</span>
                  {selectedHardest.includes(option) && <span className="float-right">✓</span>}
                </button>
            ))}

            {!showCustomHardest ? (
                <button
                    onClick={() => setShowCustomHardest(true)}
                    className="w-full p-3 rounded-lg text-left bg-neutral-light/30 text-neutral-gray hover:bg-neutral-light/50 transition-all"
                >
                  <span className="text-sm">+ Добавить свой вариант</span>
                </button>
            ) : (
                <input
                    type="text"
                    placeholder="Введите свой вариант..."
                    value={customHardest}
                    onChange={(e) => setCustomHardest(e.target.value)}
                    className="w-full p-3 rounded-lg border border-neutral-gray/30 text-sm"
                    autoFocus
                />
            )}
          </div>

          <Button
              onClick={handleSaveEntry}
              disabled={selectedHardest.length === 0 && !customHardest}
              className="w-full bg-primary text-white"
          >
            Сохранить
          </Button>
        </Card>
    )
  }

  return null
}
