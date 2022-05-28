import crypto from 'crypto'
import { deburr } from 'lodash'
import { sanitize } from 'sanitize-filename-ts'

export function generateKeyByFilename(filename: string) {
  const filenameDeburred = deburr(filename)
  const filenameReplaced = filenameDeburred
    .replace(/ /g, '_')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/'/g, '')
  const filenameSanitized = sanitize(filenameReplaced)
  const key = `${crypto.randomUUID()}.${filenameSanitized}`

  return key
}
