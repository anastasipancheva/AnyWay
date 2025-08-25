"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Direction {
  id: number
  name: string
  code: string
}

interface University {
  id: number
  name: string
  shortName: string
  logo: string
  directions: Direction[]
}

interface Olympiad {
  id: number
  name: string
  level: string | number
  type: string
  subject: string
  validYears: string
  registration: string
  qualifying: string
  final: string
  features: string
}

const universities: University[] = [
  {
    id: 1,
    name: "МГУ им. М.В. Ломоносова",
    shortName: "МГУ",
    logo: "🏛️",
    directions: [
      { id: 1, name: "Математика", code: "01.03.01" },
      { id: 2, name: "Физика", code: "03.03.02" },
      { id: 3, name: "Информатика и вычислительная техника", code: "09.03.01" },
      { id: 4, name: "Экономика", code: "38.03.01" },
      { id: 5, name: "Журналистика", code: "42.03.02" },
      { id: 6, name: "Химия", code: "04.03.01" },
      { id: 7, name: "Биология", code: "06.03.01" },
      { id: 8, name: "История", code: "46.03.01" },
      { id: 9, name: "Филология", code: "45.03.01" },
      { id: 10, name: "Психология", code: "37.03.01" },
      { id: 11, name: "Социология", code: "39.03.01" },
      { id: 12, name: "Международные отношения", code: "41.03.05" },
    ],
  },
  {
    id: 2,
    name: "МГТУ им. Н.Э. Баумана",
    shortName: "Бауманка",
    logo: "⚙️",
    directions: [
      { id: 13, name: "Машиностроение", code: "15.03.01" },
      { id: 14, name: "Информатика и вычислительная техника", code: "09.03.01" },
      { id: 15, name: "Автоматизация технологических процессов", code: "15.03.04" },
      { id: 16, name: "Радиотехника", code: "11.03.01" },
      { id: 17, name: "Электроника и наноэлектроника", code: "11.03.04" },
      { id: 18, name: "Ракетные комплексы и космонавтика", code: "24.03.01" },
      { id: 19, name: "Авиастроение", code: "24.03.04" },
      { id: 20, name: "Материаловедение", code: "22.03.01" },
      { id: 21, name: "Энергетическое машиностроение", code: "13.03.03" },
      { id: 22, name: "Биомедицинская инженерия", code: "12.03.04" },
      { id: 23, name: "Программная инженерия", code: "09.03.04" },
      { id: 24, name: "Информационная безопасность", code: "10.03.01" },
    ],
  },
  {
    id: 3,
    name: "МФТИ",
    shortName: "МФТИ",
    logo: "🚀",
    directions: [
      { id: 25, name: "Прикладная математика и физика", code: "03.03.01" },
      { id: 26, name: "Физика", code: "03.03.02" },
      { id: 27, name: "Информатика и вычислительная техника", code: "09.03.01" },
      { id: 28, name: "Прикладная математика и информатика", code: "01.03.02" },
      { id: 29, name: "Системный анализ и управление", code: "27.03.03" },
      { id: 30, name: "Биотехнические системы и технологии", code: "12.03.01" },
      { id: 31, name: "Радиофизика", code: "03.03.03" },
      { id: 32, name: "Аэрокосмические технологии", code: "24.03.02" },
      { id: 33, name: "Экономика", code: "38.03.01" },
      { id: 34, name: "Менеджмент", code: "38.03.02" },
      { id: 35, name: "Химия", code: "04.03.01" },
      { id: 36, name: "Биология", code: "06.03.01" },
    ],
  },
  {
    id: 4,
    name: "СПбГУ",
    shortName: "СПбГУ",
    logo: "🏰",
    directions: [
      { id: 37, name: "Филология", code: "45.03.01" },
      { id: 38, name: "История", code: "46.03.01" },
      { id: 39, name: "Математика", code: "01.03.01" },
      { id: 40, name: "Физика", code: "03.03.02" },
      { id: 41, name: "Экономика", code: "38.03.01" },
      { id: 42, name: "Международные отношения", code: "41.03.05" },
      { id: 43, name: "Журналистика", code: "42.03.02" },
      { id: 44, name: "Психология", code: "37.03.01" },
      { id: 45, name: "Социология", code: "39.03.01" },
      { id: 46, name: "Философия", code: "47.03.01" },
      { id: 47, name: "Юриспруденция", code: "40.03.01" },
      { id: 48, name: "Химия", code: "04.03.01" },
    ],
  },
  {
    id: 5,
    name: "ИТМО",
    shortName: "ИТМО",
    logo: "💻",
    directions: [
      { id: 49, name: "Информатика и вычислительная техника", code: "09.03.01" },
      { id: 50, name: "Программная инженерия", code: "09.03.04" },
      { id: 51, name: "Информационные системы и технологии", code: "09.03.02" },
      { id: 52, name: "Прикладная математика и информатика", code: "01.03.02" },
      { id: 53, name: "Фотоника и оптоинформатика", code: "12.03.03" },
      { id: 54, name: "Биотехнология", code: "19.03.01" },
      { id: 55, name: "Дизайн", code: "54.03.01" },
      { id: 56, name: "Менеджмент", code: "38.03.02" },
      { id: 57, name: "Экономика", code: "38.03.01" },
      { id: 58, name: "Робототехника", code: "15.03.06" },
      { id: 59, name: "Информационная безопасность", code: "10.03.01" },
      { id: 60, name: "Физика", code: "03.03.02" },
    ],
  },
  {
    id: 6,
    name: "НИЯУ МИФИ",
    shortName: "МИФИ",
    logo: "⚛️",
    directions: [
      { id: 61, name: "Ядерная физика и технологии", code: "14.03.02" },
      { id: 62, name: "Прикладная математика и физика", code: "03.03.01" },
      { id: 63, name: "Информатика и вычислительная техника", code: "09.03.01" },
      { id: 64, name: "Автоматизация технологических процессов", code: "15.03.04" },
      { id: 65, name: "Электроника и наноэлектроника", code: "11.03.04" },
      { id: 66, name: "Информационная безопасность", code: "10.03.01" },
      { id: 67, name: "Экономика", code: "38.03.01" },
      { id: 68, name: "Менеджмент", code: "38.03.02" },
      { id: 69, name: "Материаловедение", code: "22.03.01" },
      { id: 70, name: "Химическая технология", code: "18.03.01" },
      { id: 71, name: "Биотехнические системы", code: "12.03.01" },
      { id: 72, name: "Лазерная техника и лазерные технологии", code: "12.03.02" },
    ],
  },
  {
    id: 7,
    name: "МГИМО",
    shortName: "МГИМО",
    logo: "🌍",
    directions: [
      { id: 73, name: "Международные отношения", code: "41.03.05" },
      { id: 74, name: "Зарубежное регионоведение", code: "41.03.01" },
      { id: 75, name: "Экономика", code: "38.03.01" },
      { id: 76, name: "Менеджмент", code: "38.03.02" },
      { id: 77, name: "Юриспруденция", code: "40.03.01" },
      { id: 78, name: "Журналистика", code: "42.03.02" },
      { id: 79, name: "Реклама и связи с общественностью", code: "42.03.01" },
      { id: 80, name: "Лингвистика", code: "45.03.02" },
      { id: 81, name: "Политология", code: "41.03.04" },
      { id: 82, name: "Государственное и муниципальное управление", code: "38.03.04" },
      { id: 83, name: "Бизнес-информатика", code: "38.03.05" },
      { id: 84, name: "Торговое дело", code: "38.03.06" },
    ],
  },
  {
    id: 8,
    name: "НИУ ВШЭ",
    shortName: "ВШЭ",
    logo: "📊",
    directions: [
      { id: 85, name: "Экономика", code: "38.03.01" },
      { id: 86, name: "Менеджмент", code: "38.03.02" },
      { id: 87, name: "Социология", code: "39.03.01" },
      { id: 88, name: "Политология", code: "41.03.04" },
      { id: 89, name: "Юриспруденция", code: "40.03.01" },
      { id: 90, name: "Журналистика", code: "42.03.02" },
      { id: 91, name: "Дизайн", code: "54.03.01" },
      { id: 92, name: "История", code: "46.03.01" },
      { id: 93, name: "Философия", code: "47.03.01" },
      { id: 94, name: "Психология", code: "37.03.01" },
      { id: 95, name: "Прикладная математика и информатика", code: "01.03.02" },
      { id: 96, name: "Бизнес-информатика", code: "38.03.05" },
    ],
  },
  {
    id: 9,
    name: "СПбПУ Петра Великого",
    shortName: "СПбПУ",
    logo: "🏭",
    directions: [
      { id: 97, name: "Машиностроение", code: "15.03.01" },
      { id: 98, name: "Информатика и вычислительная техника", code: "09.03.01" },
      { id: 99, name: "Строительство", code: "08.03.01" },
      { id: 100, name: "Энергетика", code: "13.03.02" },
      { id: 101, name: "Материаловедение", code: "22.03.01" },
      { id: 102, name: "Химическая технология", code: "18.03.01" },
      { id: 103, name: "Экономика", code: "38.03.01" },
      { id: 104, name: "Менеджмент", code: "38.03.02" },
      { id: 105, name: "Автоматизация технологических процессов", code: "15.03.04" },
      { id: 106, name: "Электроэнергетика", code: "13.03.02" },
      { id: 107, name: "Металлургия", code: "22.03.02" },
      { id: 108, name: "Техносферная безопасность", code: "20.03.01" },
    ],
  },
]

