// Mock todos API using localStorage to persist data between reloads
const STORAGE_KEY = 'todos:v1'

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

function writeStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function ensureSeed() {
  let data = readStorage()
  if (!data) {
    data = [
      { id: '1', text: 'Buy groceries', completed: false },
      { id: '2', text: 'Read a bit', completed: true },
    ]
    writeStorage(data)
  }
  return data
}

export async function getTodos() {
  await delay(200)
  const data = ensureSeed()
  return JSON.parse(JSON.stringify(data))
}

export async function createTodo(payload) {
  await delay(200)
  const data = ensureSeed()
  const id = Date.now().toString()
  const todo = { id, text: payload.text || '', completed: false }
  data.unshift(todo)
  writeStorage(data)
  return JSON.parse(JSON.stringify(todo))
}

export async function updateTodo(id, payload) {
  await delay(200)
  const data = ensureSeed()
  const idx = data.findIndex((t) => t.id === id)
  if (idx === -1) throw new Error('Not found')
  data[idx] = { ...data[idx], ...payload }
  writeStorage(data)
  return JSON.parse(JSON.stringify(data[idx]))
}

export async function patchTodo(id, patch) {
  return updateTodo(id, patch)
}

export async function deleteTodo(id) {
  await delay(200)
  let data = ensureSeed()
  data = data.filter((t) => t.id !== id)
  writeStorage(data)
  return { id }
}
