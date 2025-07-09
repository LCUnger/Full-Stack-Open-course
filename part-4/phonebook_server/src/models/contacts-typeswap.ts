import type { Contact } from '../types/contact-types'
import type { IContact } from './contactDB'

const mapIContactToContact = (inObj: IContact): Contact => {
  const outObj: Contact = {
    id: inObj.id,
    name: inObj.name,
    number: inObj.number,
  }
  return outObj
}

export { mapIContactToContact }
