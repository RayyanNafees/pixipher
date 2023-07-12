const pixel = (n: number) => {
  console.assert(n <= 16777216, `Pixel digit out of range: ${n}`)
  const b = n,
    g = n / 256,
    r = g / 256
  return [r % 256, g % 256, b % 256]
}

type Base64type = {
  _Rixits: string
  fromNumber: (number: number) => string
  toNumber: (rixits: string) => number
}

const Base64: Base64type = {
  // https://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript

  _Rixits: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/',

  fromNumber: function (number: number) {
    if (
      isNaN(Number(number)) ||
      number === null ||
      number === Number.POSITIVE_INFINITY
    )
      throw 'The input is not valid'
    if (number < 0) throw "Can't represent negative numbers now"

    var rixit
    var residual = Math.floor(number)
    var result = ''
    while (true) {
      rixit = residual % 64

      result = this._Rixits.charAt(rixit) + result

      residual = Math.floor(residual / 64)

      if (residual == 0) break
    }
    return result
  },

  toNumber: function (rixits: string) {
    var result = 0

    for (const rxt of rixits.split(''))
      result = result * 64 + this._Rixits.indexOf(rxt)

    return result
  },
}

const fileint = (id: string = 'upload'): Promise<string> =>
  new Promise((resolve: any, reject: any) => {
    const fileElem = document.getElementById(id) as HTMLInputElement
    if (fileElem && fileElem?.files?.length) {
      const file = fileElem.files[0]
      const reader = new FileReader()

      reader.onload = (e) => {
        if (!e?.target?.result) return

        console.log('Binary Data: ', e.target.result)
        resolve(parseInt(e.target.result.toString(), 2))
      }

      reader.onerror = reject
      reader.readAsBinaryString(file)
    }
  })

const int_to_filedata = (intdata: number, filename: string): string => {
  const ext = filename.split('.').slice(-1) || 'png'
  return `data:image/${ext};base64,` + Base64.fromNumber(intdata)
}


export {pixel, fileint, int_to_filedata, Base64}