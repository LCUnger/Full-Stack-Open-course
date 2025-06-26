import { useState } from 'react'

interface Person {
  name: string
}

const Contact = ({contact}:{contact:Person}) => {
  return (
    <p>{contact.name}</p>
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
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState<string>('')


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const newPerson = {name: newName}
    setPersons([...persons, newPerson])
    setNewName('')
    console.log([...persons, newPerson])
  }



  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input id="name" value={newName} onChange={(event) => setNewName(event.target.value)}/>

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