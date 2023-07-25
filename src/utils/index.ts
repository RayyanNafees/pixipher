export const printable =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c'

/**
 * Converts an integer to its pixel (rgb) representation
 * @param {number} n The number to convert to pixels
 * @returns {number[]}
 */
export const pixel = (n: number): number[] => {
  const b = n
  const g = Math.floor(b / 256)
  const r = Math.floor(g / 256)

  return [r % 256, g % 256, b % 256]
}

/**
 * Converts an integer to its alpha pixel (rgba) representation
 * @param {number} n The number to convert to pixels
 * @returns {number[]}
 */
export const alpha_pixel = (n: number): number[] => {
  const a = n
  const b = Math.floor(a / 256)
  const g = Math.floor(b / 256)
  const r = Math.floor(g / 256)

  return [r % 256, g % 256, b % 256, a % 256]
}

export const pixelise = (digits: number[]) => digits.map(pixel)
export const strify = (numarr: number[]) => numarr.join('')

/**
 * Checks a sequance for being iterable or not
 * @param {any[]} sequence The object to check for iterablility
 * @returns {boolean} True if it's iterable else false
 */
export const isiterable = (sequence: Array<any>): boolean =>
  Symbol.iterator in sequence

export const log = (_n: number, _base: number): number =>
  Math.log(_n) / Math.log(_base)

export const assert = (base: number, length: number) =>
  console.assert(base <= length, `Base out of range (${length})`)

export function* range(length: number) {
  for (let i = 0; i < length; i++) yield i
}
