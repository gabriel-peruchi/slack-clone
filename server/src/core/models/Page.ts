export class Page<T> {
  page: number
  rpp: number
  more: boolean
  list: T[]

  constructor(page: number, rpp: number, list: T[]) {
    if (rpp === 0) {
      this.rpp = list.length
      this.more = false
      this.page = 1
      this.list = list

      return
    }

    this.rpp = rpp
    this.more = list.length === rpp + 1

    if (rpp + 1 === list.length) {
      list.pop()
    }

    this.page = page
    this.list = list
  }
}
