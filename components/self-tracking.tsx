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

// Helper UI bits
function StepHeader({
                        title,
                        subtitle,
                    }: {
    title: string
    subtitle?: string
}) {
    return (
        <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-primary text-[#051F45] tracking-tight mb-2">
                {title}
            </h3>
            {subtitle ? (
                <p className="text-xs text-[#98A2B3]">{subtitle}</p>
            ) : null}
        </div>
    )
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
    const items = [1, 2, 3] as const
    return (
        <div className="flex items-center justify-center gap-2 mb-5">
            {items.map((i) => (
                <span
                    key={i}
                    className={
                        "h-1.5 w-8 rounded-full transition-all " +
                        (i <= step
                            ? "bg-[#051F45]"
                            : "bg-[#98A2B3] bg-opacity-40")
                    }
                    aria-hidden
                />
            ))}
        </div>
    )
}

function Tag({
                 active,
                 label,
                 onClick,
             }: {
    active: boolean
    label: string
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={
                "w-full p-3 rounded-xl text-left transition-all border " +
                (active
                    ? "bg-[#F2C4CD] bg-opacity-50 border-[#051F45] text-[#051F45] shadow-sm"
                    : "bg-[#F6F7FA] border-transparent text-[#051F45]/70 hover:bg-white")
            }
        >
            <span className="text-sm">{label}</span>
            {active && <span className="float-right">✓</span>}
        </button>
    )
}

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
        setTimeout(() => setCurrentStep("energy"), 250)
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

    // Shared card shell with soft gradient and subtle border
    const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <Card
            className="p-6 md:p-7 rounded-2xl border border-[#051F45]/10 shadow-sm bg-gradient-to-b from-white to-[#F6F7FA]"
        >
            <div className="-mt-1 mb-4 flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-[#F2C4CD] bg-opacity-60 flex items-center justify-center shadow-sm">
                    <span className="text-lg">🗓️</span>
                </div>
                <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wide text-[#98A2B3]">Сегодня</p>
                    <p className="text-xs font-medium text-[#051F45]">
                        {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "short" })}
                    </p>
                </div>
            </div>
            {children}
        </Card>
    )

    if (todayCompleted) {
        return (
            <Shell>
                <div className="text-center py-2">
                    <div className="text-5xl mb-3">✅</div>
                    <h3 className="text-lg font-semibold text-primary text-[#051F45] mb-1">Отлично!</h3>
                    <p className="text-sm text-[#98A2B3] mb-4">Вы уже отметились сегодня. Увидимся завтра!</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={resetTracking}
                        className="text-primary text-[#051F45] border-[#051F45] hover:bg-[#051F45] hover:text-white transition-colors"
                    >
                        Заполнить заново
                    </Button>
                </div>
            </Shell>
        )
    }

    if (currentStep === "complete") {
        return (
            <Shell>
                <div className="text-center py-2">
                    <div className="text-5xl mb-3">🎉</div>
                    <h3 className="text-lg font-semibold text-primary text-[#051F45] mb-1">Спасибо!</h3>
                    <p className="text-sm text-[#98A2B3] mb-4">Ваши данные сохранены. Следите за статистикой в профиле!</p>
                    <Button onClick={() => setCurrentStep("mood")} className="bg-[#051F45] text-white hover:opacity-95">
                        Готово
                    </Button>
                </div>
            </Shell>
        )
    }

    if (currentStep === "mood") {
        return (
            <Shell>
                <Stepper step={1} />
                <StepHeader title="Как прошел день?" />

                <div className="flex gap-3 overflow-x-auto pb-2">
                    {moods.map((mood) => (
                        <button
                            key={mood.id}
                            onClick={() => handleMoodSelect(mood.id)}
                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-[#F6F7FA] transition-all flex-shrink-0"
                        >
                            <div
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${mood.color} flex items-center justify-center text-white text-2xl shadow hover:shadow-md group-hover:scale-105 transition-transform`}
                            >
                                {mood.emoji}
                            </div>
                            <span className="text-xs font-medium text-primary text-[#051F45] opacity-90">
        {mood.label}
      </span>
                        </button>
                    ))}
                </div>

            </Shell>
        )
    }

    if (currentStep === "energy") {
        return (
            <Shell>
                <Stepper step={2} />
                <StepHeader title="Что дало энергию?" subtitle="Можно выбрать несколько вариантов" />

                <div className="space-y-2 mb-4">
                    {energyOptions.map((option) => (
                        <Tag key={option} label={option} active={selectedEnergy.includes(option)} onClick={() => handleEnergyToggle(option)} />
                    ))}

                    {!showCustomEnergy ? (
                        <button
                            onClick={() => setShowCustomEnergy(true)}
                            className="w-full p-3 rounded-xl text-left bg-[#F6F7FA] text-[#051F45]/70 hover:bg-white transition-all border border-transparent"
                        >
                            <span className="text-sm">+ Добавить свой вариант</span>
                        </button>
                    ) : (
                        <input
                            type="text"
                            placeholder="Введите свой вариант..."
                            value={customEnergy}
                            onChange={(e) => setCustomEnergy(e.target.value)}
                            className="w-full p-3 rounded-xl border border-[#98A2B3]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2C4CD] bg-white"
                            autoFocus
                        />
                    )}
                </div>

                <Button
                    onClick={() => setCurrentStep("hardest")}
                    disabled={selectedEnergy.length === 0 && !customEnergy}
                    className="w-full bg-[#051F45] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95"
                >
                    Далее
                </Button>
            </Shell>
        )
    }

    if (currentStep === "hardest") {
        return (
            <Shell>
                <Stepper step={3} />
                <StepHeader title="Что было самым тяжелым?" subtitle="Можно выбрать несколько вариантов" />

                <div className="space-y-2 mb-4">
                    {hardestOptions.map((option) => (
                        <Tag
                            key={option}
                            label={option}
                            active={selectedHardest.includes(option)}
                            onClick={() => handleHardestToggle(option)}
                        />
                    ))}

                    {!showCustomHardest ? (
                        <button
                            onClick={() => setShowCustomHardest(true)}
                            className="w-full p-3 rounded-xl text-left bg-[#F6F7FA] text-[#051F45]/70 hover:bg-white transition-all border border-transparent"
                        >
                            <span className="text-sm">+ Добавить свой вариант</span>
                        </button>
                    ) : (
                        <input
                            type="text"
                            placeholder="Введите свой вариант..."
                            value={customHardest}
                            onChange={(e) => setCustomHardest(e.target.value)}
                            className="w-full p-3 rounded-xl border border-[#98A2B3]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2C4CD] bg-white"
                            autoFocus
                        />
                    )}
                </div>

                <Button
                    onClick={handleSaveEntry}
                    disabled={selectedHardest.length === 0 && !customHardest}
                    className="w-full bg-[#051F45] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95"
                >
                    Сохранить
                </Button>
            </Shell>
        )
    }

    return null
}
