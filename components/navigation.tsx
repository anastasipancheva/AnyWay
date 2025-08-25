"use client"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "profile", label: "Профиль", icon: "👤" },
    { id: "universities", label: "Вузы", icon: "🎓" },
    { id: "calendar", label: "Календарь", icon: "📅" },
    { id: "buddy", label: "Напарник", icon: "👥" },
    { id: "chats", label: "Чаты", icon: "💬" },
  ]

  return (
    <nav className="bg-white border-t border-neutral-gray/20 px-2 py-1">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              activeTab === tab.id ? "bg-accent text-primary" : "text-neutral-gray hover:text-primary"
            }`}
          >
            <span className="text-lg mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
