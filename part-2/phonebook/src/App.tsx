import { useEffect, useState } from 'react'
import AddContact from './components/AddContact'
import DisplayContacts from './components/DisplayContacts'
import Filter from './components/Filter'
import contactServices from './services/contacts'

export interface Person {
  name: string
  number: string
  id: number
}

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    contactServices.getAll().then((data: Person[]) => setPersons(data))
  }, [])

  const [newName, setNewName] = useState<string>('');
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');

  const personsSearched = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLocaleLowerCase())
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (persons.some((person) => person.name.trim() === newName.trim())) {
      if (window.confirm(`${newName.trim()} is already added to the phonebook, replace the old number with a new one?`)) {
        console.log("same person");
      
        const existingPerson: Person = persons.find(person => person.name.trim() === newName.trim())! // Here I use trim to make sure that if a name with space(s) on the end won't result in a new contact
        const adjustedPerson: Person = { ...existingPerson, number: newPhoneNumber}!
        contactServices.update(adjustedPerson).then(data => (
          setPersons(persons.map(person => person.id === existingPerson.id ? data : person))))
      } else {
        return
      }

    } else {
      const newPerson = { name: newName.trim(), number: newPhoneNumber.trim()};
      contactServices.add(newPerson).then(data => setPersons([...persons, data]))
    }

    setNewName('');
    setNewPhoneNumber('');
  }

  const removeContact = (id: string | number) => {
    const contact = persons.find(contact => contact.id === id)
    if (contact && window.confirm(`Delete ${contact.name}`)) {
      contactServices.remove(id)
      setPersons(persons.filter((val) => val.id !== id))
    }

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filterText={filterText} 
        setFilterText={setFilterText} 
      />

      <h2>Add new contact</h2>
      <AddContact
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newPhoneNumber={newPhoneNumber}
        setNewPhoneNumber={setNewPhoneNumber}
      />

      <h2>Numbers</h2>
      <DisplayContacts contacts={personsSearched} removeContact={removeContact}/>
    </div>
  );
};

export default App