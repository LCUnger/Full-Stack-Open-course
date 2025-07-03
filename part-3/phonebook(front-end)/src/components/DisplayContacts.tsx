import type { Person } from "../App"

const Contact = ({contact, remove}:{contact:Person, remove: () => void}) => {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>+{contact.number}</td>
      <td>
        <button onClick={remove}>remove</button>
      </td>
    </tr>

  )
}

const DisplayContacts = ({ contacts, removeContact}: { contacts: Person[], removeContact: (id: string | number) => void}) => {
  return (
    <table>
      <tbody>
        {contacts.map((contact) => <Contact key={contact.id} contact={contact} remove={() => removeContact(contact.id)}/>)}
      </tbody>
    </table>
  )
}

export default DisplayContacts