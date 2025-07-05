import type { Contact } from "../index";
import type { IContact } from "./contact";

const mapIContactToContact = (inObj: IContact): Contact => {
    const outObj: Contact = {
        id: inObj.id,
        name: inObj.name,
        number: inObj.number
    };
    return outObj;
}

export { mapIContactToContact };