"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapIContactToContact = void 0;
const mapIContactToContact = (inObj) => {
    const outObj = {
        id: inObj.id,
        name: inObj.name,
        number: inObj.number
    };
    return outObj;
};
exports.mapIContactToContact = mapIContactToContact;
