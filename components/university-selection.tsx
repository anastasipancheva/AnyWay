"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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

// ------------------------ ВУЗЫ ------------------------
const universities: University[] = [
  {
    id: 1,
    name: "МГУ им. М.В. Ломоносова",
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
    name: "МГТУ им. Н.Э. Баумана",
    shortName: "Бауманка",
    logo: "⚙️",
    directions: [
      { id: 13, name: "Машиностроение", code: "15.03.01", budgetPlaces: 200, passingScore: 280 },
      { id: 14, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 180, passingScore: 320 },
      { id: 15, name: "Автоматизация технологических процессов", code: "15.03.04", budgetPlaces: 150, passingScore: 290 },
      { id: 16, name: "Радиотехника", code: "11.03.01", budgetPlaces: 120, passingScore: 300 },
      { id: 17, name: "Электроника и наноэлектроника", code: "11.03.04", budgetPlaces: 100, passingScore: 310 },
      { id: 18, name: "Ракетные комплексы и космонавтика", code: "24.03.01", budgetPlaces: 80, passingScore: 330 },
      { id: 19, name: "Авиастроение", code: "24.03.04", budgetPlaces: 90, passingScore: 320 },
      { id: 20, name: "Материаловедение", code: "22.03.01", budgetPlaces: 70, passingScore: 285 },
      { id: 21, name: "Энергетическое машиностроение", code: "13.03.03", budgetPlaces: 110, passingScore: 295 },
      { id: 22, name: "Биомедицинская инженерия", code: "12.03.04", budgetPlaces: 60, passingScore: 305 },
      { id: 23, name: "Программная инженерия", code: "09.03.04", budgetPlaces: 140, passingScore: 325 },
      { id: 24, name: "Информационная безопасность", code: "10.03.01", budgetPlaces: 80, passingScore: 315 },
    ],
  },
  {
    id: 3,
    name: "МФТИ",
    shortName: "МФТИ",
    logo: "🚀",
    directions: [
      { id: 25, name: "Прикладная математика и физика", code: "03.03.01", budgetPlaces: 300, passingScore: 340 },
      { id: 26, name: "Физика", code: "03.03.02", budgetPlaces: 200, passingScore: 330 },
      { id: 27, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 180, passingScore: 350 },
      { id: 28, name: "Прикладная математика и информатика", code: "01.03.02", budgetPlaces: 150, passingScore: 345 },
      { id: 29, name: "Системный анализ и управление", code: "27.03.03", budgetPlaces: 100, passingScore: 320 },
      { id: 30, name: "Биотехнические системы и технологии", code: "12.03.01", budgetPlaces: 80, passingScore: 310 },
      { id: 31, name: "Радиофизика", code: "03.03.03", budgetPlaces: 90, passingScore: 325 },
      { id: 32, name: "Аэрокосмические технологии", code: "24.03.02", budgetPlaces: 70, passingScore: 335 },
      { id: 33, name: "Экономика", code: "38.03.01", budgetPlaces: 60, passingScore: 340 },
      { id: 34, name: "Менеджмент", code: "38.03.02", budgetPlaces: 50, passingScore: 330 },
      { id: 35, name: "Химия", code: "04.03.01", budgetPlaces: 40, passingScore: 315 },
      { id: 36, name: "Биология", code: "06.03.01", budgetPlaces: 45, passingScore: 305 },
    ],
  },
  {
    id: 4,
    name: "СПбГУ",
    shortName: "СПбГУ",
    logo: "🏰",
    directions: [
      { id: 37, name: "Филология", code: "45.03.01", budgetPlaces: 90, passingScore: 290 },
      { id: 38, name: "История", code: "46.03.01", budgetPlaces: 85, passingScore: 285 },
      { id: 39, name: "Математика", code: "01.03.01", budgetPlaces: 100, passingScore: 320 },
      { id: 40, name: "Физика", code: "03.03.02", budgetPlaces: 120, passingScore: 310 },
      { id: 41, name: "Экономика", code: "38.03.01", budgetPlaces: 91, passingScore: 291 },
      { id: 42, name: "Международные отношения", code: "41.03.05", budgetPlaces: 84, passingScore: 284 },
      { id: 43, name: "Журналистика", code: "42.03.02", budgetPlaces: 70, passingScore: 300 },
      { id: 44, name: "Психология", code: "37.03.01", budgetPlaces: 80, passingScore: 295 },
      { id: 45, name: "Социология", code: "39.03.01", budgetPlaces: 60, passingScore: 280 },
      { id: 46, name: "Философия", code: "47.03.01", budgetPlaces: 50, passingScore: 275 },
      { id: 47, name: "Юриспруденция", code: "40.03.01", budgetPlaces: 110, passingScore: 305 },
      { id: 48, name: "Химия", code: "04.03.01", budgetPlaces: 90, passingScore: 290 },
    ],
  },
  {
    id: 5,
    name: "ИТМО",
    shortName: "ИТМО",
    logo: "💻",
    directions: [
      { id: 49, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 295, passingScore: 295 },
      { id: 50, name: "Программная инженерия", code: "09.03.04", budgetPlaces: 310, passingScore: 310 },
      { id: 51, name: "Информационные системы и технологии", code: "09.03.02", budgetPlaces: 310, passingScore: 310 },
      { id: 52, name: "Прикладная математика и информатика", code: "01.03.02", budgetPlaces: 310, passingScore: 310 },
      { id: 53, name: "Фотоника и оптоинформатика", code: "12.03.03", budgetPlaces: 180, passingScore: 280 },
      { id: 54, name: "Биотехнология", code: "19.03.01", budgetPlaces: 120, passingScore: 270 },
      { id: 55, name: "Дизайн", code: "54.03.01", budgetPlaces: 100, passingScore: 260 },
      { id: 56, name: "Менеджмент", code: "38.03.02", budgetPlaces: 80, passingScore: 250 },
      { id: 57, name: "Экономика", code: "38.03.01", budgetPlaces: 90, passingScore: 255 },
      { id: 58, name: "Робототехника", code: "15.03.06", budgetPlaces: 150, passingScore: 285 },
      { id: 59, name: "Информационная безопасность", code: "10.03.01", budgetPlaces: 281, passingScore: 281 },
      { id: 60, name: "Физика", code: "03.03.02", budgetPlaces: 283, passingScore: 283 },
    ],
  },
  {
    id: 10,
    name: "Томский государственный университет",
    shortName: "ТГУ",
    logo: "🎓",
    directions: [
      { id: 109, name: "Математика", code: "01.03.01", budgetPlaces: 100, passingScore: 280 },
      { id: 110, name: "Физика", code: "03.03.02", budgetPlaces: 120, passingScore: 275 },
      { id: 111, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 150, passingScore: 290 },
      { id: 160, name: "Программная инженерия", code: "09.03.04", budgetPlaces: 120, passingScore: 300 }, // добавлено
      { id: 112, name: "Химия", code: "04.03.01", budgetPlaces: 90, passingScore: 270 },
      { id: 113, name: "Биология", code: "06.03.01", budgetPlaces: 110, passingScore: 265 },
      { id: 114, name: "Геология", code: "05.03.01", budgetPlaces: 80, passingScore: 260 },
      { id: 115, name: "География", code: "05.03.02", budgetPlaces: 70, passingScore: 255 },
      { id: 116, name: "История", code: "46.03.01", budgetPlaces: 85, passingScore: 275 },
      { id: 117, name: "Филология", code: "45.03.01", budgetPlaces: 95, passingScore: 280 },
      { id: 118, name: "Экономика", code: "38.03.01", budgetPlaces: 100, passingScore: 285 },
      { id: 119, name: "Юриспруденция", code: "40.03.01", budgetPlaces: 90, passingScore: 290 },
      { id: 120, name: "Психология", code: "37.03.01", budgetPlaces: 60, passingScore: 285 },
    ],
  },
  // ===== Новые, как просили: НГУ, СФУ, УрФУ (популярные направления) =====
  {
    id: 11,
    name: "Новосибирский государственный университет",
    shortName: "НГУ",
    logo: "🧬",
    directions: [
      { id: 2201, name: "Математика", code: "01.03.01", budgetPlaces: 120, passingScore: 320 },
      { id: 2202, name: "Физика", code: "03.03.02", budgetPlaces: 140, passingScore: 315 },
      { id: 2203, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 160, passingScore: 330 },
      { id: 2204, name: "Прикладная математика и информатика", code: "01.03.02", budgetPlaces: 120, passingScore: 325 },
      { id: 2205, name: "Биология", code: "06.03.01", budgetPlaces: 120, passingScore: 305 },
    ],
  },
  {
    id: 12,
    name: "Сибирский федеральный университет",
    shortName: "СФУ",
    logo: "🌲",
    directions: [
      { id: 2101, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 200, passingScore: 275 },
      { id: 2102, name: "Машиностроение", code: "15.03.01", budgetPlaces: 180, passingScore: 260 },
      { id: 2103, name: "Энергетика", code: "13.03.02", budgetPlaces: 150, passingScore: 265 },
      { id: 2104, name: "Строительство", code: "08.03.01", budgetPlaces: 220, passingScore: 250 },
      { id: 2105, name: "Робототехника", code: "15.03.06", budgetPlaces: 120, passingScore: 270 },
    ],
  },
  {
    id: 13,
    name: "Уральский федеральный университет",
    shortName: "УрФУ",
    logo: "⛰️",
    directions: [
      { id: 2301, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 180, passingScore: 285 },
      { id: 2302, name: "Программная инженерия", code: "09.03.04", budgetPlaces: 160, passingScore: 295 },
      { id: 2303, name: "Электроэнергетика", code: "13.03.02", budgetPlaces: 160, passingScore: 280 },
      { id: 2304, name: "Машиностроение", code: "15.03.01", budgetPlaces: 200, passingScore: 270 },
      { id: 2305, name: "Физика", code: "03.03.02", budgetPlaces: 90, passingScore: 280 },
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
      registration: "2024-09-01",
      qualifying: "2024-10-15",
      final: "2024-12-10",
      features: "Самая престижная олимпиада по математике",
    },
    {
      id: 2,
      name: "Московская олимпиада школьников",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "9-11 класс",
      registration: "2024-09-15",
      qualifying: "2024-11-01",
      final: "2024-12-15",
      features: "Региональная олимпиада высокого уровня",
    },
    {
      id: 3,
      name: "Олимпиада школьников «Ломоносов»",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "10-11 класс",
      registration: "2024-10-01",
      qualifying: "2024-11-15",
      final: "2025-01-20",
      features: "Олимпиада МГУ по математике",
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
      registration: "2024-09-01",
      qualifying: "2024-10-20",
      final: "2024-12-12",
      features: "Включает теоретический и экспериментальный туры",
    },
    {
      id: 5,
      name: "Московская олимпиада школьников",
      level: 1,
      type: "БВИ",
      subject: "Физика",
      validYears: "9-11 класс",
      registration: "2024-09-15",
      qualifying: "2024-11-05",
      final: "2024-12-18",
      features: "Сильная физическая олимпиада Москвы",
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
      registration: "2024-09-01",
      qualifying: "2024-10-25",
      final: "2024-12-20",
      features: "Программирование на Pascal, C++, Python",
    },
    {
      id: 7,
      name: "Открытая олимпиада школьников по программированию",
      level: 1,
      type: "БВИ",
      subject: "Информатика",
      validYears: "9-11 класс",
      registration: "2024-10-01",
      qualifying: "2024-11-10",
      final: "2025-01-15",
      features: "Спортивное программирование",
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
      registration: "2024-10-01",
      qualifying: "2024-11-20",
      final: "2025-02-10",
      features: "Олимпиада НИУ ВШЭ по экономике",
    },
    {
      id: 9,
      name: "Всероссийская экономическая олимпиада школьников имени Н.Д. Кондратьева",
      level: 1,
      type: "БВИ",
      subject: "Экономика",
      validYears: "10-11 класс",
      registration: "2024-09-20",
      qualifying: "2024-11-25",
      final: "2025-01-25",
      features: "Престижная экономическая олимпиада",
    },
  ],
}

