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
  const [nextId, setNextId] = useState<number>(
    persons.length > 0 ? persons.at(-1)!.id + 1 : 1
  );

  const personsSearched = persons.filter((person) =>
    person.name.toLowerCase().includes(filterText.toLocaleLowerCase())
  );

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} already exists in the phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newPhoneNumber};
    contactServices.add(newPerson).then(data => setPersons([...persons, data]))
    
    setNewName('');
    setNewPhoneNumber('');
    setNextId(nextId + 1);
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
      <DisplayContacts contacts={personsSearched} />
    </div>
  );
};

export default App