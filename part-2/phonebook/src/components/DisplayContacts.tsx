import type { Person } from "../App"

const Contact = ({contact}:{contact:Person}) => {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>+{contact.phoneNumber}</td>
    </tr>

  )
}

const DisplayContacts = ({ contacts }: { contacts: Person[] }) => {
  return (
    <table>
      <tbody>
        {contacts.map((contact) => <Contact key={contact.id} contact={contact} />)}
      </tbody>
    </table>
  )
}

export default DisplayContacts