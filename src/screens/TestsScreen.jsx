import { useState } from 'react'
import { useApp } from '../context/AppContext'

const TEST_DATES = [
  { key: 'baseline', label: 'Base' },
  { key: 's4', label: 'S4' },
  { key: 's8', label: 'S8' },
  { key: 's12', label: 'S12' },
  { key: 's16', label: 'Final' },
]

function parseTime(val) {
  if (!val) return null
  if (val.includes(':')) {
    const parts = val.split(':')
    if (parts.length === 2) return parseInt(parts[0]) * 60 + parseInt(parts[1] || 0)
    if (parts.length === 3) return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2] || 0)
  }
  const num = parseFloat(val)
  return isNaN(num) ? null : num
}

function getImprovement(prev, curr) {
  const p = parseTime(prev)
  const c = parseTime(curr)
  if (p === null || c === null) return null
  return p - c
}

function ImprovementBadge({ diff }) {
  if (diff === null) return null
  if (diff > 0) return <span className="text-xs text-green-600 font-bold">▼ {diff}s</span>
  if (diff < 0) return <span className="text-xs text-red-500 font-bold">▲ {Math.abs(diff)}s</span>
  return <span className="text-xs text-gray-400">—</span>
}

export default function TestsScreen() {
  const { planData, tests, saveTestValue, profiles, activeProfileId } = useApp()
  const [editing, setEditing] = useState(null) // { testId, dateKey }
  const [editValue, setEditValue] = useState('')
  const [selectedDate, setSelectedDate] = useState('baseline')

  function startEdit(testId, dateKey, currentVal) {
    setEditing({ testId, dateKey })
    setEditValue(currentVal || '')
  }

  function confirmEdit() {
    if (editing) {
      saveTestValue(editing.testId, editing.dateKey, editValue)
    }
    setEditing(null)
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 pt-10 pb-5">
        <h1 className="text-xl font-bold">Tests & Marcas</h1>
        <p className="text-sm opacity-70 mt-0.5">Registra tus tiempos y sigue el progreso</p>
      </div>

      {/* Date tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex gap-2 overflow-x-auto">
        {TEST_DATES.map(d => (
          <button
            key={d.key}
            onClick={() => setSelectedDate(d.key)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedDate === d.key
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Tests table */}
      <div className="px-4 mt-4 space-y-3">
        {planData.tests.map(test => {
          const dateIndex = TEST_DATES.findIndex(d => d.key === selectedDate)
          const prevDateKey = dateIndex > 0 ? TEST_DATES[dateIndex - 1].key : null
          const currentVal = tests[test.id]?.[selectedDate] || ''
          const prevVal = prevDateKey ? (tests[test.id]?.[prevDateKey] || '') : ''
          const diff = prevVal && currentVal ? getImprovement(prevVal, currentVal) : null
          const isEditing = editing?.testId === test.id && editing?.dateKey === selectedDate

          return (
            <div key={test.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{test.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Objetivo: {test.objetivo}</p>
                </div>
                {diff !== null && <ImprovementBadge diff={diff} />}
              </div>

              {/* All dates row */}
              <div className="grid grid-cols-5 gap-1 mt-2">
                {TEST_DATES.map(d => {
                  const val = tests[test.id]?.[d.key] || ''
                  const isSelected = d.key === selectedDate
                  return (
                    <button
                      key={d.key}
                      onClick={() => startEdit(test.id, d.key, val)}
                      className={`rounded-xl py-2 text-center transition-all ${
                        isSelected
                          ? 'bg-gray-800 text-white'
                          : val
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-50 text-gray-400 border border-dashed border-gray-200'
                      }`}
                    >
                      <div className="text-xs opacity-70">{d.label}</div>
                      <div className="text-sm font-bold">{val || '—'}</div>
                    </button>
                  )
                })}
              </div>

              {isEditing && (
                <div className="mt-3 flex gap-2">
                  <input
                    autoFocus
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    placeholder={`ej: 3:45 (${test.unit})`}
                    onKeyDown={e => e.key === 'Enter' && confirmEdit()}
                  />
                  <button
                    onClick={confirmEdit}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    OK
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="px-4 mt-6 mb-4">
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs font-semibold text-blue-700 mb-2">¿Cómo registrar tiempos?</p>
          <p className="text-xs text-blue-600">• Tiempo: <strong>3:45</strong> = 3 min 45 seg</p>
          <p className="text-xs text-blue-600 mt-1">• Pace: <strong>5:10</strong> = 5:10 /km</p>
          <p className="text-xs text-blue-600 mt-1">• Segundos: solo escribe el número <strong>18</strong></p>
        </div>
      </div>
    </div>
  )
}
