"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { CalendarEvent } from "./event-modal"

interface Direction {
  id: number
  name: string
  code: string
  budgetPlaces: number
  passingScore: number
}

interface University {
  id: number
  name: string
  shortName: string
  logo: string
  directions: Direction[]
}

type OlympiadType = "БВИ" | "100 баллов"

interface Olympiad {
  id: number
  name: string
  level: string | number
  type: OlympiadType
  subject: string
  validYears: string
  registration: string
  qualifying: string
  final: string
  features: string
  faculty?: string
  groups?: string[]
  requirementNote?: string
  appliesToSubjects?: string[]
  universityShortName?: string
}

interface UniversitySelectionProps {
  onAddToCalendar?: (event: CalendarEvent) => void
}

// ------------------------ ВУЗЫ ------------------------
const universities: University[] = [
  {
    id: 1,
    name: "Московский государственный университет имени М.В. Ломоносова",
    shortName: "МГУ",
    logo: "🏛️",
    directions: [
      { id: 1, name: "Математика", code: "01.03.01", budgetPlaces: 120, passingScore: 350 },
      { id: 2, name: "Физика", code: "03.03.02", budgetPlaces: 180, passingScore: 340 },
      { id: 3, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 90, passingScore: 360 },
    ],
  },
  {
    id: 2,
    name: "Московский физико-технический институт",
    shortName: "МФТИ",
    logo: "🚀",
    directions: [
      { id: 4, name: "Прикладная математика и физика", code: "03.03.01", budgetPlaces: 300, passingScore: 340 },
      { id: 5, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 180, passingScore: 350 },
    ],
  },
]

// ------------------------ БАЗОВЫЕ ОЛИМПИАДЫ ПО ПРОФИЛЮ ------------------------
const olympiads: Record<number, Olympiad[]> = {
  1: [
    {
      id: 1,
      name: "Всероссийская олимпиада школьников по математике (ВсОШ)",
      level: "ВсОШ",
      type: "БВИ",
      subject: "Математика",
      validYears: "10-11 класс",
      registration: "2025-09-01",
      qualifying: "2025-10-15",
      final: "2025-04-10",
      features: "БВИ в ведущие вузы России",
    },
    {
      id: 2,
      name: "Московская математическая олимпиада",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "9-11 класс",
      registration: "2025-09-15",
      qualifying: "2025-11-01",
      final: "2025-03-15",
      features: "БВИ в МГУ, МФТИ, ВШЭ",
    },
    {
      id: 3,
      name: "Турнир городов",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "8-11 класс",
      registration: "2025-09-20",
      qualifying: "2025-10-20",
      final: "2025-04-10",
      features: "Международная олимпиада, БВИ в топ-вузы",
    },
  ],
  2: [
    {
      id: 4,
      name: "Всероссийская олимпиада школьников по физике (ВсОШ)",
      level: "ВсОШ",
      type: "БВИ",
      subject: "Физика",
      validYears: "10-11 класс",
      registration: "2025-09-01",
      qualifying: "2025-10-20",
      final: "2025-12-12",
      features: "Включает теоретический и экспериментальный туры",
    },
    {
      id: 5,
      name: "Московская олимпиада школьников",
      level: 1,
      type: "БВИ",
      subject: "Физика",
      validYears: "9-11 класс",
      registration: "2025-09-15",
      qualifying: "2025-11-05",
      final: "2025-12-18",
      features: "Сильная физическая олимпиада Москвы",
    },
  ],
}

