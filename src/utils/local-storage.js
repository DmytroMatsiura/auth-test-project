export const lsGet = (key) => {
  return localStorage.getItem(key)
}

export const lsSet = (key, payload) => {
  if (!payload) return

  const typesToStringify = ['object']

  if (typesToStringify.includes(typeof payload)) {
    localStorage.setItem(key, JSON.stringify(payload))
    return
  }

  localStorage.setItem(key, payload)
}

export const lsRemove = (key) => localStorage.removeItem(key)
