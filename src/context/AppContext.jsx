import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  getProfiles, saveProfiles, getActiveProfile, setActiveProfile,
  getCompletedDays, setDayComplete as storeDayComplete,
  getCompletedExercises, setExerciseComplete as storeExerciseComplete,
  getTests, setTest as storeTest
} from '../utils/storage'
import { getWeekNumber } from '../utils/dates'

const AppContext = createContext(null)

export function AppProvider({ children, planData }) {
  const [profiles, setProfiles] = useState(getProfiles)
  const [activeProfileId, setActiveProfileId] = useState(getActiveProfile)
  const [completedDays, setCompletedDays] = useState({})
  const [completedExercises, setCompletedExercises] = useState({})
  const [tests, setTests] = useState({})

  const today = new Date()
  const currentWeek = getWeekNumber(planData.meta.startDate, today)

  useEffect(() => {
    if (activeProfileId) {
      setCompletedDays(getCompletedDays(activeProfileId))
      setTests(getTests(activeProfileId))
    }
  }, [activeProfileId])

  function selectProfile(id) {
    setActiveProfile(id)
    setActiveProfileId(id)
    setCompletedDays(getCompletedDays(id))
    setTests(getTests(id))
  }

  function updateProfileName(id, name) {
    const updated = profiles.map(p => p.id === id ? { ...p, name } : p)
    setProfiles(updated)
    saveProfiles(updated)
  }

  function toggleDayComplete(weekDay, value) {
    storeDayComplete(activeProfileId, weekDay, value)
    setCompletedDays(prev => ({ ...prev, [weekDay]: value }))
  }

  const getExercisesForDay = useCallback((weekDay) => {
    const data = getCompletedExercises(activeProfileId, weekDay)
    return data
  }, [activeProfileId])

  function toggleExercise(weekDay, index, value) {
    storeExerciseComplete(activeProfileId, weekDay, index, value)
    setCompletedExercises(prev => {
      const dayData = prev[weekDay] || {}
      return { ...prev, [weekDay]: { ...dayData, [index]: value } }
    })
  }

  function saveTestValue(testId, dateKey, value) {
    storeTest(activeProfileId, testId, dateKey, value)
    setTests(prev => {
      const testData = prev[testId] || {}
      return { ...prev, [testId]: { ...testData, [dateKey]: value } }
    })
  }

  return (
    <AppContext.Provider value={{
      planData,
      profiles,
      activeProfileId,
      selectProfile,
      updateProfileName,
      completedDays,
      toggleDayComplete,
      getExercisesForDay,
      completedExercises,
      toggleExercise,
      tests,
      saveTestValue,
      currentWeek,
      today,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
