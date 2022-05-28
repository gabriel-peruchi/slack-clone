export function dateUTCNow() {
  return new Date(new Date().toUTCString())
}
