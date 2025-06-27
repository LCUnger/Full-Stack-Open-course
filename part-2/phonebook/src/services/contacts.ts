import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'
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

export default {getAll, add, remove}