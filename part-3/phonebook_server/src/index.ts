require('dotenv').config()

import express, { Request, Response } from 'express';
import Contact from './models/contact';
import { mapIContactToContact } from './models/contacts-typeswap';
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT


app.use(express.static('dist'))
app.use(express.json());

morgan.token('content', (req: Request, res: Response) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


export interface Contact {
  id: string,
  name: string,
  number: string
}

let phonebookEntries: Contact[] = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = (): string => {
  return `${Date.now()}-${Math.random()*10000}`
}


// Routes
app.get('/info', (req: Request, res: Response) => {
  const currentTime = new Date()
  const totalEntries = phonebookEntries.length

  res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentTime}</p>
    `)
})

app.get('/api/persons', (req: Request, res: Response<Contact[]>) => {
  Contact.find({}).then(contacts => res.json(contacts.map(contact => (
    mapIContactToContact(contact)
  ))))
  })

app.get('/api/persons/:id', (req: Request<{ id: string}>, res: Response<Contact>) => {
  const id = req.params.id
  const person = phonebookEntries.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.statusMessage = "There is no person that matches this id"
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id
  phonebookEntries = phonebookEntries.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req: Request<{},{},{ name: string, number: string}>, res: Response<Contact | { error: string }>): void => {
  const body = req.body

  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name or number is missing'})
    return
  }

  if (phonebookEntries.some(entry => entry.name === body.name)) {
    res.status(400).json({ error: 'name must be unique'})
  }

  const newContact: Contact = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  phonebookEntries.push(newContact)
  res.status(201).json(newContact)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on p0rt ${PORT}`);
});