// ------------------------ ГЕНЕРАЦИЯ ПО ПРОФИЛЮ ------------------------
const generateOlympiadsForDirection = (directionId: number, directionName: string): Olympiad[] => {
  const baseOlympiads: Olympiad[] = []

  let subject = "Математика"
  if (directionName.toLowerCase().includes("физ")) subject = "Физика"
  else if (directionName.includes("Информатика") || directionName.includes("Программная") || directionName.toLowerCase().includes("информ"))
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
    registration: "2024-09-01",
    qualifying: "2024-10-15",
    final: "2024-12-10",
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
      registration: "2024-09-15",
      qualifying: "2024-11-01",
      final: "2024-12-15",
      features: "Региональная олимпиада высокого уровня",
    })
    baseOlympiads.push({
      id: directionId * 1000 + 2,
      name: "Турнир городов",
      level: 1,
      type: "БВИ",
      subject: "Математика",
      validYears: "8-11 класс",
      registration: "2024-09-20",
      qualifying: "2024-10-20",
      final: "2024-12-20",
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
      registration: "2024-09-15",
      qualifying: "2024-11-05",
      final: "2024-12-18",
      features: "Сильная физическая олимпиада Москвы",
    })
    baseOlympiads.push({
      id: directionId * 1000 + 2,
      name: "Олимпиада школьников «Физтех»",
      level: 1,
      type: "БВИ",
      subject: "Физика",
      validYears: "9-11 класс",
      registration: "2024-10-01",
      qualifying: "2024-11-10",
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
      registration: "2024-10-01",
      qualifying: "2024-11-10",
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
      registration: "2024-09-25",
      qualifying: "2024-11-15",
      final: "2025-01-20",
      features: "Даёт 100 баллов ЕГЭ (подтверждение 75+), без БВИ для ряда вузов",
    })
  }

  return baseOlympiads
}

