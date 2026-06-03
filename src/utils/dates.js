export function getWeekNumber(startDate, currentDate) {
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const current = new Date(currentDate)
  current.setHours(0, 0, 0, 0)
  const diffMs = current - start
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 1
  const week = Math.floor(diffDays / 7) + 1
  return Math.min(Math.max(week, 1), 16)
}

export function getDayIndex(startDate, currentDate) {
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const current = new Date(currentDate)
  current.setHours(0, 0, 0, 0)
  const diffDays = Math.floor((current - start) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return null
  return diffDays % 7
}

export function getDateForWeekDay(startDate, weekIndex, dayIndex) {
  const start = new Date(startDate)
  const totalDays = weekIndex * 7 + dayIndex
  const result = new Date(start)
  result.setDate(result.getDate() + totalDays)
  return result
}

export function isToday(date) {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

export function isPast(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d < today
}

export function formatDate(date) {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}
