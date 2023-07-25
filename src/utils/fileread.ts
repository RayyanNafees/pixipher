import { Base64 } from './filedata'

export type Data =
  | string
  | number
  | ArrayBuffer
  | null
  | Uint8Array
  | DataView
  | any

export const Q = <T extends HTMLElement>(q: string) =>
  document.querySelector<T>(q)!

export const toDataURL = (file: File): Promise<Data> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const toImg = (imgId: string, file: File): Promise<Data> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>
      resolve(
        (Q<HTMLImageElement>(
          `img`
        ).src = `${reader.result}`)
      )
    reader.onerror = reject
  })

export const toArrayBuffer = (file: File): Promise<Data> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const toBinaryString = (file: File): Promise<Data> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const toText = (file: File): Promise<Data> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

/**
 * Returns a promise that writes the data returned by the `promise` into `elem` Element's innerText
 * @param {string} elem The element ID to input the data as returned by `promise`
 * @param {Promise<Data>} promise The promise that resolves to returning the data
 */
export const output = async (
  elemId: string,
  promise: Promise<Data>
): Promise<string> =>
  await promise.then((data: Data) => {
    const str_data = String(data)

    // Raw data as text into div>div
    Q(`#${elemId} div`).innerText = str_data

    // Text Length into div>h4>span
    Q(`#${elemId} span`).innerText = String(str_data.replace(',', '').length)
    return str_data
  })
