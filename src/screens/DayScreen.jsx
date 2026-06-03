import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getDateForWeekDay, formatDate } from '../utils/dates'
import { getCompletedExercises } from '../utils/storage'

const PHASE_COLORS = {
  1: '#185FA5',
  2: '#3B6D11',
  3: '#993C1D',
  4: '#534AB7',
}

const DAY_NAMES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export default function DayScreen({ weekNum, dayIndex, onBack }) {
  const { planData, activeProfileId, completedDays, toggleDayComplete, toggleExercise } = useApp()
  const weekData = planData.weeks[weekNum - 1]
  const dayData = weekData.days[dayIndex]
  const phaseColor = PHASE_COLORS[weekData.phase] || '#185FA5'
  const dayKey = `w${weekNum}d${dayIndex}`
  const date = getDateForWeekDay(planData.meta.startDate, weekNum - 1, dayIndex)
  const dayCompleted = completedDays[dayKey] || false

  const [exerciseState, setExerciseState] = useState({})

  useEffect(() => {
    setExerciseState(getCompletedExercises(activeProfileId, dayKey))
  }, [activeProfileId, dayKey])

  function handleToggleExercise(index) {
    const newVal = !exerciseState[index]
    toggleExercise(dayKey, index, newVal)
    setExerciseState(prev => ({ ...prev, [index]: newVal }))
  }

  function handleToggleDay() {
    toggleDayComplete(dayKey, !dayCompleted)
  }

  const completedCount = Object.values(exerciseState).filter(Boolean).length
  const totalExercises = dayData.exercises?.length || 0

  // Group exercises by bloque
  const bloques = []
  if (dayData.exercises) {
    dayData.exercises.forEach((ex, i) => {
      const last = bloques[bloques.length - 1]
      if (!last || last.name !== ex.bloque) {
        bloques.push({ name: ex.bloque, exercises: [{ ...ex, index: i }] })
      } else {
        last.exercises.push({ ...ex, index: i })
      }
    })
  }

  return (
    <div className="pb-28">
      {/* Header */}
      <div className="text-white px-4 pt-10 pb-5" style={{ background: phaseColor }}>
        <button onClick={onBack} className="text-sm opacity-80 mb-3 flex items-center gap-1">
          ‹ Semana {weekNum}
        </button>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs opacity-75">{DAY_NAMES[dayIndex]} · {formatDate(date)}</p>
            <h1 className="text-xl font-bold mt-0.5">{dayData.sessionType}</h1>
            <p className="text-xs opacity-80 mt-1">{dayData.timeStr}</p>
          </div>
        </div>
        {dayData.sessionAm && (
          <div className="mt-2 bg-white bg-opacity-15 rounded-lg px-3 py-2">
            <p className="text-xs opacity-80">🌅 {dayData.sessionAm}</p>
            {dayData.sessionPm && <p className="text-xs opacity-80 mt-0.5">🌆 {dayData.sessionPm}</p>}
          </div>
        )}
        {totalExercises > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-white bg-opacity-20 rounded-full h-1.5">
              <div
                className="bg-white rounded-full h-1.5 transition-all"
                style={{ width: `${totalExercises ? (completedCount / totalExercises) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs opacity-80">{completedCount}/{totalExercises}</span>
          </div>
        )}
      </div>

      {/* Mark day complete */}
      <div className="px-4 mt-4">
        <button
          onClick={handleToggleDay}
          className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all ${
            dayCompleted
              ? 'bg-green-500 text-white'
              : 'bg-white border-2 text-gray-700'
          }`}
          style={!dayCompleted ? { borderColor: phaseColor, color: phaseColor } : {}}
        >
          {dayCompleted ? '✅ Día completado' : 'Marcar día como completado'}
        </button>
      </div>

      {/* Exercises */}
      <div className="px-4 mt-4 space-y-4">
        {bloques.map((bloque) => (
          <div key={bloque.name}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {bloque.name}
            </p>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {bloque.exercises.map((ex, j) => {
                const done = exerciseState[ex.index] || false
                return (
                  <button
                    key={ex.index}
                    onClick={() => handleToggleExercise(ex.index)}
                    className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-all active:opacity-70 ${
                      j < bloque.exercises.length - 1 ? 'border-b border-gray-100' : ''
                    } ${ex.highlight ? '' : ''}`}
                    style={{
                      backgroundColor: ex.highlight ? '#FFFBEB' : (done ? '#F0FDF4' : ex.color || '#ffffff'),
                    }}
                  >
                    {/* Checkbox */}
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-all ${
                      done ? 'border-transparent' : 'border-gray-300 bg-white'
                    }`}
                    style={done ? { background: phaseColor, borderColor: phaseColor } : {}}
                    >
                      {done && <span className="text-white text-xs font-bold">✓</span>}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-base font-semibold leading-tight ${done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {ex.ejercicio}
                      </p>
                      <p className={`text-sm font-medium mt-0.5 ${done ? 'text-gray-300' : 'text-gray-600'}`}>
                        {ex.series}
                      </p>
                      {ex.detalle && (
                        <p className={`text-xs mt-0.5 ${done ? 'text-gray-300' : 'text-gray-500'}`}>
                          {ex.detalle}
                        </p>
                      )}
                      {ex.nota && (
                        <p className={`text-xs mt-1 font-medium italic ${done ? 'text-gray-300' : 'text-gray-500'}`}>
                          💡 {ex.nota}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
