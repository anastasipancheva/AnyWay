"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Trophy, Info } from "lucide-react"
import { EventModal, type CalendarEvent } from "./event-modal"

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
      { id: 4, name: "Экономика", code: "38.03.01", budgetPlaces: 150, passingScore: 380 },
      { id: 5, name: "Журналистика", code: "42.03.02", budgetPlaces: 80, passingScore: 370 },
      { id: 6, name: "Химия", code: "04.03.01", budgetPlaces: 140, passingScore: 330 },
      { id: 7, name: "Биология", code: "06.03.01", budgetPlaces: 160, passingScore: 320 },
      { id: 8, name: "История", code: "46.03.01", budgetPlaces: 100, passingScore: 350 },
      { id: 9, name: "Филология", code: "45.03.01", budgetPlaces: 120, passingScore: 340 },
      { id: 10, name: "Психология", code: "37.03.01", budgetPlaces: 70, passingScore: 365 },
      { id: 11, name: "Социология", code: "39.03.01", budgetPlaces: 60, passingScore: 355 },
      { id: 12, name: "Международные отношения", code: "41.03.05", budgetPlaces: 50, passingScore: 385 },
    ],
  },
  {
    id: 2,
    name: "Московский физико-технический институт",
    shortName: "МФТИ",
    logo: "🚀",
    directions: [
      { id: 13, name: "Прикладная математика и физика", code: "03.03.01", budgetPlaces: 300, passingScore: 340 },
      { id: 14, name: "Физика", code: "03.03.02", budgetPlaces: 200, passingScore: 330 },
      { id: 15, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 180, passingScore: 350 },
      { id: 16, name: "Прикладная математика и информатика", code: "01.03.02", budgetPlaces: 150, passingScore: 345 },
      { id: 17, name: "Системный анализ и управление", code: "27.03.03", budgetPlaces: 100, passingScore: 320 },
      { id: 18, name: "Биотехнические системы и технологии", code: "12.03.01", budgetPlaces: 80, passingScore: 310 },
      { id: 19, name: "Радиофизика", code: "03.03.03", budgetPlaces: 90, passingScore: 325 },
      { id: 20, name: "Аэрокосмические технологии", code: "24.03.02", budgetPlaces: 70, passingScore: 335 },
      { id: 21, name: "Экономика", code: "38.03.01", budgetPlaces: 60, passingScore: 340 },
      { id: 22, name: "Менеджмент", code: "38.03.02", budgetPlaces: 50, passingScore: 330 },
      { id: 23, name: "Химия", code: "04.03.01", budgetPlaces: 40, passingScore: 315 },
      { id: 24, name: "Биология", code: "06.03.01", budgetPlaces: 45, passingScore: 305 },
    ],
  },
  {
    id: 3,
    name: "Санкт-Петербургский государственный университет",
    shortName: "СПбГУ",
    logo: "🏰",
    directions: [
      { id: 25, name: "Филология", code: "45.03.01", budgetPlaces: 90, passingScore: 290 },
      { id: 26, name: "История", code: "46.03.01", budgetPlaces: 85, passingScore: 285 },
      { id: 27, name: "Математика", code: "01.03.01", budgetPlaces: 100, passingScore: 320 },
      { id: 28, name: "Физика", code: "03.03.02", budgetPlaces: 120, passingScore: 310 },
      { id: 29, name: "Экономика", code: "38.03.01", budgetPlaces: 91, passingScore: 291 },
      { id: 30, name: "Международные отношения", code: "41.03.05", budgetPlaces: 84, passingScore: 284 },
      { id: 31, name: "Журналистика", code: "42.03.02", budgetPlaces: 70, passingScore: 300 },
      { id: 32, name: "Психология", code: "37.03.01", budgetPlaces: 80, passingScore: 295 },
      { id: 33, name: "Социология", code: "39.03.01", budgetPlaces: 60, passingScore: 280 },
      { id: 34, name: "Философия", code: "47.03.01", budgetPlaces: 50, passingScore: 275 },
      { id: 35, name: "Юриспруденция", code: "40.03.01", budgetPlaces: 110, passingScore: 305 },
      { id: 36, name: "Химия", code: "04.03.01", budgetPlaces: 90, passingScore: 290 },
    ],
  },
  {
    id: 4,
    name: "Санкт-Петербургский политехнический университет",
    shortName: "СПбПТУ",
    logo: "⚙️",
    directions: [
      { id: 37, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 295, passingScore: 295 },
      { id: 38, name: "Программная инженерия", code: "09.03.04", budgetPlaces: 310, passingScore: 310 },
      { id: 39, name: "Информационные системы и технологии", code: "09.03.02", budgetPlaces: 310, passingScore: 310 },
      { id: 40, name: "Прикладная математика и информатика", code: "01.03.02", budgetPlaces: 310, passingScore: 310 },
      { id: 41, name: "Фотоника и оптоинформатика", code: "12.03.03", budgetPlaces: 180, passingScore: 280 },
      { id: 42, name: "Биотехнология", code: "19.03.01", budgetPlaces: 120, passingScore: 270 },
      { id: 43, name: "Дизайн", code: "54.03.01", budgetPlaces: 100, passingScore: 260 },
      { id: 44, name: "Менеджмент", code: "38.03.02", budgetPlaces: 80, passingScore: 250 },
      { id: 45, name: "Экономика", code: "38.03.01", budgetPlaces: 90, passingScore: 255 },
      { id: 46, name: "Робототехника", code: "15.03.06", budgetPlaces: 150, passingScore: 285 },
      { id: 47, name: "Информационная безопасность", code: "10.03.01", budgetPlaces: 281, passingScore: 281 },
      { id: 48, name: "Физика", code: "03.03.02", budgetPlaces: 283, passingScore: 283 },
    ],
  },
  {
    id: 5,
    name: "Томский государственный университет",
    shortName: "ТГУ",
    logo: "🎓",
    directions: [
      { id: 49, name: "Математика", code: "01.03.01", budgetPlaces: 100, passingScore: 280 },
      { id: 50, name: "Физика", code: "03.03.02", budgetPlaces: 120, passingScore: 275 },
      { id: 51, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 150, passingScore: 290 },
      { id: 52, name: "Программная инженерия", code: "09.03.04", budgetPlaces: 120, passingScore: 261 },
      { id: 53, name: "Химия", code: "04.03.01", budgetPlaces: 90, passingScore: 270 },
      { id: 54, name: "Биология", code: "06.03.01", budgetPlaces: 110, passingScore: 265 },
      { id: 55, name: "Геология", code: "05.03.01", budgetPlaces: 80, passingScore: 260 },
      { id: 56, name: "География", code: "05.03.02", budgetPlaces: 70, passingScore: 255 },
      { id: 57, name: "История", code: "46.03.01", budgetPlaces: 85, passingScore: 275 },
      { id: 58, name: "Филология", code: "45.03.01", budgetPlaces: 95, passingScore: 280 },
      { id: 59, name: "Экономика", code: "38.03.01", budgetPlaces: 100, passingScore: 285 },
      { id: 60, name: "Юриспруденция", code: "40.03.01", budgetPlaces: 90, passingScore: 290 },
      { id: 61, name: "Психология", code: "37.03.01", budgetPlaces: 60, passingScore: 285 },
    ],
  },
  {
    id: 6,
    name: "Новосибирский государственный университет",
    shortName: "НГУ",
    logo: "🧬",
    directions: [
      { id: 62, name: "Математика", code: "01.03.01", budgetPlaces: 120, passingScore: 320 },
      { id: 63, name: "Физика", code: "03.03.02", budgetPlaces: 140, passingScore: 315 },
      { id: 64, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 160, passingScore: 330 },
      { id: 65, name: "Прикладная математика и информатика", code: "01.03.02", budgetPlaces: 120, passingScore: 325 },
      { id: 66, name: "Биология", code: "06.03.01", budgetPlaces: 120, passingScore: 305 },
    ],
  },
  {
    id: 7,
    name: "Сибирский федеральный университет",
    shortName: "СФУ",
    logo: "🌲",
    directions: [
      { id: 67, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 200, passingScore: 275 },
      { id: 68, name: "Машиностроение", code: "15.03.01", budgetPlaces: 180, passingScore: 260 },
      { id: 69, name: "Энергетика", code: "13.03.02", budgetPlaces: 150, passingScore: 265 },
      { id: 70, name: "Строительство", code: "08.03.01", budgetPlaces: 220, passingScore: 250 },
      { id: 71, name: "Робототехника", code: "15.03.06", budgetPlaces: 120, passingScore: 270 },
    ],
  },
  {
    id: 8,
    name: "Уральский федеральный университет",
    shortName: "УрФУ",
    logo: "⛰️",
    directions: [
      { id: 72, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 180, passingScore: 285 },
      { id: 73, name: "Программная инженерия", code: "09.03.04", budgetPlaces: 160, passingScore: 295 },
      { id: 74, name: "Электроэнергетика", code: "13.03.02", budgetPlaces: 160, passingScore: 280 },
      { id: 75, name: "Машиностроение", code: "15.03.01", budgetPlaces: 200, passingScore: 270 },
      { id: 76, name: "Физика", code: "03.03.02", budgetPlaces: 90, passingScore: 280 },
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
      final: "2026-04-10",
      features: "Самая престижная олимпиада по математике. БВИ в ведущие вузы России",
    },
    {
      id: 2,
      name: "Московская олимпиада школьников",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "9-11 класс",
      registration: "2025-09-15",
      qualifying: "2025-11-01",
      final: "2026-03-15",
      features: "Региональная олимпиада высокого уровня. БВИ в МГУ, МФТИ, ВШЭ",
    },
    {
      id: 3,
      name: "Олимпиада школьников «Ломоносов»",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "10-11 класс",
      registration: "2025-10-01",
      qualifying: "2025-11-15",
      final: "2026-01-20",
      features: "Олимпиада МГУ по математике. БВИ на математические направления",
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
      final: "2026-04-12",
      features: "Включает теоретический и экспериментальный туры. БВИ на физические направления",
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
      final: "2026-04-18",
      features: "Сильная физическая олимпиада Москвы. БВИ в МФТИ, МГУ",
    },
  ],
  3: [
    {
      id: 6,
      name: "Всероссийская олимпиада школьников по информатике (ВсОШ)",
      level: "ВсОШ",
      type: "БВИ",
      subject: "Информатика",
      validYears: "10-11 класс",
      registration: "2025-09-01",
      qualifying: "2025-10-25",
      final: "2026-04-20",
      features: "Программирование на Pascal, C++, Python. БВИ на IT-направления",
    },
    {
      id: 7,
      name: "Открытая олимпиада школьников по программированию",
      level: 1,
      type: "БВИ",
      subject: "Информатика",
      validYears: "9-11 класс",
      registration: "2025-10-01",
      qualifying: "2025-11-10",
      final: "2026-01-15",
      features: "Спортивное программирование. БВИ в ИТМО, МФТИ, МГУ",
    },
  ],
  4: [
    {
      id: 8,
      name: "Всероссийская олимпиада школьников «Высшая проба»",
      level: 1,
      type: "БВИ",
      subject: "Экономика",
      validYears: "10-11 класс",
      registration: "2025-10-01",
      qualifying: "2025-11-20",
      final: "2026-02-10",
      features: "Олимпиада НИУ ВШЭ по экономике. БВИ на экономические направления",
    },
    {
      id: 9,
      name: "Всероссийская экономическая олимпиада школьников имени Н.Д. Кондратьева",
      level: 1,
      type: "БВИ",
      subject: "Экономика",
      validYears: "10-11 класс",
      registration: "2025-09-20",
      qualifying: "2025-11-25",
      final: "2026-01-25",
      features: "Престижная экономическая олимпиада. БВИ в ведущие экономические вузы",
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
    final: "2026-04-10",
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
      final: "2026-03-15",
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
      final: "2026-03-20",
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
      final: "2026-04-18",
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
      final: "2026-01-25",
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
      final: "2026-01-15",
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
      final: "2026-01-20",
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
    console.log("[v0] UniversitySelection received event to add:", event)
    console.log("[v0] onAddToCalendar prop exists:", !!onAddToCalendar)

    if (onAddToCalendar) {
      console.log("[v0] Calling onAddToCalendar with event:", event)
      onAddToCalendar(event)
    } else {
      console.log("[v0] ERROR: onAddToCalendar prop is missing!")
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

  // ===================== ВЕТКА 1: выбранное НАПРАВЛЕНИЕ =====================
  if (selectedDirection) {
    const direction = universities.flatMap((u) => u.directions).find((d) => d.id === selectedDirection)
    const university = universities.find((u) => u.directions.some((d) => d.id === selectedDirection))

    return (
        <div className="p-4 space-y-4" style={{ backgroundColor: "#F6F7FA" }}>
          <div className="flex items-center gap-2 mb-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDirection(null)}
                style={{ color: "#051F45" }}
                className="hover:bg-white"
            >
              ← Назад
            </Button>
          </div>

          <div
              className="p-6 rounded-lg mb-6 border"
              style={{
                background: "linear-gradient(135deg, #F2C4CD 0%, #F6F7FA 100%)",
                borderColor: "#98A2B3",
              }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{university?.logo}</span>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "#051F45" }}>
                  {direction?.name}
                </h2>
                <p className="text-sm" style={{ color: "#98A2B3" }}>
                  {university?.shortName}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                Бюджет: {direction?.budgetPlaces} мест
              </Badge>
              <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                Проходной: {direction?.passingScore}+ баллов
              </Badge>
            </div>
          </div>

          <div className="p-4 rounded-lg mb-4 border" style={{ backgroundColor: "white", borderColor: "#98A2B3" }}>
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5" style={{ color: "#051F45" }} />
              <div className="text-sm">
                <p style={{ color: "#051F45" }} className="font-medium mb-1">
                  Информация о БВИ (Без вступительных испытаний):
                </p>
                <p style={{ color: "#98A2B3" }}>
                  {university?.shortName === "ТГУ"
                      ? "В ТГУ любая олимпиада из перечня РСОШ дает право на БВИ при поступлении на соответствующие направления."
                      : "Любая профильная олимпиада 1 уровня дает БВИ при поступлении на соответствующие направления."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: "#051F45" }}>
              <Trophy className="h-5 w-5" style={{ color: "#F2C4CD" }} />
              Олимпиады для поступления
            </h3>

            {directionOlympiads.map((olympiad) => (
                <Card
                    key={olympiad.id}
                    className="p-4 hover:shadow-md transition-shadow"
                    style={{ backgroundColor: "white", borderColor: "#98A2B3" }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2" style={{ color: "#051F45" }}>
                          {olympiad.name}
                        </h4>
                        <div className="flex gap-2 mb-2">
                          <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                            {typeof olympiad.level === "number" ? `${olympiad.level} уровень` : olympiad.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs" style={{ borderColor: "#051F45", color: "#051F45" }}>
                            {olympiad.subject}
                          </Badge>
                          <Badge
                              variant={olympiad.type === "БВИ" ? "default" : "secondary"}
                              className="text-xs"
                              style={{
                                backgroundColor: olympiad.type === "БВИ" ? "#051F45" : "#98A2B3",
                                color: "white",
                              }}
                          >
                            {olympiad.type}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3" style={{ color: "#98A2B3" }}>
                          {olympiad.features}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => showEventModal(olympiad, "registration")}
                          className="flex items-center gap-2 hover:bg-blue-50"
                          style={{
                            color: "#051F45",
                            borderColor: "#F2C4CD",
                            backgroundColor: "rgba(242, 196, 205, 0.1)",
                          }}
                      >
                        <Calendar className="h-3 w-3" />
                        Регистрация
                        <span className="text-xs" style={{ color: "#98A2B3" }}>
                      {new Date(olympiad.registration).toLocaleDateString("ru")}
                    </span>
                      </Button>

                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => showEventModal(olympiad, "qualifying")}
                          className="flex items-center gap-2 hover:bg-yellow-50"
                          style={{
                            color: "#051F45",
                            borderColor: "#F2C4CD",
                            backgroundColor: "rgba(242, 196, 205, 0.1)",
                          }}
                      >
                        <Clock className="h-3 w-3" />
                        Отборочный
                        <span className="text-xs" style={{ color: "#98A2B3" }}>
                      {new Date(olympiad.qualifying).toLocaleDateString("ru")}
                    </span>
                      </Button>

                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => showEventModal(olympiad, "final")}
                          className="flex items-center gap-2 hover:bg-green-50"
                          style={{
                            color: "#051F45",
                            borderColor: "#F2C4CD",
                            backgroundColor: "rgba(242, 196, 205, 0.1)",
                          }}
                      >
                        <Trophy className="h-3 w-3" />
                        Заключительный
                        <span className="text-xs" style={{ color: "#98A2B3" }}>
                      {new Date(olympiad.final).toLocaleDateString("ru")}
                    </span>
                      </Button>
                    </div>
                  </div>
                </Card>
            ))}
          </div>

          {modalData.isOpen && modalData.olympiad && modalData.eventType && (
              <EventModal
                  isOpen={modalData.isOpen}
                  onClose={() => setModalData({ isOpen: false })}
                  onAddToCalendar={handleAddToCalendar}
                  olympiadName={modalData.olympiad.name}
                  eventType={modalData.eventType}
                  date={
                    modalData.eventType === "registration"
                        ? modalData.olympiad.registration
                        : modalData.eventType === "qualifying"
                            ? modalData.olympiad.qualifying
                            : modalData.olympiad.final
                  }
                  subject={modalData.olympiad.subject}
                  level={modalData.olympiad.level}
                  features={modalData.olympiad.features}
              />
          )}
        </div>
    )
  }

  // ===================== ВЕТКА 2: выбран ВУЗ (НО не направление) =====================
  if (selectedUniversity) {
    const university = universities.find((u) => u.id === selectedUniversity)

    return (
        <div className="p-4 space-y-4" style={{ backgroundColor: "#F6F7FA" }}>
          <div className="flex items-center gap-2 mb-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedUniversity(null)}
                style={{ color: "#051F45" }}
                className="hover:bg-white"
            >
              ← Назад
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{university?.logo}</div>
            <h2 className="text-lg font-bold" style={{ color: "#051F45" }}>
              {university?.name}
            </h2>
            <p className="text-sm" style={{ color: "#98A2B3" }}>
              Выберите направление
            </p>
          </div>

          <div className="space-y-3">
            {university?.directions.map((direction) => (
                <Card
                    key={direction.id}
                    className="p-4 hover:shadow-md transition-all cursor-pointer border"
                    style={{ backgroundColor: "white", borderColor: "#98A2B3" }}
                    onClick={() => setSelectedDirection(direction.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold" style={{ color: "#051F45" }}>
                        {direction.name}
                      </h3>
                      <p className="text-xs" style={{ color: "#98A2B3" }}>{direction.code}</p>
                      <div className="flex gap-4 mt-2 text-xs" style={{ color: "#98A2B3" }}>
                    <span>
                      Бюджет: <span style={{ color: "#051F45" }}>{direction.budgetPlaces}</span>
                    </span>
                        <span>
                      Проходной: <span style={{ color: "#051F45" }}>{direction.passingScore}</span>
                    </span>
                      </div>
                    </div>
                    <div className="text-xl" style={{ color: "#98A2B3" }}>→</div>
                  </div>
                </Card>
            ))}
          </div>
        </div>
    )
  }

  // ===================== ВЕТКА 3: стартовый экран (выбор ВУЗа) =====================
  return (
      <div className="p-4 space-y-4" style={{ backgroundColor: "#F6F7FA" }}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#051F45" }}>
            Выберите вуз
          </h1>
          <p className="text-sm" style={{ color: "#98A2B3" }}>
            Найдите олимпиады для поступления
          </p>
        </div>

        <Input
            type="text"
            placeholder="Поиск вуза..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
            style={{ borderColor: "#98A2B3" }}
        />

        <div className="space-y-3">
          {filteredUniversities.map((university) => (
              <Card
                  key={university.id}
                  className="p-4 hover:shadow-md transition-all cursor-pointer border"
                  style={{ backgroundColor: "white", borderColor: "#98A2B3" }}
                  onClick={() => setSelectedUniversity(university.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{university.logo}</div>
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "#051F45" }}>
                        {university.shortName}
                      </h3>
                      <p className="text-sm" style={{ color: "#98A2B3" }}>
                        {university.name}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#F2C4CD" }}>
                        {university.directions.length} направлений
                      </p>
                    </div>
                  </div>
                  <div className="text-xl" style={{ color: "#98A2B3" }}>
                    →
                  </div>
                </div>
              </Card>
          ))}
        </div>
      </div>
  )
}

export { UniversitySelection }