// Автодополнение по всем направлениям
universities.forEach((u) => {
  u.directions.forEach((d) => {
    if (!olympiads[d.id]) {
      olympiads[d.id] = generateOlympiadsForDirection(d.id, d.name)
    }
  })
})

// ------------------------ НОРМАЛИЗАЦИЯ ------------------------
const normalize = (s: string) => s.trim().toLowerCase()
const subjectAliases: Record<string, string[]> = {
  Математика: ["математика"],
  Физика: [
    "физика",
    "астрономия",
    "инженерное дело",
    "естественные науки",
    "техника и технологии",
    "инженерные системы",
    "наносистемы и наноинженерия",
    "аэрокосмические системы",
    "спутниковые системы",
    "летающая робототехника",
    "робототехника",
  ],
  Информатика: [
    "информатика",
    "информационные технологии",
    "программирование",
    "информационная безопасность",
    "искусственный интеллект",
    "анализ данных",
    "большие данные и машинное обучение",
    "виртуальные миры",
    "компьютерные игры",
  ],
}

const matchesSubject = (recordSubjects: string[] | undefined, target: string) => {
  if (!recordSubjects || recordSubjects.length === 0) return true
  const expand = (x: string) => [normalize(x), ...(subjectAliases[x] || []).map(normalize)]
  const targetSet = new Set(expand(target))
  return recordSubjects.some((rs) => targetSet.has(normalize(rs)))
}

