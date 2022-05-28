export function dateUTCNow() {
  return new Date(new Date().toUTCString())
}

export function addHours(date: Date, hours: number) {
  return date.setTime(date.getTime() + hours * 60 * 60 * 1000)
}
