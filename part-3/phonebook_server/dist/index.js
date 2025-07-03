"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.static('dist'));
app.use(express_1.default.json());
morgan.token('content', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
let phonebookEntries = [
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
];
const generateId = () => {
    return `${Date.now()}-${Math.random() * 10000}`;
};
// Routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, Express with TypeScript!');
// });
app.get('/info', (req, res) => {
    const currentTime = new Date();
    const totalEntries = phonebookEntries.length;
    res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentTime}</p>
    `);
});
app.get('/api/persons', (req, res) => {
    res.json(phonebookEntries);
});
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = phonebookEntries.find(person => person.id === id);
    if (person) {
        res.json(person);
    }
    else {
        res.statusMessage = "There is no person that matches this id";
        res.status(404).end();
    }
});
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    phonebookEntries = phonebookEntries.filter(person => person.id !== id);
    res.status(204).end();
});
app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        res.status(400).json({ error: 'Name or number is missing' });
        return;
    }
    if (phonebookEntries.some(entry => entry.name === body.name)) {
        res.status(400).json({ error: 'name must be unique' });
    }
    const newContact = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    phonebookEntries.push(newContact);
    res.status(201).json(newContact);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on p0rt ${PORT}`);
});
