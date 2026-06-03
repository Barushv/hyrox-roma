export const STORAGE_KEYS = {
  profiles: 'hyrox_profiles',
  activeProfile: 'hyrox_active_profile',
  completedDays: (profileId) => `hyrox_completed_${profileId}`,
  completedExercises: (profileId, weekDay) => `hyrox_exercises_${profileId}_${weekDay}`,
  tests: (profileId) => `hyrox_tests_${profileId}`,
}

export function getProfiles() {
  const saved = localStorage.getItem(STORAGE_KEYS.profiles)
  if (saved) return JSON.parse(saved)
  return [
    { id: 'p1', name: 'Usuario 1' },
    { id: 'p2', name: 'Usuario 2' },
  ]
}

export function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles))
}

export function getActiveProfile() {
  return localStorage.getItem(STORAGE_KEYS.activeProfile) || null
}

export function setActiveProfile(id) {
  localStorage.setItem(STORAGE_KEYS.activeProfile, id)
}

export function getCompletedDays(profileId) {
  const saved = localStorage.getItem(STORAGE_KEYS.completedDays(profileId))
  return saved ? JSON.parse(saved) : {}
}

export function setDayComplete(profileId, key, value) {
  const data = getCompletedDays(profileId)
  data[key] = value
  localStorage.setItem(STORAGE_KEYS.completedDays(profileId), JSON.stringify(data))
}

export function getCompletedExercises(profileId, weekDay) {
  const key = STORAGE_KEYS.completedExercises(profileId, weekDay)
  const saved = localStorage.getItem(key)
  return saved ? JSON.parse(saved) : {}
}

export function setExerciseComplete(profileId, weekDay, exerciseIndex, value) {
  const data = getCompletedExercises(profileId, weekDay)
  data[exerciseIndex] = value
  localStorage.setItem(STORAGE_KEYS.completedExercises(profileId, weekDay), JSON.stringify(data))
}

export function getTests(profileId) {
  const saved = localStorage.getItem(STORAGE_KEYS.tests(profileId))
  return saved ? JSON.parse(saved) : {}
}

export function setTest(profileId, testId, dateKey, value) {
  const data = getTests(profileId)
  if (!data[testId]) data[testId] = {}
  data[testId][dateKey] = value
  localStorage.setItem(STORAGE_KEYS.tests(profileId), JSON.stringify(data))
}
