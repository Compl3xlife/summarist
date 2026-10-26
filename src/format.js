export function clock(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "00:00"
  const minutes = Math.floor(seconds / 60)
  const remain = Math.floor(seconds % 60)
  return `${minutes < 10 ? `0${minutes}` : minutes}:${remain < 10 ? `0${remain}` : remain}`
}

export function words(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0 mins 0 secs"
  const minutes = Math.floor(seconds / 60)
  const remain = Math.floor(seconds % 60)
  return `${minutes} ${minutes === 1 ? "min" : "mins"} ${remain} ${remain === 1 ? "sec" : "secs"}`
}

export async function hashPassword(password) {
  const data = new TextEncoder().encode(password)
  const buf = await crypto.subtle.digest("SHA-256", data)
  return [...new Uint8Array(buf)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}
