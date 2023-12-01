import net from 'node:net'
import fs from 'node:fs'

// # EJERCICIO 1
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
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
      console.error('Error leyendo archivo:', error.message)
      callback(error)
    }

    const textoProcesado = contenido.toUpperCase()

    fs.writeFile('output.txt', textoProcesado, error => {
      if (error) {
        console.error('Error guardando archivo:', error.message)
        callback(error)
      }
      console.log('Archivo procesado y guardado con éxito')
      callback(null)
    })
  })
}

export async function procesarArchivoPromise () {
  let contenido = ''

  try {
    contenido = await fs.promises.readFile('input.txt', 'utf8')
  } catch (error) {
    console.error('Error leyendo archivo:', error.message)
    throw error
  }

  const textoProcesado = contenido.toUpperCase()

  try {
    await fs.promises.writeFile('output.txt', textoProcesado)
  } catch (error) {
    console.error('Error guardando archivo:', error.message)
    throw error
  }
}

// # EJERCICIO 4
export async function leerArchivos () {
  const [archivo1, archivo2, archivo3] = await Promise.all([
    fs.promises.readFile('archivo1.txt', 'utf8'),
    fs.promises.readFile('archivo2.txt', 'utf8'),
    fs.promises.readFile('archivo3.txt', 'utf8')
  ])

  return `${archivo1} ${archivo2} ${archivo3}`
}

// # EJERCICIO 5
export async function delay (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
