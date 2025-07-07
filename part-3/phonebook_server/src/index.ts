require('dotenv').config()

import express, { NextFunction, Request, Response } from 'express';
import Contact from './models/contact';
import { mapIContactToContact } from './models/contacts-typeswap';
const morgan = require('morgan')

console.log('test 1')

const app = express();
const PORT = process.env.PORT

console.log('test 2')


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

// let phonebookEntries: Contact[] = [
//   { 
//     "id": "1",
//     "name": "Arto Hellas", 
//     "number": "040-123456"
//   },
//   { 
//     "id": "2",
//     "name": "Ada Lovelace", 
//     "number": "39-44-5323523"
//   },
//   { 
//     "id": "3",
//     "name": "Dan Abramov", 
//     "number": "12-43-234345"
//   },
//   { 
//     "id": "4",
//     "name": "Mary Poppendieck", 
//     "number": "39-23-6423122"
//   }
// ]


// Routes
app.get('/info', (req: Request, res: Response) => {
  const currentTime = new Date()
  const totalEntries = Contact.countDocuments().then(total => total)

  res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentTime}</p>
    `)
})

app.get('/api/persons', (req: Request, res: Response<Contact[]>, next: NextFunction) => {
  Contact.find({}).then(contacts => res.json(contacts.map(contact => (
    mapIContactToContact(contact)
  )))).catch(error => next(error))
  })

app.get('/api/persons/:id', (req: Request<{ id: string}>, res: Response<Contact | {error: string}>, next: NextFunction) => {
  const id = req.params.id
  Contact.findById(id).then(contact => {
    if (contact) {
      res.json(mapIContactToContact(contact));
    } else {
      res.status(404).end()
    }
      })
      .catch(error => next(error))
})
      

app.delete('/api/persons/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id).then(result => res.status(204).end()).catch(error => next(error))
})

app.post('/api/persons', (req: Request<{},{},{ name: string, number: string}>, res: Response<Contact | { error: string }>, next: NextFunction): void => {
  const body = req.body

  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name or number is missing'})
    return;
  }

  Contact.findOne({ name: body.name }).then(existingContact => {
    if (existingContact) {
      res.status(400).json({ error: 'Name must be unique' });
      return;
    }

    const newContact = new Contact({
      name: body.name,
      number: body.number
    });

    newContact.save().then(result => res.status(201).json(mapIContactToContact(result)))
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while saving the contact' });
      });
  }).catch(error => next(error));
})

app.put('/api/persons/:id', (req: Request, res: Response<Contact | {error: string}>, next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name or number is missing' });
    return;
  }

  Contact.findByIdAndUpdate(id,
    { name: body.name, number: body.number },
    { new: true, runValidators: true, context: 'query' }
  ).then(updatedContact => {
      if (updatedContact) {
        res.json(mapIContactToContact(updatedContact));
      } else {
        res.status(404).json({ error: 'Contact not found' });
      }
    }).catch(error => next(error));
})


const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

console.log('test 3')


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on p0rt ${PORT}`);
});