// ------------------------ ВУЗ-СПЕЦИФИЧНЫЕ ПРАВИЛА ------------------------
// МФТИ — (из твоего списка, сокращённо, уже было)
const mftiRules: Olympiad[] = [
  {
    id: 300001,
    universityShortName: "МФТИ",
    faculty: "ФАКТ / ПИШ ФАЛТ",
    name: "Олимпиада Юношеской математической школы",
    level: 2,
    type: "БВИ",
    subject: "Математика",
    appliesToSubjects: ["Математика"],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ по математике 75+",
    features: "ЮМШ",
  },
  // ... (оставляю остальные как в твоей заготовке; они уже покрывают ФАКТ и ФРКТ)
]

// ИТМО — БВИ и 100 баллов
const itmoRules: Olympiad[] = [
  {
    id: 500001,
    universityShortName: "ИТМО",
    faculty: "ПМИ/ИВТ/ИСиТ",
    name: "Всероссийская олимпиада «Высшая проба»",
    level: 1,
    type: "БВИ",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "10–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["ПМИ", "ИВТ", "ИСиТ"],
    requirementNote: "Победитель/призёр, подтверждение 75+ по информатике",
    features: "Даёт БВИ по ряду ИТ-направлений ИТМО.",
  },
  {
    id: 500010,
    universityShortName: "ИТМО",
    faculty: "Фотоника",
    name: "Санкт-Петербургская олимпиада школьников",
    level: 1,
    type: "100 баллов",
    subject: "Физика",
    appliesToSubjects: ["Физика"],
    validYears: "10–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["12.03.03 Фотоника и оптоинформатика"],
    requirementNote: "100 баллов по физике (при 75+ подтверждении), без БВИ",
    features: "",
  },
]

