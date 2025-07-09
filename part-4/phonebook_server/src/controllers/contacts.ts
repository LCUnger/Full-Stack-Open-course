import express, { Request, Response, NextFunction } from 'express'
import ContactDB from '../models/contactDB'

import { mapIContactToContact } from '../models/contacts-typeswap'
import type { Contact } from '../types/contact-types'

const contactsRouter = express.Router()

contactsRouter.get('/info', (req: Request, res: Response) => {
  const currentTime = new Date()
  const totalEntries = ContactDB.countDocuments().then(total => total)

  res.send(`
    <div>
      <p>Phonebook has info for ${totalEntries} people</p>
      <p>${currentTime}</p>
    </div>
  `)
})

contactsRouter.get('/', (_req: Request, res: Response<Contact[]>, next: NextFunction) => {
  ContactDB.find({})
    .then(contacts => res.json(contacts.map(contact => mapIContactToContact(contact))))
    .catch(error => next(error))
})

contactsRouter.get('/:id', (req: Request<{ id: string }>, res: Response<Contact | { error: string }>, next: NextFunction) => {
  const id = req.params.id
  ContactDB.findById(id)
    .then(contact => {
      if (contact) {
        res.json(mapIContactToContact(contact))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

contactsRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  ContactDB.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(error => next(error))
})

contactsRouter.post('/', (req: Request<object, object, { name: string; number: string }>, res: Response<Contact | { error: string }>, next: NextFunction): void => {
  const body = req.body

  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name or number is missing' })
    return
  }

  ContactDB.findOne({ name: body.name })
    .then(existingContact => {
      if (existingContact) {
        res.status(400).json({ error: 'Name must be unique' })
        return
      }

      const newContact = new ContactDB({
        name: body.name,
        number: body.number,
      })

      newContact
        .save()
        .then(result => res.status(201).json(mapIContactToContact(result)))
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

contactsRouter.put('/:id', (req: Request, res: Response<Contact | { error: string }>, next: NextFunction) => {
  const id = req.params.id
  const body = req.body

  if (!body.name || !body.number) {
    res.status(400).json({ error: 'Name or number is missing' })
    return
  }

  ContactDB.findByIdAndUpdate(
    id,
    { name: body.name, number: body.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedContact => {
      if (updatedContact) {
        res.json(mapIContactToContact(updatedContact))
      } else {
        res.status(404).json({ error: 'Contact not found' })
      }
    })
    .catch(error => next(error))
})

export default contactsRouter