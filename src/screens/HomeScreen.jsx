import { useApp } from '../context/AppContext'
import { getDateForWeekDay, isToday, isPast, formatDate } from '../utils/dates'

const PHASE_COLORS = {
  1: '#185FA5',
  2: '#3B6D11',
  3: '#993C1D',
  4: '#534AB7',
}

const DAY_NAMES = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const DAY_LABELS = ['Lunes', 'Martes', 'Miérc.', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export default function HomeScreen({ onNavigateWeek, onOpenDay }) {
  const { planData, currentWeek, today, completedDays, profiles, activeProfileId } = useApp()
  const profile = profiles.find(p => p.id === activeProfileId)
  const weekData = planData.weeks[currentWeek - 1]
  const phaseColor = PHASE_COLORS[weekData.phase] || '#185FA5'

  const startDate = planData.meta.startDate
  const raceDate = new Date(2026, 8, 26) // 26 sep 2026, hora local
  const todayDate = new Date(today)
  todayDate.setHours(0, 0, 0, 0)
  const daysLeft = Math.max(0, Math.floor((raceDate - todayDate) / (1000 * 60 * 60 * 24)))

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="text-white px-4 pt-10 pb-6" style={{ background: phaseColor }}>
        <p className="text-sm opacity-80 mb-1">Hola, {profile?.name} 👋</p>
        <h1 className="text-2xl font-bold">Semana {currentWeek}</h1>
        <p className="text-sm opacity-90 mt-1">{weekData.title}</p>
        <p className="text-xs opacity-70 mt-2">{weekData.focus}</p>

        <div className="flex gap-4 mt-4">
          <div className="bg-white bg-opacity-20 rounded-xl px-3 py-2 text-center">
            <div className="text-xl font-bold">{daysLeft}</div>
            <div className="text-xs opacity-80">días para Roma</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl px-3 py-2 text-center">
            <div className="text-xl font-bold">{currentWeek}/16</div>
            <div className="text-xs opacity-80">semana actual</div>
          </div>
        </div>
      </div>

      {/* This week days */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">Esta semana</h2>
          <button
            onClick={() => onNavigateWeek(currentWeek)}
            className="text-sm font-medium"
            style={{ color: phaseColor }}
          >
            Ver semana →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {DAY_NAMES.map((name, i) => {
            const date = getDateForWeekDay(startDate, currentWeek - 1, i)
            const dayKey = `w${currentWeek}d${i}`
            const dayData = weekData.days[i]
            const isRestDay = dayData?.sessionType?.toLowerCase().includes('descanso total')
            const completed = completedDays[dayKey]
            const todayDay = isToday(date)
            const past = isPast(date)

            let bg = 'bg-gray-100'
            let textColor = 'text-gray-400'
            let border = ''

            if (completed) { bg = 'bg-green-500'; textColor = 'text-white' }
            else if (todayDay) { bg = 'bg-white'; border = `border-2`; textColor = 'text-gray-900' }
            else if (isRestDay) { bg = 'bg-gray-200'; textColor = 'text-gray-400' }
            else if (past) { bg = 'bg-red-100'; textColor = 'text-red-400' }

            return (
              <button
                key={i}
                onClick={() => !isRestDay && onOpenDay(currentWeek, i)}
                className={`rounded-xl py-1.5 flex flex-col items-center ${bg} ${border} ${isRestDay ? 'opacity-50 cursor-default' : ''}`}
                style={todayDay && !completed ? { borderColor: phaseColor } : {}}
              >
                <span className={`text-xs font-medium ${textColor}`}>{name}</span>
                <span className={`text-base font-bold ${textColor}`}>{date.getDate()}</span>
                {completed && <span className="text-xs">✓</span>}
                {todayDay && !completed && <span className="text-xs" style={{ color: phaseColor }}>●</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Today's session */}
      {(() => {
        const todayIndex = [0,1,2,3,4,5,6].find(i => isToday(getDateForWeekDay(startDate, currentWeek - 1, i)))
        if (todayIndex === undefined) return null
        const dayData = weekData.days[todayIndex]
        if (!dayData) return null
        return (
          <div className="px-4">
            <h2 className="text-base font-bold text-gray-800 mb-3">Hoy</h2>
            <button
              onClick={() => onOpenDay(currentWeek, todayIndex)}
              className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-left active:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{dayData.sessionType}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{dayData.timeStr}</p>
                  {dayData.sessionAm && (
                    <p className="text-xs text-gray-400 mt-1">🌅 {dayData.sessionAm}</p>
                  )}
                  {dayData.sessionPm && (
                    <p className="text-xs text-gray-400 mt-0.5">🌆 {dayData.sessionPm}</p>
                  )}
                </div>
                <span className="text-gray-300 text-xl">›</span>
              </div>
              <div className="mt-3 text-sm" style={{ color: phaseColor }}>
                {dayData.exercises?.length || 0} ejercicios →
              </div>
            </button>
          </div>
        )
      })()}

      {/* Phase progress */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Progreso del plan</p>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${(currentWeek / 16) * 100}%`, background: phaseColor }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">Semana {currentWeek}</span>
            <span className="text-xs text-gray-400">16 semanas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
