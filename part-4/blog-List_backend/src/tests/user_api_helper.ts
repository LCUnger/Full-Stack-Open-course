import bcrypt from 'bcrypt'

const initialUsersData = [
  {
    username: "johndoe",
    name: "John Doe",
    password: "password123"
  },
  {
    username: "janedoe",
    name: "Jane Doe", 
    password: "mypassword"
  },
  {
    username: "alexsmith",
    name: "Alex Smith",
    password: "secret456"
  },
  {
    username: "sarahwilson",
    name: "Sarah Wilson",
    password: "qwerty789"
  },
  {
    username: "mikejohnson",
    name: "Mike Johnson",
    password: "admin2024"
  }
]

const getInitialUsers = async () => {
  const saltRounds = 10
  return Promise.all(
    initialUsersData.map(async (user) => ({
      username: user.username,
      name: user.name,
      passwordHash: await bcrypt.hash(user.password, saltRounds) // Match your schema!
    }))
  )
}

export default { 
  initialUsersData, // Raw data with 'password'
  getInitialUsers   // Processed data with 'passwordHash'
}
