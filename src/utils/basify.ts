const printable =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c'

/**
 *
 * @param {number} n -
 * @returns {number[]}
 */
const pixel = (n: number): number[] => {
  const b = n
  const g = Math.floor(b / 256)
  const r = Math.floor(g / 256)

  return [r % 256, g % 256, b % 256]
}

const alpha_pixel = (n: number): number[] => {
  const a = n
  const b = Math.floor(a / 256)
  const g = Math.floor(b / 256)
  const r = Math.floor(g / 256)

  return [r % 256, g % 256, b % 256, a % 256]
}

const pixelise = (digits: number[]) => digits.map(pixel)
const strify = (numarr: number[]) => numarr.join('')

const isiterable = (sequence: Array<any>): boolean => {
  try {
    for (let i of sequence);
    return true
  } catch (e) {
    return false
  }
}

const tobase = (n: number, base: number = 3) => {
  console.assert(base <= 10, 'Not yet developed for higher bases')

  const _log = (_n: number, _base: number): number =>
    Math.log(_n) / Math.log(_base)

  let pow_dict = new Map<number, number>()

  while (n) {
    let power = Math.floor(_log(n, base))
    let mul = Math.floor(n / Math.pow(base, power))
    pow_dict.set(power, mul)
    n -= Math.imul(Math.pow(base, power), mul)
  }

  return pow_dict
}

const to_printable_base = (
  n: number,
  base: number = 11
): Map<number, string> => {
  const base_chars = printable
  console.assert(base <= base_chars.length, 'Base out of rangeL ' + base)

  const _log = (_n: number, _base: number): number =>
    Math.log(_n) / Math.log(_base)

  let pow_dict = new Map<number, string>()

  while (n) {
    let power = Math.floor(_log(n, base))
    let mul = Math.floor(n / Math.pow(base, power))
    let _mul = base_chars[mul]
    pow_dict.set(power, _mul)
    n -= Math.imul(Math.pow(base, power), mul)
  }

  return pow_dict
}

const to_anybase = (
  n: number,
  base: number = 37,
  base_chars: string | null = printable,
  char_func?: (val: number) => string
): Map<number, string> => {
  if (!char_func && base_chars)
    console.assert(base <= base_chars.length, 'Base out of Range')

  const _log = (_n: number, _base: number): number =>
    Math.log(_n) / Math.log(_base)

  let pow_dict = new Map<number, string>()

  while (n) {
    let power = Math.floor(_log(n, base)) // 4
    let mul = Math.floor(n / Math.pow(base, power)) // value
    let mul_repr: string | undefined // MUST NEVER BE UNDEFINED

    if (!char_func && base_chars) {
      // digit representation from chars
      mul_repr = base_chars[mul]
    } else if (char_func) {
      // digit representation as out of func from a val
      mul_repr = char_func(mul)
    }

    pow_dict.set(power, mul_repr as string)
    n -= Math.imul(Math.pow(base, power), mul) // n=4
  }

  return pow_dict
}

const base_ascii = (n: number) =>
  to_anybase(n, 65536, null, String.fromCharCode)

const base_unicode = (n: number) =>
  to_anybase(n, 1114111, null, String.fromCharCode)

const base_pixel = (n: number) =>
  to_anybase(n, 16777216, null, String.fromCharCode)

const base_alpha_pixel = (n: number) =>
  to_anybase(n, 4294967296, null, String.fromCharCode)

const from_anybase = (
  n: number,
  base: number = 37,
  base_chars: string = printable,
  num_func?: (char: string) => number
): number => {
  if (!num_func)
    console.assert(
      base <= base_chars.length,
      'Not enough characters to reperesent higher int base'
    )

  const strn: string = typeof n === 'number' ? String(n) : n

  const mul: (char: string) => number = num_func || base_chars.indexOf

  const num_arr: number[] = [...strn]
    .reverse()
    .map((char, pow) => Math.imul(Math.pow(base, pow), mul(char)))

  const sum = num_arr.reduce((a, b) => a + b, 0)
  return sum
}

const digitify = (
  pow_dict: Map<number, string>,
  base: number = 2,
  formatter: (arr: string[]) => string = (arr) => arr.join(''),
  char_func?: (num: string) => string
): string => {
  const strlen: number = Math.max(...pow_dict.keys())
  const dig_arr: string[] = Array(strlen + 1).fill('0')

  for (const [power, digit] of pow_dict.entries()) {
    if (
      (base <= 10 && digit) ||
      (base <= printable.length && printable.indexOf(digit))
    ) {
      dig_arr[strlen - power] = digit
    } else if (char_func) {
      dig_arr[strlen - power] = char_func(digit)
    }
  }

  return formatter(dig_arr)
}
