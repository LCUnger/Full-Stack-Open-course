"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const contact_1 = __importDefault(require("./models/contact"));
const contacts_typeswap_1 = require("./models/contacts-typeswap");
const morgan = require('morgan');
console.log('test 1');
const app = (0, express_1.default)();
const PORT = process.env.PORT;
console.log('test 2');
app.use(express_1.default.static('dist'));
app.use(express_1.default.json());
morgan.token('content', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
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
app.get('/info', (req, res) => {
    const currentTime = new Date();
    const totalEntries = contact_1.default.countDocuments().then(total => total);
    res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentTime}</p>
    `);
});
app.get('/api/persons', (req, res, next) => {
    contact_1.default.find({}).then(contacts => res.json(contacts.map(contact => ((0, contacts_typeswap_1.mapIContactToContact)(contact))))).catch(error => next(error));
});
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    contact_1.default.findById(id).then(contact => {
        if (contact) {
            res.json((0, contacts_typeswap_1.mapIContactToContact)(contact));
        }
        else {
            res.status(404).end();
        }
    })
        .catch(error => next(error));
});
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    contact_1.default.findByIdAndDelete(id).then(result => res.status(204).end()).catch(error => next(error));
});
app.post('/api/persons', (req, res, next) => {
    const body = req.body;
    if (!body.name || !body.number) {
        res.status(400).json({ error: 'Name or number is missing' });
        return;
    }
    contact_1.default.findOne({ name: body.name }).then(existingContact => {
        if (existingContact) {
            res.status(400).json({ error: 'Name must be unique' });
            return;
        }
        const newContact = new contact_1.default({
            name: body.name,
            number: body.number
        });
        newContact.save().then(result => res.status(201).json((0, contacts_typeswap_1.mapIContactToContact)(result)))
            .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while saving the contact' });
        });
    }).catch(error => next(error));
});
app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    if (!body.name || !body.number) {
        res.status(400).json({ error: 'Name or number is missing' });
        return;
    }
    contact_1.default.findByIdAndUpdate(id, { name: body.name, number: body.number }, { new: true, runValidators: true, context: 'query' }).then(updatedContact => {
        if (updatedContact) {
            res.json((0, contacts_typeswap_1.mapIContactToContact)(updatedContact));
        }
        else {
            res.status(404).json({ error: 'Contact not found' });
        }
    }).catch(error => next(error));
});
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        response.status(400).json({ error: 'malformatted id' });
    }
    next(error);
};
app.use(errorHandler);
console.log('test 3');
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on p0rt ${PORT}`);
});
