import { pixel, alpha_pixel, log, range, assert } from './index'

function* pixelise(digits: number[]): Generator<number[]> {
  for (const dig of digits) yield pixel(dig)
}
// const strify = (numarr: number[]) => numarr.join('')

/**
 * Checks a sequance for being iterable or not
 * @param {T[]} sequence The object to check for iterablility
 * @returns {boolean} True if it's iterable else false
 */
function isiterable<T>(sequence: Array<T>): boolean {
  return Symbol.iterator in sequence
}
/**
 * Converts an Integer `n` to a higher `base`
 * @param n The integer to be coverted to another base
 * @param base The base integer should be raised to (limit 10)
 * @yields {number[]} Gives the basified power & multiplier
 */
function* tobase(n: number, base: number = 3) {
  assert(base, 10)

  while (n) {
    let power = Math.floor(log(n, base))
    let mul = Math.floor(n / Math.pow(base, power))
    yield [power, mul]
    n -= Math.imul(Math.pow(base, power), mul)
  }
}

function* to_printable_base(n: number, base: number = 11) {
  assert(base, printable.length)

  while (n) {
    let power = Math.floor(log(n, base))
    let mul = Math.floor(n / Math.pow(base, power))
    let _mul = printable[mul]
    yield [power, _mul]
    n -= Math.imul(Math.pow(base, power), mul)
  }
}

function* to_anybase(
  n: number,
  base: number = 37,
  base_chars: string | null = printable,
  char_func?: (val: number) => string | number[] // string Digit || an Array of pixels
) {
  if (!char_func && base_chars)
    console.assert(base <= base_chars.length, 'Base out of Range')

  while (n) {
    let power = Math.floor(log(n, base)) // 4
    let mul = Math.floor(n / Math.pow(base, power)) // value
    let mul_repr: string | number[] | undefined // MUST NEVER BE UNDEFINED

    if (!char_func && base_chars) {
      // digit representation from chars
      mul_repr = base_chars[mul]
    } else if (char_func) {
      // digit representation as out of func from a val
      mul_repr = char_func(mul)
    }

    yield [power, mul_repr]
    n -= Math.imul(Math.pow(base, power), mul) // n=4
  }
}

const base_ascii = (n: number) =>
  to_anybase(n, 65536, null, String.fromCharCode)

const base_unicode = (n: number) =>
  to_anybase(n, 1114111, null, String.fromCharCode)

const base_pixel = (n: number) => to_anybase(n, 16777216, null, pixel)

const base_alpha_pixel = (n: number) =>
  to_anybase(n, 4294967296, null, alpha_pixel)

const from_anybase = (
  n: number,
  base: number = 37,
  base_chars: string = printable,
  num_func?: (char: string | number) => number
): number => {
  if (!num_func)
    throw console.assert(
      base <= base_chars.length,
      'Not enough characters to reperesent higher int base'
    )

  if (typeof n === 'number') {
    const numlen = Math.log10(n) + 1

    // Tells the digit in a number n at an indice i from back
    const dig = (n: number, i: number): number =>
      Math.floor((n / Math.pow(10, i)) % 10)

    const mul = num_func

    // num_arr:
    let sum = 0
    for (let _pow = 0; _pow < numlen; _pow++) {
      sum += Math.imul(Math.pow(base, _pow), mul(dig(n, _pow)))
    }
    return sum
  }

  const strn: string = typeof n === 'number' ? String(n) : n

  const mul: (char: string | number) => number =
    num_func || (base_chars.indexOf as (char: string | number) => number)

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