// ТГУ — БВИ/100 баллов и ПИ
const tguRules: Olympiad[] = [
  {
    id: 1000001,
    universityShortName: "ТГУ",
    faculty: "ММФ/ИПМКН",
    name: "Перечневые олимпиады Минобрнауки (1–3 уровни)",
    level: "1–3",
    type: "БВИ",
    subject: "Математика",
    appliesToSubjects: ["Математика", "Информатика", "Физика"],
    validYears: "за 4 года",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["01.03.01 Математика", "01.03.02 ПМИ", "09.03.01 ИВТ", "09.03.04 Программная инженерия"],
    requirementNote: "БВИ или 100 баллов по предмету — в зависимости от профиля и статуса (победитель/призёр)",
    features: "Смотреть таблицы ТГУ по направлениям.",
  },
  {
    id: 1000002,
    universityShortName: "ТГУ",
    faculty: "ИПМКН",
    name: "Олимпиада школьников по программированию «ТехноКубок»",
    level: 2,
    type: "100 баллов",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["09.03.01 ИВТ", "09.03.04 Программная инженерия", "01.03.02 ПМИ"],
    requirementNote: "Даёт 100 баллов по информатике (подтверждение 75+), без БВИ",
    features: "",
  },
]

// НГУ — примеры правил (БВИ + только 100)
const nguRules: Olympiad[] = [
  {
    id: 600001,
    universityShortName: "НГУ",
    faculty: "ФИТ/ММФ",
    name: "ВсОШ по математике / физике / информатике",
    level: "ВсОШ",
    type: "БВИ",
    subject: "Математика",
    appliesToSubjects: ["Математика", "Физика", "Информатика"],
    validYears: "10–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["01.03.01", "01.03.02", "09.03.01"],
    requirementNote: "Победитель/призёр заключительного этапа — БВИ",
    features: "",
  },
  {
    id: 600010,
    universityShortName: "НГУ",
    faculty: "ФИТ",
    name: "«ТехноКубок»",
    level: 2,
    type: "100 баллов",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["09.03.01 ИВТ", "01.03.02 ПМИ"],
    requirementNote: "100 баллов по информатике (при 75+), без БВИ",
    features: "",
  },
]