// ------------------------ ГЕНЕРАЦИЯ ПО ПРОФИЛЮ ------------------------
const generateOlympiadsForDirection = (directionId: number, directionName: string): Olympiad[] => {
  const baseOlympiads: Olympiad[] = []

  let subject = "Математика"
  if (directionName.toLowerCase().includes("физ")) subject = "Физика"
  else if (
      directionName.includes("Информатика") ||
      directionName.includes("Программная") ||
      directionName.toLowerCase().includes("информ")
  )
    subject = "Информатика"
  else if (directionName.toLowerCase().includes("эконом")) subject = "Экономика"
  else if (directionName.toLowerCase().includes("хим")) subject = "Химия"
  else if (directionName.toLowerCase().includes("био")) subject = "Биология"
  else if (directionName.toLowerCase().includes("истор")) subject = "История"
  else if (directionName.toLowerCase().includes("филолог") || directionName.toLowerCase().includes("лингв"))
    subject = "Русский язык"
  else if (directionName.toLowerCase().includes("журналист")) subject = "Литература"
  else if (directionName.toLowerCase().includes("юриспруд")) subject = "Обществознание"
  else if (directionName.toLowerCase().includes("геолог") || directionName.toLowerCase().includes("географ"))
    subject = "География"

  baseOlympiads.push({
    id: directionId * 1000,
    name: `Всероссийская олимпиада школьников по ${subject.toLowerCase()} (ВсОШ)`,
    level: "ВсОШ",
    type: "БВИ",
    subject,
    validYears: "10-11 класс",
    registration: "2025-09-01",
    qualifying: "2025-10-15",
    final: "2025-04-10",
    features: `Самая престижная олимпиада по ${subject.toLowerCase()}. Дает БВИ на все направления по профилю.`,
  })

  if (subject === "Математика") {
    baseOlympiads.push({
      id: directionId * 1000 + 1,
      name: "Московская олимпиада школьников",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "9-11 класс",
      registration: "2025-09-15",
      qualifying: "2025-11-01",
      final: "2025-03-15",
      features: "Региональная олимпиада высокого уровня",
    })
    baseOlympiads.push({
      id: directionId * 1000 + 2,
      name: "Турнир городов",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "8-11 класс",
      registration: "2025-09-20",
      qualifying: "2025-10-20",
      final: "2025-03-20",
      features: "Международная математическая олимпиада",
    })
  } else if (subject === "Физика") {
    baseOlympiads.push({
      id: directionId * 1000 + 1,
      name: "Московская олимпиада школьников",
      level: 1,
      type: "БВИ",
      subject: "Физика",
      validYears: "9-11 класс",
      registration: "2025-09-15",
      qualifying: "2025-11-05",
      final: "2025-04-18",
      features: "Сильная физическая олимпиада Москвы",
    })
    baseOlympiads.push({
      id: directionId * 1000 + 2,
      name: "Олимпиада школьников «Физтех»",
      level: 1,
      type: "БВИ",
      subject: "Физика",
      validYears: "9-11 класс",
      registration: "2025-10-01",
      qualifying: "2025-11-10",
      final: "2025-01-25",
      features: "Олимпиада МФТИ по физике",
    })
  } else if (subject === "Информатика") {
    baseOlympiads.push({
      id: directionId * 1000 + 1,
      name: "Открытая олимпиада школьников по программированию",
      level: 1,
      type: "БВИ",
      subject: "Информатика",
      validYears: "9-11 класс",
      registration: "2025-10-01",
      qualifying: "2025-11-10",
      final: "2025-01-15",
      features: "Спортивное программирование",
    })
    baseOlympiads.push({
      id: directionId * 1000 + 2,
      name: "Олимпиада школьников по программированию «ТехноКубок»",
      level: 2,
      type: "100 баллов",
      subject: "Информатика",
      validYears: "8-11 класс",
      registration: "2025-09-25",
      qualifying: "2025-11-15",
      final: "2025-01-20",
      features: "Даёт 100 баллов ЕГЭ (подтверждение 75+), без БВИ для ряда вузов",
    })
  }

  return baseOlympiads
}

const UniversitySelection = ({ onAddToCalendar }: UniversitySelectionProps) => {
  const [selectedOlympiads, setSelectedOlympiads] = useState<number[]>([])
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null)
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalData, setModalData] = useState<{
    isOpen: boolean
    olympiad?: Olympiad
    eventType?: "registration" | "qualifying" | "final"
  }>({ isOpen: false })

  const handleSelectOlympiad = (olympiadId: number) => {
    setSelectedOlympiads((prev) =>
        prev.includes(olympiadId) ? prev.filter((id) => id !== olympiadId) : [...prev, olympiadId],
    )
  }

  const directionOlympiads = selectedDirection
      ? generateOlympiadsForDirection(
          selectedDirection,
          universities.flatMap((u) => u.directions).find((d) => d.id === selectedDirection)?.name || "",
      )
      : []

  const showEventModal = (olympiad: Olympiad, eventType: "registration" | "qualifying" | "final") => {
    setModalData({
      isOpen: true,
      olympiad,
      eventType,
    })
  }

  const handleAddToCalendar = (event: CalendarEvent) => {
    if (onAddToCalendar) {
      onAddToCalendar(event)
    }
    setModalData({ isOpen: false })
  }

  const filteredUniversities = universities.filter(
      (university) =>
          university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          university.shortName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const subjectFromDirection = (name?: string) => {
    if (!name) return "Математика"
    const n = name.toLowerCase()
    if (n.includes("физ")) return "Физика"
    if (n.includes("информ") || n.includes("программ")) return "Информатика"
    if (n.includes("хим")) return "Химия"
    if (n.includes("био")) return "Биология"
    if (n.includes("экон")) return "Экономика"
    if (n.includes("юриспруд")) return "Обществознание"
    if (n.includes("геолог") || n.includes("географ")) return "География"
    return "Математика"
  }

  const directionContext = useMemo(() => {
    if (!selectedDirection) return null
    const direction = universities.flatMap((u) => u.directions).find((d) => d.id === selectedDirection)
    const uni = universities.find((u) => u.directions.some((d) => d.id === selectedDirection))
    const subj = subjectFromDirection(direction?.name)
    return { direction, uni, subj }
  }, [selectedDirection])

  if (selectedDirection) {
    const direction = universities.flatMap((u) => u.directions).find((d) => d.id === selectedDirection)

    return (
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedDirection(null)} className="text-primary">
              ← Назад
            </Button>
          </div>

          <div className="bg-light-gray p-4 rounded-lg mb-4">{/* Render direction olympiads here */}</div>
        </div>
    )
  }

  return (
      <div className="p-4 space-y-4">
        <Input
            type="text"
            placeholder="Поиск вуза"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
        />

        {filteredUniversities.map((university) => (
            <Card key={university.id} className="p-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{university.logo}</span>
                <div>
                  <h3 className="font-bold">{university.name}</h3>
                  <p className="text-sm text-muted-foreground">{university.shortName}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {university.directions.map((direction) => (
                    <Button
                        key={direction.id}
                        variant="outline"
                        onClick={() => setSelectedDirection(direction.id)}
                        className="w-full"
                    >
                      {direction.name}
                    </Button>
                ))}
              </div>
            </Card>
        ))}
      </div>
  )
}

export { UniversitySelection }
