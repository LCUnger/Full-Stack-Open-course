import bcrypt from 'bcrypt'
import supertest from 'supertest';
import app from '../app';

const api = supertest(app)

const initialUsersData: {
  _id: string,
  username: string,
  name: string,
  password: string,
  token?: string
}[] = [
  {
    _id: "687cef71832967f2c38f6b4f",
    username: "johndoe",
    name: "John Doe",
    password: "password123"
  },
  {
    _id: "a3f9d8e7b2c947e1a5d6f4c3",
    username: "janedoe",
    name: "Jane Doe", 
    password: "mypassword"
  },
  {
    _id: "c4e7f8a9b3d6e2f1a5c9d8b7",
    username: "alexsmith",
    name: "Alex Smith",
    password: "secret456"
  },
  {
    _id: "d9b8c7a6f5e4b3c2a1f7e8d9",
    username: "sarahwilson",
    name: "Sarah Wilson",
    password: "qwerty789"
  },
  {
    _id: "e8f7d6c5b4a3e2f1a9c8b7d6",
    username: "mikejohnson",
    name: "Mike Johnson",
    password: "admin2024"
  }
];

const getInitialUsers = async () => {
  const saltRounds = 10
  return Promise.all(
    initialUsersData.map(async (user) => ({
      username: user.username,
      name: user.name,
      passwordHash: await bcrypt.hash(user.password, saltRounds)
    }))
  )
}

const generateTokensInitialUsers = async () => {
  let initialTokens: string[] = [];
  for (const user of initialUsersData) {
    const response = await api.post('/api/login')
    initialTokens.push(response.body.token);
  }
}

export default { 
  initialUsersData, // Raw data with 'password'
  getInitialUsers,   // Processed data with 'passwordHash'
  generateTokensInitialUsers
}
