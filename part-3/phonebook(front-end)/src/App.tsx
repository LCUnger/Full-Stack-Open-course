import { useEffect, useState } from 'react'
import AddContact from './components/AddContact'
import DisplayContacts from './components/DisplayContacts'
import Filter from './components/Filter'
import Notification from './components/Notification'

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

  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const pushNotification = (message: string, isError: boolean = false) => {
    setNotificationMessage(message);
    setIsError(isError); // Store the error state
    setTimeout(() => {
      setNotificationMessage(null);
      setIsError(false); // Reset the error state
    }, 3000);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const handleUpdate = () => {
      const existingPerson: Person = persons.find(person => person.name.trim() === newName.trim())!
      const adjustedPerson: Person = { ...existingPerson, number: newPhoneNumber}!

      contactServices.update(adjustedPerson).then(data => (
          setPersons(persons.map(person => person.id === existingPerson.id ? data : person))
        ))
        .catch(error => {
          if (error.status === 404) {
            pushNotification(`Information of ${existingPerson.name} has already been removed from the server`, true);
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          } else {
            pushNotification(`Not yet handled error`, true)
          }
        })

      pushNotification(`Changed number of ${existingPerson.name} from +${existingPerson.number} to +${adjustedPerson.number}`)
    }

    const handleAdd = () => {
      const newPerson = { name: newName.trim(), number: newPhoneNumber.trim()};
      contactServices.add(newPerson).then(data => {
        setPersons([...persons, data])
        console.log(data)
      })

      pushNotification(`Added ${newPerson.name}`)
    }

    if (!newName.trim() || !newPhoneNumber.trim()) {
      pushNotification('Name and phone number cannot be empty', true);
      return;
    }

    if (persons.some((person) => person.name.trim() === newName.trim())) { // Here I use trim to make sure that if a name with space(s) on the end won't result in a new contact
      if (window.confirm(`${newName.trim()} is already added to the phonebook, replace the old number with a new one?`)) {      
      handleUpdate();
      } else {
      return;
      }
    } else {
      handleAdd();
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
    <>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} isError={isError}/>
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
    </>
  );
};

export default App