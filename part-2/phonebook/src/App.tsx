import { useState } from 'react'

interface Person {
  name: string
  phoneNumber: string
}

const Contact = ({contact}:{contact:Person}) => {
  return (
    <p>{contact.name}: +{contact.phoneNumber}</p>
  )
}

const DisplayContacts = ({ contacts }: { contacts: Person[] }) => {
  return (
    <div>
      {contacts.map((contact,idx) => (
        <Contact key={`${contact.name}${idx}`} contact={contact} />
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([
    { name: 'Arto Hellas' , phoneNumber: '31622334455'}
  ]) 
  const [newName, setNewName] = useState<string>('')
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('')


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const nameExists = persons.some((person) => person.name === newName)

    if (nameExists) {
      alert(`${newName} already exists in the phonebook`)
      return
    }

    const newPerson = {name: newName, phoneNumber: newPhoneNumber}
    setPersons([...persons, newPerson])
    setNewName('')
    console.log([...persons, newPerson])
  }



  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" value={newName} onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          <label htmlFor="phone-number">phone number +</label>
          <input type="tel" id="phone-number" value={newPhoneNumber} onChange={(event) => setNewPhoneNumber(event.target.value)}/>
        </div>


        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <DisplayContacts contacts={persons}/>
    </div>
  )
}

export default App