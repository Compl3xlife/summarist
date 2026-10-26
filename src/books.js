import catalog from "./data/catalog.json"

export const books = catalog

export function getBook(id) {
  return books.find((book) => book.id === id)
}

export function byStatus(status) {
  return books.filter((book) => book.status === status)
}

const durations = {}

export function rememberDuration(src, value) {
  if (src && value) durations[src] = value
}

export function cachedDuration(src) {
  return durations[src] || 0
}
