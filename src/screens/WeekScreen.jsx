import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { getDateForWeekDay, isToday, isPast, formatDate } from '../utils/dates'

const PHASE_COLORS = {
  1: '#185FA5',
  2: '#3B6D11',
  3: '#993C1D',
  4: '#534AB7',
}

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export default function WeekScreen({ initialWeek, onOpenDay }) {
  const { planData, completedDays, currentWeek } = useApp()
  const [selectedWeek, setSelectedWeek] = useState(initialWeek || currentWeek)
  const [showCalendar, setShowCalendar] = useState(false)

  const weekData = planData.weeks[selectedWeek - 1]
  const phaseColor = PHASE_COLORS[weekData.phase] || '#185FA5'
  const startDate = planData.meta.startDate

  const weeks = planData.weeks.map((w, i) => ({
    ...w,
    weekNum: i + 1,
    phaseColor: PHASE_COLORS[w.phase] || '#185FA5',
  }))

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="text-white px-4 pt-10 pb-4" style={{ background: phaseColor }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-75">Fase {weekData.phase} · Semana {selectedWeek}/16</p>
            <h1 className="text-xl font-bold mt-0.5">{weekData.title}</h1>
            <p className="text-xs opacity-75 mt-1">{weekData.focus}</p>
          </div>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="bg-white bg-opacity-20 rounded-xl px-3 py-2 text-sm font-medium"
          >
            📅
          </button>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setSelectedWeek(w => Math.max(1, w - 1))}
            disabled={selectedWeek <= 1}
            className="bg-white bg-opacity-20 rounded-lg px-3 py-1.5 text-sm disabled:opacity-30"
          >
            ‹ Ant.
          </button>
          <button
            onClick={() => setSelectedWeek(currentWeek)}
            className="bg-white bg-opacity-20 rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            Hoy
          </button>
          <button
            onClick={() => setSelectedWeek(w => Math.min(16, w + 1))}
            disabled={selectedWeek >= 16}
            className="bg-white bg-opacity-20 rounded-lg px-3 py-1.5 text-sm disabled:opacity-30"
          >
            Sig. ›
          </button>
        </div>
      </div>

      {/* Mini calendar */}
      {showCalendar && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <p className="text-xs font-semibold text-gray-500 mb-2">SELECCIONAR SEMANA</p>
          <div className="grid grid-cols-4 gap-2">
            {weeks.map(w => (
              <button
                key={w.weekNum}
                onClick={() => { setSelectedWeek(w.weekNum); setShowCalendar(false) }}
                className={`rounded-xl py-2 text-center text-sm font-medium transition-all ${
                  selectedWeek === w.weekNum ? 'text-white shadow-sm' : 'text-gray-600 bg-gray-50'
                }`}
                style={selectedWeek === w.weekNum ? { background: w.phaseColor } : {}}
              >
                <span className="block text-xs opacity-75">S{w.weekNum}</span>
                {w.weekNum === currentWeek && <span className="text-xs">●</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-3">
            {[1,2,3,4].map(phase => (
              <div key={phase} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: PHASE_COLORS[phase] }} />
                <span className="text-xs text-gray-500">F{phase}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Days list */}
      <div className="px-4 mt-4 space-y-2">
        {weekData.days.map((day, i) => {
          const date = getDateForWeekDay(startDate, selectedWeek - 1, i)
          const dayKey = `w${selectedWeek}d${i}`
          const completed = completedDays[dayKey]
          const todayDay = isToday(date)
          const past = isPast(date)
          const isRestDay = day.sessionType?.toLowerCase().includes('descanso total')

          let statusBg = 'bg-white'
          let statusIcon = ''
          let statusText = 'text-gray-500'
          let indicator = null

          if (completed) {
            statusBg = 'bg-green-50'
            statusIcon = '✅'
            statusText = 'text-green-600'
          } else if (todayDay) {
            indicator = <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: phaseColor }}>HOY</span>
          } else if (isRestDay) {
            statusIcon = '😴'
            statusBg = 'bg-gray-50'
          } else if (past) {
            statusIcon = '⬜'
          }

          return (
            <button
              key={i}
              onClick={() => !isRestDay && onOpenDay(selectedWeek, i)}
              className={`w-full ${statusBg} rounded-2xl border border-gray-200 shadow-sm p-4 text-left ${
                isRestDay ? 'opacity-60 cursor-default' : 'active:bg-gray-50'
              } ${todayDay ? 'border-2' : ''}`}
              style={todayDay ? { borderColor: phaseColor } : {}}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">{DAY_NAMES[i]}</span>
                    <span className="text-xs text-gray-400">{formatDate(date)}</span>
                    {indicator}
                  </div>
                  <p className={`text-sm font-medium ${statusText}`}>{day.sessionType}</p>
                  {day.sessionAm && <p className="text-xs text-gray-400 mt-0.5">🌅 {day.sessionAm}</p>}
                  {day.sessionPm && <p className="text-xs text-gray-400">🌆 {day.sessionPm}</p>}
                </div>
                <div className="flex flex-col items-end gap-1">
                  {statusIcon ? <span className="text-lg">{statusIcon}</span> : <span className="text-gray-300 text-xl">›</span>}
                  {day.exercises?.length > 0 && (
                    <span className="text-xs text-gray-400">{day.exercises.length} ej.</span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
