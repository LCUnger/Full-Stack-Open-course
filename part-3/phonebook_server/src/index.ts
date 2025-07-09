import dotenv from 'dotenv'
dotenv.config()

import express, { NextFunction, Request, Response } from 'express'
import ContactDB from './models/contact'
import { mapIContactToContact } from './models/contacts-typeswap'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT

app.use(express.static('dist'))
app.use(express.json())

morgan.token('content', (req: Request, _res: Response) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

export interface Contact {
  id: string
  name: string
  number: string
}

// Routes
app.get('/info', (req: Request, res: Response) => {
  const currentTime = new Date()
  const totalEntries = ContactDB.countDocuments().then(total => total)

  res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentTime}</p>
    `)
})

app.get('/api/persons', (_req: Request, res: Response<Contact[]>, next: NextFunction) => {
  ContactDB.find({}).then(contacts => res.json(contacts.map(contact => (
    mapIContactToContact(contact)
  )))).catch(error => next(error))
})

app.get('/api/persons/:id', (req: Request<{ id: string }>, res: Response<Contact | { error: string }>, next: NextFunction) => {
  const id = req.params.id
  ContactDB.findById(id).then((contact) => {
    if (contact) {
      res.json(mapIContactToContact(contact))
    }
    else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  ContactDB.findByIdAndDelete(id).then((_result) => res.status(204).end()).catch(error => next(error))
})

app.post('/api/persons', (req: Request<object, object, { name: string, number: string }>, res: Response<Contact | { error: string }>, next: NextFunction): void => {
  const body = req.body

  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name or number is missing' })
    return
  }

  ContactDB.findOne({ name: body.name }).then((existingContact) => {
    if (existingContact) {
      res.status(400).json({ error: 'Name must be unique' })
      return
    }

    const newContact = new ContactDB({
      name: body.name,
      number: body.number,
    })

    newContact.save().then(result => res.status(201).json(mapIContactToContact(result)))
      .catch(error => next(error))
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req: Request, res: Response<Contact | { error: string }>, next: NextFunction) => {
  const id = req.params.id
  const body = req.body

  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name or number is missing' })
    return
  }

  ContactDB.findByIdAndUpdate(id,
    { name: body.name, number: body.number },
    { new: true, runValidators: true, context: 'query' },
  ).then((updatedContact) => {
    if (updatedContact) {
      res.json(mapIContactToContact(updatedContact))
    }
    else {
      res.status(404).json({ error: 'Contact not found' })
    }
  }).catch(error => next(error))
})

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
    return
  }
  else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
    return
  }

  next(error)
}

app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on p0rt ${PORT}`)
})
