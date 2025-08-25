"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const universityChats = [
  {
    id: 1,
    name: "МГУ им. М.В. Ломоносова",
    shortName: "МГУ",
    logo: "🏛️",
    curator: "Анна Петрова",
    curatorYear: "3 курс",
    members: 1247,
    description:
      "Общение студентов и абитуриентов МГУ. Делимся опытом поступления, рассказываем о жизни в университете.",
    chatLink: "https://t.me/+example_mgu_chat",
  },
  {
    id: 2,
    name: "МФТИ",
    shortName: "МФТИ",
    logo: "🚀",
    curator: "Дмитрий Иванов",
    curatorYear: "4 курс",
    members: 892,
    description: "Физтех-сообщество для будущих и настоящих студентов. Обсуждаем олимпиады, поступление и учёбу.",
    chatLink: "https://t.me/+example_mipt_chat",
  },
  {
    id: 3,
    name: "НИУ ВШЭ",
    shortName: "ВШЭ",
    logo: "📊",
    curator: "Мария Сидорова",
    curatorYear: "2 курс",
    members: 1156,
    description: "Вышка для всех! Помогаем с поступлением, делимся лайфхаками студенческой жизни.",
    chatLink: "https://t.me/+example_hse_chat",
  },
  {
    id: 4,
    name: "МГТУ им. Н.Э. Баумана",
    shortName: "Бауманка",
    logo: "⚙️",
    curator: "Алексей Козлов",
    curatorYear: "5 курс",
    members: 634,
    description: "Техническое сообщество Бауманки. Обсуждаем инженерные специальности и поступление.",
    chatLink: "https://t.me/+example_bmstu_chat",
  },
  {
    id: 5,
    name: "СПбГУ",
    shortName: "СПбГУ",
    logo: "🏰",
    curator: "Екатерина Новикова",
    curatorYear: "3 курс",
    members: 789,
    description: "Питерский университет объединяет! Рассказываем о поступлении и студенческой жизни в СПб.",
    chatLink: "https://t.me/+example_spbu_chat",
  },
]

export function UniversityChats() {
  const generateChatLink = (baseLink: string) => {
    // Generate unique invite link (in real app this would be done on backend)
    const timestamp = Date.now()
    return `${baseLink}_${timestamp}`
  }

  const handleJoinChat = (chat: (typeof universityChats)[0]) => {
    const uniqueLink = generateChatLink(chat.chatLink)
    window.open(uniqueLink, "_blank")
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">Чаты по вузам</h2>
        <p className="text-sm text-neutral-gray">Общайтесь со студентами и абитуриентами</p>
      </div>

      <div className="space-y-4">
        {universityChats.map((chat) => (
          <Card key={chat.id} className="p-4 card-hover">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-3xl">{chat.logo}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary">{chat.shortName}</h3>
                  <Badge variant="secondary" className="text-xs bg-accent text-primary">
                    {chat.members} участников
                  </Badge>
                </div>
                <p className="text-xs text-neutral-gray mb-2">{chat.name}</p>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👤</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">{chat.curator}</p>
                    <p className="text-xs text-neutral-gray">Куратор • {chat.curatorYear}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-gray mb-4">{chat.description}</p>

            <div className="flex gap-2">
              <Button onClick={() => handleJoinChat(chat)} className="flex-1 bg-primary text-white">
                Присоединиться к чату
              </Button>
              <Button variant="outline" size="sm" className="text-primary bg-transparent">
                ℹ️
              </Button>
            </div>

            <div className="mt-3 p-2 bg-accent/20 rounded-lg">
              <p className="text-xs text-primary">
                💡 <strong>Что вас ждёт:</strong> Советы по поступлению, разбор олимпиадных задач, истории студентов,
                анонсы мероприятий и дней открытых дверей
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-accent/10">
        <div className="text-center">
          <h4 className="font-semibold text-primary mb-2">Правила чатов</h4>
          <div className="text-xs text-neutral-gray space-y-1">
            <p>• Будьте вежливы и уважительны</p>
            <p>• Не спамьте и не флудите</p>
            <p>• Задавайте вопросы по теме</p>
            <p>• Помогайте другим участникам</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
