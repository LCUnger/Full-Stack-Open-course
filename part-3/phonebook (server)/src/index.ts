import express, { Request, Response } from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

interface Contact {
  id: string,
  name: string,
  number: string
}

const phonebookEntries = [
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


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.get('/info', (req: Request, res: Response) => {
  const currentTime = new Date()
  const totalEntries = phonebookEntries.length

  res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentTime}</p>
    `)
})

app.get('/api/persons', (req: Request, res: Response) => {
  res.json(phonebookEntries)
})

app.get('/api/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id
  const person = phonebookEntries.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.statusMessage = "There is no person that matches this id"
    res.status(404).end()
  }
})



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});