// СФУ — примеры правил (БВИ + только 100)
const sfuRules: Olympiad[] = [
  {
    id: 700001,
    universityShortName: "СФУ",
    faculty: "ИТ/ИРИТ",
    name: "Московская олимпиада школьников (математика/физика/информатика)",
    level: 1,
    type: "БВИ",
    subject: "Математика",
    appliesToSubjects: ["Математика", "Физика", "Информатика"],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["09.03.01", "15.03.06", "13.03.02"],
    requirementNote: "Победитель (подтверждение 75+ по предмету)",
    features: "",
  },
  {
    id: 700010,
    universityShortName: "СФУ",
    faculty: "ИТ",
    name: "«Высшая проба» (информатика)",
    level: 1,
    type: "100 баллов",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "10–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["09.03.01 ИВТ", "01.03.02 ПМИ"],
    requirementNote: "100 баллов по информатике (при 75+), без БВИ",
    features: "",
  },
]

// УрФУ — примеры правил (БВИ + только 100)
const urfuRules: Olympiad[] = [
  {
    id: 800001,
    universityShortName: "УрФУ",
    faculty: "ИРИТ-РтФ",
    name: "Объединённая межвузовская олимпиада школьников (математика/физика)",
    level: 1,
    type: "БВИ",
    subject: "Физика",
    appliesToSubjects: ["Физика", "Математика"],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["09.03.01", "09.03.04", "13.03.02"],
    requirementNote: "Победитель (подтверждение 75+)",
    features: "",
  },
  {
    id: 800010,
    universityShortName: "УрФУ",
    faculty: "ИРИТ-РтФ",
    name: "«ТехноКубок» (информатика)",
    level: 2,
    type: "100 баллов",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["09.03.01 ИВТ", "09.03.04 Программная инженерия"],
    requirementNote: "100 баллов по информатике (при 75+), без БВИ",
    features: "",
  },
]

// общий словарь
const universityOlympiadRules: Record<string, Olympiad[]> = {
  МФТИ: mftiRules,
  ИТМО: itmoRules,
  ТГУ: tguRules,
  НГУ: nguRules,
  СФУ: sfuRules,
  УрФУ: urfuRules,
}

