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

app.get('/api/persons', (req: Request, res: Response<Contact[]>) => {
  Contact.find({}).then(contacts => res.json(contacts.map(contact => (
    mapIContactToContact(contact)
  )))).catch(error => {
    console.log(error)
  })
  })

app.get('/api/persons/:id', (req: Request<{ id: string}>, res: Response<Contact>) => {
  const id = req.params.id
  Contact.findById(id).then(contact => {
          res.json(mapIContactToContact(contact!));
      })
      .catch(error => {
        console.log(error);
        res.statusMessage = "An error occurred while fetching the contact";
        res.status(500).end();
      })
})
      

app.delete('/api/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id).then(result => res.status(204).end())
})

app.post('/api/persons', (req: Request<{},{},{ name: string, number: string}>, res: Response<Contact | { error: string }>): void => {
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
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while checking for existing contact' });
  });
})

app.put('/api/persons/:id', (req: Request, res: Response<Contact | {error: string}>) => {
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
    }).catch(error => {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the contact' });
    });
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on p0rt ${PORT}`);
});