export type Data = string | number | ArrayBuffer | null

export const toDataURL = (file: File): Promise<Data> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
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
 * @param {HTMLElement} elem The element to input the data as returned by `promise`
 * @param {Promise<Data>} promise The promise that resolves to returning the data
 */
export const output = async (elem: HTMLElement, promise: Promise<Data>) => {
  await promise.then((data: Data) => (elem.innerHTML = String(data)))
}
