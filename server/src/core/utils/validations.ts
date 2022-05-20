import { AppError } from '../errors/AppError'

export function existsOrError(value: any, msgError: string) {
  if (!value) {
    throw new AppError(msgError)
  }

  if (Array.isArray(value) && value.length === 0) {
    throw new AppError(msgError)
  }

  if (typeof value === 'string' && !value.trim()) {
    throw new AppError(msgError)
  }
}

export function notExistsOrError(value: any, msgError: string) {
  try {
    existsOrError(value, msgError)
  } catch (msgError) {
    return
  }
  throw new AppError(msgError)
}

export function equalsOrError(valueX: any, valueY: any, msgError: string) {
  if (valueX !== valueY) {
    throw new AppError(msgError)
  }
}
