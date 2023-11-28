import net from 'node:net'
import fs from 'node:fs'
import fsAsync from 'node:fs/promises'

// # EJERCICIO 1
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null,  { time: process.hrtime(startTime), ip })
  })

  client.on('error', (err) => {
    callback(err)
    client.end()
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

// # EJERCICIO 2
export function obtenerDatosPromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' })
    }, 2000)
  })
}

// # EJERCICIO 3
/*
Esta funcionon lee el archivo input.txt con la codificacion utf8,
como tercer parametro recibe un callback.

Si el readFile falla, retorna false.

Se realiza un setTimeout de 1s, se transforma el contenido a mayusculas
y se guarda en la variable textoProcesado.

Se escribe el archivo output.txt con el contenido de textoProcesado.
fs.writeFile recibe como segundo parametro un callback que devolvera true si se escribio correctamente
y false si hubo un error.
*/
export function procesarArchivo (callback) {
  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      callback(error)
    }

      const textoProcesado = contenido.toUpperCase()

      fs.writeFile('output.txt', textoProcesado, error => {
        if (error) {
          callback(error)
        }

        callback(null)
      })
  })
}

export function procesarArchivoPromise () {
  return new Promise((resolve, reject) => {
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
      if (error) {
        reject(false)
      }

      const textoProcesado = contenido.toUpperCase()

      fs.writeFile('output.txt', textoProcesado, error => {
        if (error) {
          reject(false)
        }

        resolve(true)
      })
    })
  })
}

// # EJERCICIO 4
export function leerArchivos () {
  const [archivo1, archivo2, archivo3] = Promise.all([
    fsAsync.readFile('archivo1.txt', 'utf8'),
    fsAsync.readFile('archivo2.txt', 'utf8'),
    fsAsync.readFile('archivo3.txt', 'utf8')
  ])

  return `${archivo1} ${archivo2} ${archivo3}`
}

// # EJERCICIO 5
export async function delay () {
  // ...
}
