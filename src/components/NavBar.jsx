import { useApp } from '../context/AppContext'

const TABS = [
  { id: 'home', label: 'Inicio', icon: '🏠' },
  { id: 'week', label: 'Semanas', icon: '📅' },
  { id: 'tests', label: 'Tests', icon: '📊' },
]

export default function NavBar({ activeTab, onTabChange }) {
  const { profiles, activeProfileId } = useApp()
  const profile = profiles.find(p => p.id === activeProfileId)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="flex">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center pt-2 pb-3 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex-1 flex flex-col items-center pt-2 pb-3 text-xs font-medium transition-colors ${
            activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <span className="text-xl mb-0.5">👤</span>
          {profile?.name?.split(' ')[0] || 'Perfil'}
        </button>
      </div>
    </nav>
  )
}
