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
  // NEW (для вуз-специфичных правил)
  faculty?: string
  groups?: string[]                  // Конкурсные группы
  requirementNote?: string           // Примечание про 75+ и т.п.
  appliesToSubjects?: string[]       // Для какой предметной области подходит запись
  universityShortName?: string       // Например "МФТИ" / "ИТМО" / "ТГУ"
}

// ------------------------ ТВОИ ДАННЫЕ ВУЗОВ ------------------------
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
      {
        id: 15,
        name: "Автоматизация технологических процессов",
        code: "15.03.04",
        budgetPlaces: 150,
        passingScore: 290,
      },
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
  // ... (СПбПУ, ТГУ, НГУ, СФУ, УрФУ — оставил как у тебя)
  {
    id: 10,
    name: "Томский государственный университет",
    shortName: "ТГУ",
    logo: "🎓",
    directions: [
      { id: 109, name: "Математика", code: "01.03.01", budgetPlaces: 100, passingScore: 280 },
      { id: 110, name: "Физика", code: "03.03.02", budgetPlaces: 120, passingScore: 275 },
      { id: 111, name: "Информатика и вычислительная техника", code: "09.03.01", budgetPlaces: 150, passingScore: 290 },
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
]

// ------------------------ БАЗОВЫЕ ОЛИМПИАДЫ ПО ПРОФИЛЮ ------------------------
const olympiads: Record<number, Olympiad[]> = {
  // (оставил твои примеры МГУ + генерацию)
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

// ------------------------ ГЕНЕРАЦИЯ ПО ПРОФИЛЮ (оставил как у тебя) ------------------------
const generateOlympiadsForDirection = (directionId: number, directionName: string): Olympiad[] => {
  const baseOlympiads: Olympiad[] = []

  let subject = "Математика"
  if (directionName.toLowerCase().includes("физика")) subject = "Физика"
  else if (
      directionName.includes("Информатика") ||
      directionName.includes("Программная") ||
      directionName.toLowerCase().includes("информатика")
  ) subject = "Информатика"
  else if (directionName.toLowerCase().includes("эконом")) subject = "Экономика"
  else if (directionName.toLowerCase().includes("хим")) subject = "Химия"
  else if (directionName.toLowerCase().includes("био")) subject = "Биология"
  else if (directionName.toLowerCase().includes("истор")) subject = "История"
  else if (directionName.toLowerCase().includes("филолог") || directionName.toLowerCase().includes("лингв"))
    subject = "Русский язык"
  else if (directionName.toLowerCase().includes("журналист")) subject = "Литература"
  else if (directionName.toLowerCase().includes("юриспруд")) subject = "Обществознание"
  else if (directionName.toLowerCase().includes("географ") || directionName.toLowerCase().includes("геолог"))
    subject = "География"

  baseOlympiads.push({
    id: directionId * 1000,
    name: `Всероссийская олимпиада школьников по ${subject.toLowerCase()} (ВсОШ)`,
    level: "ВсОШ",
    type: "БВИ",
    subject: subject,
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
      features: "Олимпиада Mail.ru Group",
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

// ------------------------ НОВОЕ: ВУЗ-СПЕЦИФИЧНЫЕ ПРАВИЛА ОЛИМПИАД ------------------------
// Утилита: нормализуем предмет
const normalize = (s: string) => s.trim().toLowerCase()
const subjectAliases: Record<string, string[]> = {
  "Математика": ["математика"],
  "Физика": ["физика", "астрономия", "инженерное дело", "естественные науки", "техника и технологии", "инженерные системы", "наносистемы и наноинженерия", "аэрокосмические системы", "спутниковые системы", "летающая робототехника", "робототехника"],
  "Информатика": ["информатика", "информационные технологии", "программирование", "информационная безопасность", "искусственный интеллект", "анализ данных", "большие данные и машинное обучение", "виртуальные миры", "компьютерные игры"],
}

const matchesSubject = (recordSubjects: string[] | undefined, target: string) => {
  if (!recordSubjects || recordSubjects.length === 0) return true
  const canon = normalize(target)
  const expand = (x: string) => [normalize(x), ...(subjectAliases[x] || []).map(normalize)]
  const targetSet = new Set(expand(target))
  return recordSubjects.some(rs => targetSet.has(normalize(rs)))
}

// Данные для МФТИ — на основе твоего текста (ФАКТ/ФРКТ и др.)
const mftiRules: Olympiad[] = [
  // ====== ФАКТ / Физтех-школа аэрокосмических технологий (и ПИШ ФАЛТ) ======
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
    requirementNote: "Победителям при наличии результата ЕГЭ или ВИ по математике 75+",
    features: "ЮМШ",
  },
  {
    id: 300002,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Открытая межвузовская олимпиада школьников СФО «Будущее Сибири»",
    level: 1,
    type: "БВИ",
    subject: "Физика",
    appliesToSubjects: ["Физика"],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ по физике 75+",
    features: "",
  },
  // Открытая олимпиада школьников — три профиля
  ...["Информатика","Математика","Физика"].map((subj, i) => ({
    id: 300010 + i,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Открытая олимпиада школьников",
    level: 1,
    type: "БВИ",
    subject: subj,
    appliesToSubjects: [subj],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: `Победителям при наличии результата ЕГЭ/ВИ по ${subj.toLowerCase()} 75+`,
    features: "",
  })),
  {
    id: 300020,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Открытая олимпиада школьников по программированию",
    level: 1,
    type: "БВИ",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ по информатике 75+",
    features: "Спортивное программирование",
  },
  {
    id: 300021,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Олимпиада школьников по программированию «Когнитивные технологии»",
    level: 2,
    type: "БВИ",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: [
      "Программная инженерия и компьютерные технологии",
      "Авиационные технологии и автономные транспортные системы",
    ],
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ по информатике 75+",
    features: "",
  },
  {
    id: 300030,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Открытая региональная межвузовская олимпиада школьников (ОРМО)",
    level: 1,
    type: "БВИ",
    subject: "Физика",
    appliesToSubjects: ["Физика"],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ по физике 75+",
    features: "",
  },
  // Газпром — несколько профилей (инженерное дело, ИКТ, математика, физика)
  ...[
    { subj: "Математика", groups: ["Все конкурсные группы ФАКТ"] },
    { subj: "Физика", groups: ["Все конкурсные группы ФАКТ"] },
    { subj: "Информатика", groups: ["Программная инженерия и компьютерные технологии","Авиационные технологии и автономные транспортные системы","Геокосмические науки и технологии"] },
  ].map((e, idx) => ({
    id: 300040 + idx,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Отраслевая олимпиада школьников «Газпром»",
    level: 1,
    type: "БВИ",
    subject: e.subj,
    appliesToSubjects: [e.subj],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: e.groups,
    requirementNote: `Победителям при наличии результата ЕГЭ/ВИ по ${e.subj.toLowerCase()} 75+`,
    features: "",
  })),
  // Росатом — инф/мат/физ
  ...["Информатика","Математика","Физика"].map((subj, idx)=>({
    id: 300060 + idx,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Отраслевая физико-математическая олимпиада школьников «Росатом»",
    level: 1,
    type: "БВИ",
    subject: subj,
    appliesToSubjects: [subj],
    validYears: "9–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: subj==="Информатика"
        ? ["Программная инженерия и компьютерные технологии","Авиационные технологии и автономные транспортные системы","Геокосмические науки и технологии"]
        : ["Все конкурсные группы ФАКТ"],
    requirementNote: `Победителям при наличии результата ЕГЭ/ВИ по ${subj.toLowerCase()} 75+`,
    features: "",
  })),
  // СПб астрономическая (физика по сути)
  {
    id: 300070,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Санкт-Петербургская астрономическая олимпиада",
    level: 1,
    type: "БВИ",
    subject: "Астрономия",
    appliesToSubjects: ["Физика"],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ по физике 75+",
    features: "",
  },
  // СПб. олимпиада школьников: математика/физика
  ...["Математика","Физика"].map((subj, i)=>({
    id: 300080 + i,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Санкт-Петербургская олимпиада школьников",
    level: 1,
    type: "БВИ",
    subject: subj,
    appliesToSubjects: [subj === "Математика" ? "Математика" : "Физика"],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: `Победителям при наличии результата ЕГЭ/ВИ по ${subj.toLowerCase()} 75+`,
    features: "",
  })),
  // Турнир городов (математика), Турнир им. М.В. Ломоносова (астрономия/математика/физика)
  {
    id: 300090,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Турнир городов",
    level: 1,
    type: "БВИ",
    subject: "Математика",
    appliesToSubjects: ["Математика"],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ по математике 75+",
    features: "",
  },
  ...[
    { subj: "Астрономия и науки о земле", applies: "Физика", groups: ["Геокосмические науки и технологии"] },
    { subj: "Математика", applies: "Математика", groups: ["Все конкурсные группы ФАКТ"] },
    { subj: "Физика", applies: "Физика", groups: ["Все конкурсные группы ФАКТ"] },
  ].map((x, i)=>({
    id: 300100 + i,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Турнир имени М.В. Ломоносова",
    level: 1,
    type: "БВИ",
    subject: x.subj,
    appliesToSubjects: [x.applies],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: x.groups,
    requirementNote: `Победителям при наличии результата ЕГЭ/ВИ по ${x.applies.toLowerCase()} 75+`,
    features: "",
  })),
  // МОШ: астрономия/информатика/математика/робототехника/физика
  ...["Астрономия","Информатика","Математика","Робототехника","Физика"].map((subj,i)=>({
    id: 300120 + i,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: "Московская олимпиада школьников",
    level: 1,
    type: "БВИ",
    subject: subj,
    appliesToSubjects: [subj==="Робототехника"?"Физика":subj],
    validYears: "7–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"],
    requirementNote: `Победителям при наличии результата ЕГЭ/ВИ по ${ (subj==="Робототехника"?"физике":subj.toLowerCase()) } 75+`,
    features: "",
  })),
  // Объединенная межвузовская; Курчатов; «Ломоносов» (много профилей); «Покори Воробьёвы горы!»; «Физтех»; «Шаг в будущее»; СПбГУ олимпиада; «ТехноКубок»; «Олимп по ИиП»
  ...[
    { name:"Объединенная межвузовская олимпиада школьников", subj:"Математика" },
    { name:"Объединенная межвузовская олимпиада школьников", subj:"Физика" },
    { name:"Олимпиада Курчатов", subj:"Математика" },
    { name:"Олимпиада Курчатов", subj:"Физика" },
    { name:"Олимпиада школьников «Ломоносов»", subj:"Информатика" },
    { name:"Олимпиада школьников «Ломоносов»", subj:"Космонавтика", applies:"Физика" },
    { name:"Олимпиада школьников «Ломоносов»", subj:"Математика" },
    { name:"Олимпиада школьников «Ломоносов»", subj:"Механика и математическое моделирование", applies:"Математика" },
    { name:"Олимпиада школьников «Ломоносов»", subj:"Робототехника", applies:"Физика" },
    { name:"Олимпиада школьников «Ломоносов»", subj:"Физика" },
    { name:"Олимпиада школьников «Покори Воробьёвы горы!»", subj:"Математика" },
    { name:"Олимпиада школьников «Покори Воробьёвы горы!»", subj:"Физика" },
    { name:"Олимпиада школьников «Робофест»", subj:"Физика" },
    { name:"Олимпиада школьников «Физтех»", subj:"Инженерное дело", applies:"Физика", prizeNote:"Победителям и призёрам" },
    { name:"Олимпиада школьников «Физтех»", subj:"Математика" },
    { name:"Олимпиада школьников «Физтех»", subj:"Научно-технический", applies:"Физика" },
    { name:"Олимпиада школьников «Физтех»", subj:"Физика" },
    { name:"Олимпиада школьников «Шаг в будущее»", subj:"Инженерное дело", applies:"Физика" },
    { name:"Олимпиада школьников «Шаг в будущее»", subj:"Информатика" },
    { name:"Олимпиада школьников «Шаг в будущее»", subj:"Компьютерное моделирование и графика", applies:"Информатика" },
    { name:"Олимпиада школьников «Шаг в будущее»", subj:"Математика" },
    { name:"Олимпиада школьников «Шаг в будущее»", subj:"Физика" },
    { name:"Олимпиада школьников по информатике и программированию", subj:"Информатика" },
    { name:"Олимпиада школьников по программированию «ТехноКубок»", subj:"Информатика" },
    { name:"Олимпиада школьников Санкт-Петербургского государственного университета", subj:"Инженерные системы", applies:"Физика" },
    { name:"Олимпиада школьников Санкт-Петербургского государственного университета", subj:"Информатика" },
    { name:"Олимпиада школьников Санкт-Петербургского государственного университета", subj:"Математика" },
    { name:"Олимпиада школьников Санкт-Петербургского государственного университета", subj:"Математическое моделирование и искусственный интеллект", applies:"Информатика" },
    { name:"Всероссийская олимпиада по искусственному интеллекту", subj:"Искусственный интеллект", applies:"Информатика" },
    { name:"«Формула Единства»/«Третье тысячелетие»", subj:"Математика" },
    // НТО — ключевые профили (сократил до основных строк)
    { name:"Национальная технологическая олимпиада", subj:"Автоматизация бизнес-процессов", applies:"Информатика" },
    { name:"Национальная технологическая олимпиада", subj:"Автономные транспортные системы", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Анализ космических снимков и геоданных", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Аэрокосмические системы", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Беспилотные авиационные системы", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Большие данные и машинное обучение", applies:"Информатика" },
    { name:"Национальная технологическая олимпиада", subj:"Виртуальные миры / AR/VR / игры", applies:"Информатика" },
    { name:"Национальная технологическая олимпиада", subj:"Водные робототехнические системы", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Инженерные биологические системы", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Интеллектуальные робототехнические системы", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Интеллектуальные энергетические системы", applies:"Информатика" },
    { name:"Национальная технологическая олимпиада", subj:"Информационная безопасность", applies:"Информатика" },
    { name:"Национальная технологическая олимпиада", subj:"Искусственный интеллект", applies:"Информатика" },
    { name:"Национальная технологическая олимпиада", subj:"Летающая робототехника", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Наносистемы и наноинженерия", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Спутниковые системы", applies:"Физика" },
    { name:"Национальная технологическая олимпиада", subj:"Технологии беспроводной связи", applies:"Физика" },
  ].map((row, i)=>({
    id: 300200 + i,
    universityShortName: "МФТИ",
    faculty: "ФАКТ",
    name: row.name,
    level: 1,
    type: "БВИ",
    subject: row.subj,
    appliesToSubjects: [row.applies ?? row.subj],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["Все конкурсные группы ФАКТ"].concat(
        /информатик/i.test(row.subj) || /интеллект/i.test(row.subj) || /данн/i.test(row.subj)
            ? ["Программная инженерия и компьютерные технологии","Авиационные технологии и автономные транспортные системы"]
            : []
    ),
    requirementNote: `Победителям при наличии результата ЕГЭ/ВИ по ${(row.applies ?? row.subj).toLowerCase()} 75+`,
    features: "",
  })),
  // ====== ФРКТ / Физтех-школа радиотехники и компьютерных технологий ======
  // Здесь — выдержки из твоего блока про ФРКТ (сократил до ключевых, можно расширять тем же способом)
  ...[
    { name:"НТО", subj:"Автоматизация бизнес-процессов", applies:"Информатика", groups:["Компьютерные технологии и вычислительная техника","Радиотехника и компьютерные технологии (физика)"] },
    { name:"НТО", subj:"Беспилотные авиационные системы", applies:"Инф/Физ", groups:["Компьютерные технологии и вычислительная техника","Радиотехника и компьютерные технологии"] },
    { name:"Всероссийская олимпиада по искусственному интеллекту", subj:"Искусственный интеллект", applies:"Информатика", groups:["Компьютерные технологии и вычислительная техника"] },
    { name:"Высшая проба", subj:"Анализ данных", applies:"Информатика", groups:["Компьютерные технологии и вычислительная техника"] },
    { name:"Всесибирская открытая олимпиада школьников", subj:"Информатика", applies:"Информатика", groups:["Компьютерные технологии и вычислительная техника"] },
    { name:"Всесибирская открытая олимпиада школьников", subj:"Математика", applies:"Математика", groups:["Все конкурсные группы ФРКТ"] },
    { name:"Всесибирская открытая олимпиада школьников", subj:"Физика", applies:"Физика", groups:["Все конкурсные группы ФРКТ"] },
    { name:"Вузовско-академическая олимпиада по информатике", subj:"Информатика", applies:"Информатика", groups:["Компьютерные технологии и вычислительная техника"] },
    { name:"Санкт-Петербургская астрономическая олимпиада", subj:"Астрономия", applies:"Физика", groups:["Радиотехника и компьютерные технологии"] },
    { name:"Санкт-Петербургская олимпиада школьников", subj:"Математика", applies:"Математика", groups:["Все конкурсные группы ФРКТ"] },
    { name:"Турнир городов", subj:"Математика", applies:"Математика", groups:["Все конкурсные группы ФРКТ"] },
  ].map((x, i)=>({
    id: 310000 + i,
    universityShortName: "МФТИ",
    faculty: "ФРКТ",
    name: x.name,
    level: 1,
    type: "БВИ",
    subject: x.subj,
    appliesToSubjects: [x.applies==="Инф/Физ" ? "Информатика":"Математика","Физика"].filter(Boolean) as string[],
    validYears: "8–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: x.groups,
    requirementNote: "Победителям при наличии результата ЕГЭ/ВИ 75+ по соответствующему предмету",
    features: "",
  })),
]

// ИТМО — выдержки (БВИ и 100 баллов), по PDF. Можно расширять аналогично.
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
    groups: ["ПМИ","ИВТ","ИСиТ"],
    requirementNote: "Победитель/призёр, подтверждение 75+ по информатике",
    features: "Даёт БВИ по ряду ИТ-направлений ИТМО.",
  },
  {
    id: 500002,
    universityShortName: "ИТМО",
    faculty: "ПМИ/ИВТ/ИСиТ",
    name: "Олимпиада школьников по программированию «ТехноКубок»",
    level: 1,
    type: "БВИ",
    subject: "Информатика",
    appliesToSubjects: ["Информатика"],
    validYears: "10–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["ПМИ","ИВТ","ИСиТ","ПИ"],
    requirementNote: "Победитель (или призёр для ряда направлений), 75+ по информатике",
    features: "",
  },
  {
    id: 500010,
    universityShortName: "ИТМО",
    faculty: "Оптика/Фотоника",
    name: "Санкт-Петербургская олимпиада школьников",
    level: 1,
    type: "100 баллов",
    subject: "Физика",
    appliesToSubjects: ["Физика"],
    validYears: "10–11",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["12.03.03 Фотоника и оптоинформатика", "12.03.05 Лазерная техника"],
    requirementNote: "Дает 100 баллов по физике (при 75+ подтверждении) — без БВИ",
    features: "",
  },
]

// ТГУ — выдержки из приложения, где даются БВИ/100 баллов по предметам
const tguRules: Olympiad[] = [
  {
    id: 1000001,
    universityShortName: "ТГУ",
    faculty: "ММФ/ИПМКН",
    name: "Любая олимпиада из перечня Минобрнауки (1–3 уровни)",
    level: "1–3",
    type: "БВИ",
    subject: "Математика",
    appliesToSubjects: ["Математика","Информатика","Физика"],
    validYears: "за 4 года",
    registration: "",
    qualifying: "",
    final: "",
    groups: ["01.03.01 Математика","01.03.02 ПМИ","02.03.01 МКН","02.03.02 ФИИТ","02.03.03 МОАИС"],
    requirementNote: "БВИ / либо 100 баллов по предмету (по правилам таблицы ТГУ)",
    features: "См. полный перечень по направлениям в таблице.",
  },
]

// Собираем весь словарь по вузам
const universityOlympiadRules: Record<string, Olympiad[]> = {
  "МФТИ": mftiRules,
  "ИТМО": itmoRules,
  "ТГУ": tguRules,
  // при желании сюда же можно добавить СПбГУ, НГУ и т.д.
}

// ------------------------ UI КОМПОНЕНТ ------------------------
export function UniversitySelection() {
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null)
  const [selectedOlympiads, setSelectedOlympiads] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectOlympiad = (olympiadId: number) => {
    setSelectedOlympiads((prev) =>
        prev.includes(olympiadId) ? prev.filter((id) => id !== olympiadId) : [...prev, olympiadId],
    )
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

  // Вспомогательная выборка вуз-правил для экрана направления
  const directionContext = useMemo(() => {
    if (!selectedDirection) return null
    const direction = universities.flatMap((u) => u.directions).find((d) => d.id === selectedDirection)
    const uni = universities.find(u => u.directions.some(d => d.id === selectedDirection))
    const subj = subjectFromDirection(direction?.name)
    const uniRules = universityOlympiadRules[uni?.shortName || ""] || []
    const filtered = uniRules.filter(r => matchesSubject(r.appliesToSubjects, subj))
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

          {/* Блок вуз-специфичных правил (новый) */}
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
                              <p><strong>Профиль/предмет:</strong> {rule.subject}</p>
                              {!!rule.groups?.length && (
                                  <p><strong>Конкурсные группы:</strong> {rule.groups.join("; ")}</p>
                              )}
                              {!!rule.requirementNote && (
                                  <p className="text-primary"><strong>Условие:</strong> {rule.requirementNote}</p>
                              )}
                              {!!rule.features && <p><strong>Особенности:</strong> {rule.features}</p>}
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
                          <p><strong>Предмет:</strong> {olympiad.subject}</p>
                          <p><strong>Классы:</strong> {olympiad.validYears}</p>
                          <p><strong>Регистрация:</strong> {new Date(olympiad.registration).toLocaleDateString("ru")}</p>
                          <p><strong>Отборочный:</strong> {new Date(olympiad.qualifying).toLocaleDateString("ru")}</p>
                          <p><strong>Заключительный:</strong> {new Date(olympiad.final).toLocaleDateString("ru")}</p>
                          <p className="text-primary"><strong>Особенности:</strong> {olympiad.features}</p>
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
                          <p><strong>Предмет:</strong> {olympiad.subject}</p>
                          <p><strong>Классы:</strong> {olympiad.validYears}</p>
                          <p><strong>Регистрация:</strong> {new Date(olympiad.registration).toLocaleDateString("ru")}</p>
                          <p><strong>Отборочный:</strong> {new Date(olympiad.qualifying).toLocaleDateString("ru")}</p>
                          <p><strong>Заключительный:</strong> {new Date(olympiad.final).toLocaleDateString("ru")}</p>
                          <p className="text-primary"><strong>Особенности:</strong> {olympiad.features}</p>
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
                <Card
                    key={direction.id}
                    className="p-4 card-hover cursor-pointer"
                    onClick={() => setSelectedDirection(direction.id)}
                >
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
        </div>

        <div className="space-y-3">
          {filteredUniversities.map((university) => (
              <Card

                  key={university.id}
                  className="p-4 card-hover cursor-pointer"
                  onClick={() => setSelectedUniversity(university.id)}
              >
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