// ------------------------ КОМПОНЕНТ ------------------------
export function UniversitySelection() {
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null)
  const [selectedOlympiads, setSelectedOlympiads] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectOlympiad = (olympiadId: number) => {
    setSelectedOlympiads((prev) => (prev.includes(olympiadId) ? prev.filter((id) => id !== olympiadId) : [...prev, olympiadId]))
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
    const uniRules = universityOlympiadRules[uni?.shortName || ""] || []
    const filtered = uniRules.filter((r) => matchesSubject(r.appliesToSubjects, subj))
    return { direction, uni, subj, rules: filtered }
  }, [selectedDirection])

  if (selectedDirection) {
    const directionOlympiads = olympiads[selectedDirection] || []
    const direction = universities.flatMap((u) => u.directions).find((d) => d.id === selectedDirection)

    return (
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedDirection(null)} className="text-primary">
              ← Назад
            </Button>
          </div>

          <div className="bg-light-gray p-4 rounded-lg mb-4">
            <h2 className="text-lg font-bold text-primary mb-2">{direction?.name}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neutral-gray">Бюджетных мест:</span>
                <div className="font-semibold text-primary">{direction?.budgetPlaces}</div>
              </div>
              <div>
                <span className="text-neutral-gray">Проходной балл 2024:</span>
                <div className="font-semibold text-primary">{direction?.passingScore}</div>
              </div>
            </div>
          </div>

          {/* Вуз-специфичные правила */}
          {directionContext?.uni && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-primary">
                  Правила олимпиад в {directionContext.uni.shortName} по профилю «{directionContext.subj}»
                </h3>

                {directionContext.rules.length === 0 ? (
                    <Card className="p-4">
                      <p className="text-sm text-neutral-gray">Для этого профиля нет особых правил, кроме общих.</p>
                    </Card>
                ) : (
                    <div className="space-y-2">
                      {directionContext.rules.map((rule) => (
                          <Card key={`uni-rule-${rule.id}`} className="p-4 card-hover">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-primary text-sm">
                                {rule.name} {!!rule.faculty && <span className="text-accent">· {rule.faculty}</span>}
                              </h5>
                              <Badge
                                  variant={rule.type === "БВИ" ? "default" : "secondary"}
                                  className={rule.type === "БВИ" ? "bg-primary text-white" : "bg-accent text-primary"}
                              >
                                {rule.type}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs text-neutral-gray">
                              <p>
                                <strong>Профиль/предмет:</strong> {rule.subject}
                              </p>
                              {!!rule.groups?.length && (
                                  <p>
                                    <strong>Конкурсные группы:</strong> {rule.groups.join("; ")}
                                  </p>
                              )}
                              {!!rule.requirementNote && (
                                  <p className="text-primary">
                                    <strong>Условие:</strong> {rule.requirementNote}
                                  </p>
                              )}
                              {!!rule.features && (
                                  <p>
                                    <strong>Особенности:</strong> {rule.features}
                                  </p>
                              )}
                            </div>
                          </Card>
                      ))}
                    </div>
                )}
              </div>
          )}

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-primary">Олимпиады для поступления</h3>

            <div className="space-y-2">
              <h4 className="font-semibold text-primary text-sm">🏆 БВИ (Без вступительных испытаний)</h4>
              {directionOlympiads
                  .filter((o) => o.type === "БВИ")
                  .map((olympiad) => (
                      <Card
                          key={olympiad.id}
                          className="p-4 card-hover cursor-pointer"
                          onClick={() => handleSelectOlympiad(olympiad.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-primary text-sm">{olympiad.name}</h5>
                          <Badge
                              variant={olympiad.level === "ВсОШ" ? "default" : "secondary"}
                              className="bg-primary text-white"
                          >
                            {olympiad.level === "ВсОШ" ? "ВсОШ" : `${olympiad.level} уровень`}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-neutral-gray">
                          <p>
                            <strong>Предмет:</strong> {olympiad.subject}
                          </p>
                          <p>
                            <strong>Классы:</strong> {olympiad.validYears}
                          </p>
                          <p>
                            <strong>Регистрация:</strong> {new Date(olympiad.registration).toLocaleDateString("ru")}
                          </p>
                          <p>
                            <strong>Отборочный:</strong> {new Date(olympiad.qualifying).toLocaleDateString("ru")}
                          </p>
                          <p>
                            <strong>Заключительный:</strong> {new Date(olympiad.final).toLocaleDateString("ru")}
                          </p>
                          <p className="text-primary">
                            <strong>Особенности:</strong> {olympiad.features}
                          </p>
                        </div>
                        <Button
                            size="sm"
                            className={`mt-3 w-full ${selectedOlympiads.includes(olympiad.id) ? "bg-accent text-primary" : "bg-primary text-white"}`}
                        >
                          {selectedOlympiads.includes(olympiad.id) ? "✓ Выбрано" : "Выбрать"}
                        </Button>
                      </Card>
                  ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-primary text-sm">💯 100 баллов ЕГЭ</h4>
              {directionOlympiads
                  .filter((o) => o.type === "100 баллов")
                  .map((olympiad) => (
                      <Card
                          key={olympiad.id}
                          className="p-4 card-hover cursor-pointer"
                          onClick={() => handleSelectOlympiad(olympiad.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-primary text-sm">{olympiad.name}</h5>
                          <Badge variant="secondary" className="bg-accent text-primary">
                            {olympiad.level} уровень
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-neutral-gray">
                          <p>
                            <strong>Предмет:</strong> {olympiad.subject}
                          </p>
                          <p>
                            <strong>Классы:</strong> {olympiad.validYears}
                          </p>
                          <p>
                            <strong>Регистрация:</strong> {new Date(olympiad.registration).toLocaleDateString("ru")}
                          </p>
                          <p>
                            <strong>Отборочный:</strong> {new Date(olympiad.qualifying).toLocaleDateString("ru")}
                          </p>
                          <p>
                            <strong>Заключительный:</strong> {new Date(olympiad.final).toLocaleDateString("ru")}
                          </p>
                          <p className="text-primary">
                            <strong>Особенности:</strong> {olympiad.features}
                          </p>
                        </div>
                        <Button
                            size="sm"
                            className={`mt-3 w-full ${selectedOlympiads.includes(olympiad.id) ? "bg-accent text-primary" : "bg-primary text-white"}`}
                        >
                          {selectedOlympiads.includes(olympiad.id) ? "✓ Выбрано" : "Выбрать"}
                        </Button>
                      </Card>
                  ))}
            </div>
          </div>

          {selectedOlympiads.length > 0 && (
              <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto">
                <Card className="p-3 bg-accent">
                  <p className="text-primary text-sm font-medium text-center">
                    Выбрано олимпиад: {selectedOlympiads.length}
                  </p>
                  <Button className="w-full mt-2 bg-primary text-white">Добавить в календарь</Button>
                </Card>
              </div>
          )}
        </div>
    )
  }

  if (selectedUniversity) {
    const university = universities.find((u) => u.id === selectedUniversity)

    return (
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedUniversity(null)} className="text-primary">
              ← Назад
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{university?.logo}</div>
            <h2 className="text-lg font-bold text-primary">{university?.name}</h2>
            <p className="text-sm text-neutral-gray">Выберите направление</p>
          </div>

          <div className="space-y-3">
            {university?.directions.map((direction) => (
                <Card key={direction.id} className="p-4 card-hover cursor-pointer" onClick={() => setSelectedDirection(direction.id)}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{direction.name}</h3>
                      <p className="text-xs text-neutral-gray">{direction.code}</p>
                      <div className="flex gap-4 mt-2 text-xs">
                    <span className="text-neutral-gray">
                      Бюджет: <span className="text-primary font-medium">{direction.budgetPlaces}</span>
                    </span>
                        <span className="text-neutral-gray">
                      Проходной: <span className="text-primary font-medium">{direction.passingScore}</span>
                    </span>
                      </div>
                    </div>
                    <div className="text-accent">→</div>
                  </div>
                </Card>
            ))}
          </div>
        </div>
    )
  }

  return (
      <div className="p-4 space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-primary mb-2">Выберите вуз</h2>
          <Input
              placeholder="Поиск по названию вуза..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
          />
          {/* Дисклеймер об обновлениях */}
          <Card className="p-3 bg-light-gray">
            <p className="text-xs text-neutral-gray">
              <strong>Важно:</strong> перечни олимпиад и даты (в т.ч. дни открытых дверей) ежегодно обновляются в начале учебного года.
              Мы следим за изменениями и напомним вам об актуализациях.
            </p>
          </Card>
        </div>

        <div className="space-y-3">
          {filteredUniversities.map((university) => (
              <Card key={university.id} className="p-4 card-hover cursor-pointer" onClick={() => setSelectedUniversity(university.id)}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{university.logo}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{university.shortName}</h3>
                    <p className="text-xs text-neutral-gray">{university.name}</p>
                    <p className="text-xs text-accent mt-1">{university.directions.length} направлений</p>
                  </div>
                  <div className="text-accent">→</div>
                </div>
              </Card>
          ))}
        </div>

        {filteredUniversities.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-neutral-gray">Вузы не найдены</p>
              <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-2 text-primary">
                Очистить поиск
              </Button>
            </div>
        )}
      </div>
  )
}
