import bcrypt from 'bcrypt'

const initialUsersData = [
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

export default { 
  initialUsersData, // Raw data with 'password'
  getInitialUsers   // Processed data with 'passwordHash'
}
