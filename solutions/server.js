import express from 'express'

export const app = express()
app.use(express.json())

const items = [{
  id: 1,
  content: 'Item 1'
}]

// EJERCICO 6 aquí
// Leer
app.get('/items', (req, res) => {
  return res.json(items)
})

app.get('/items/:id', ({ params }, res) => {
  const id = Number(params.id)
  const item = items.find(item => item.id === id)
  return res.json(item)
})

// Crear
app.post('/items', (req, res) => {
  const { content } = req.body

  const item = {
    id: items.length + 1,
    content
  }

  items.push(item)
  return res.json(item)
})

// Modificar
app.put('/items/:id', ({ params, body }, res) => {
  const id = Number(params.id)
  const { content } = body
  const itemFound = items.find(item => item.id === id)
  itemFound.content = content
  return res.json(itemFound)
})

// Actualizar
app.patch('/items/:id', ({ params, body }, res) => {
  const id = Number(params.id)
  const item = body
  const index = items.findIndex(item => item.id === id)
  items[index] = { ...items[index], ...item }
  return res.json(items[index])
})

// Eliminar
app.delete('/items/:id', ({ params }, res) => {
  const id = Number(params.id)
  const itemFound = items.findIndex(item => item.id === id)
  items.splice(itemFound, 1)
  return res.status(200).json()
})

export const server = app.listen(3000)