const olympiads: Record<number, Olympiad[]> = {
  // МГУ Математика
  1: [
    {
      id: 1,
      name: "Всероссийская олимпиада школьников по математике",
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
  // МГУ Физика
  2: [
    {
      id: 4,
      name: "Всероссийская олимпиада школьников по физике",
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
  // МГУ Информатика
  3: [
    {
      id: 6,
      name: "Всероссийская олимпиада школьников по информатике",
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
  // МГУ Экономика
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

export function UniversitySelection() {
  const [selectedUniversity, setSelectedUniversity] = useState<number | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null)
  const [selectedOlympiads, setSelectedOlympiads] = useState<number[]>([])

  const handleSelectOlympiad = (olympiadId: number) => {
    setSelectedOlympiads((prev) =>
      prev.includes(olympiadId) ? prev.filter((id) => id !== olympiadId) : [...prev, olympiadId],
    )
  }

  if (selectedDirection) {
    const directionOlympiads = olympiads[selectedDirection] || []

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" onClick={() => setSelectedDirection(null)} className="text-primary">
            ← Назад
          </Button>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-primary">Олимпиады для поступления</h2>

          <div className="space-y-2">
            <h3 className="font-semibold text-primary text-sm">🏆 БВИ (Без вступительных испытаний)</h3>
            {directionOlympiads
              .filter((o) => o.type === "БВИ")
              .map((olympiad) => (
                <Card
                  key={olympiad.id}
                  className="p-4 card-hover cursor-pointer"
                  onClick={() => handleSelectOlympiad(olympiad.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-primary text-sm">{olympiad.name}</h4>
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
            <h3 className="font-semibold text-primary text-sm">💯 100 баллов ЕГЭ</h3>
            {directionOlympiads
              .filter((o) => o.type === "100 баллов")
              .map((olympiad) => (
                <Card
                  key={olympiad.id}
                  className="p-4 card-hover cursor-pointer"
                  onClick={() => handleSelectOlympiad(olympiad.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-primary text-sm">{olympiad.name}</h4>
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
            <Card
              key={direction.id}
              className="p-4 card-hover cursor-pointer"
              onClick={() => setSelectedDirection(direction.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-primary">{direction.name}</h3>
                  <p className="text-xs text-neutral-gray">{direction.code}</p>
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
        <p className="text-sm text-neutral-gray">Найдите олимпиады для поступления</p>
      </div>

      <div className="space-y-3">
        {universities.map((university) => (
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
    </div>
  )
}
