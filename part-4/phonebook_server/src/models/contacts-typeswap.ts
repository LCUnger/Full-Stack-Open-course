import type { Contact } from '../index'
import type { IContact } from './contact'

const mapIContactToContact = (inObj: IContact): ContactDB => {
  const outObj: ContactDB = {
    id: inObj.id,
    name: inObj.name,
    number: inObj.number,
  }
  return outObj
}

export { mapIContactToContact }
