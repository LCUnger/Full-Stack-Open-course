import axios from "axios";
const baseUrl = '/api/persons'
import type { Person } from "../App";

const getAll = () => {
    const request = axios.get<Person[]>(baseUrl)
    return request.then(response => response.data)
}

type PersonWithoutId = Omit<Person, 'id'>;

const add = (newObject: PersonWithoutId) => {
    const request = axios.post<Person>(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id: string | number) => {
    axios.delete<Person>(`${baseUrl}/${id}`)
}

const update = (adjustedObject: Person) => {
    const request = axios.put(`${baseUrl}/${adjustedObject.id}`, adjustedObject)
    return request.then(response => response.data)
}

export default {getAll, add, remove, update}