# Pixipher: Pixelise your data

Pixel Cipher implementation on the web via WebAssembly for data conversion

## Useful links

- [Pixels to Canvas Image (PNG)](https://www.w3schools.com/jsref/canvas_createimagedata.asp)
- [Getting Pixels from the Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)
- [Reading Bytes from a file](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString)
- [Getting the bytes from an uploaded File](https://usefulangle.com/post/297/javascript-get-file-binary-data)
- [Converting a string of binary number to Integer](https://www.tutorialspoint.com/convert-an-array-of-binary-numbers-to-corresponding-integer-in-javascript)
- [Converting Integer to binary string](https://stackoverflow.com/questions/11103487/how-to-convert-binary-representation-of-number-from-string-to-integer-number-in)
- [Base64 conversion](https://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript)
- [Image from TypeArray of RGBA Pixels](https://stackoverflow.com/questions/22823752/creating-image-from-array-in-javascript-and-html5)
- [ArrayBuffer & Base64 interconversion](https://stackabuse.com/encoding-and-decoding-base64-strings-in-node-js/)

## Base64 & ArrayBuffers
```js
const encoded = Buffer.from('username:password', 'utf8').toString('base64')  
// 'dXNlcm5hbWU6cGFzc3dvcmQ='

const plain = Buffer.from('dXNlcm5hbWU6cGFzc3dvcmQ=', 'base64').toString('utf8')  
// 'username:password'
```