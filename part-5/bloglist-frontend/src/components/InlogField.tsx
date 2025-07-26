import { useState } from "react"
import loginService from "../services/login.service"
import { useAuth } from "../contexts/useAuthContext"


const InlogField = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login, user, logout } = useAuth()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
    const userData = await loginService.login({ username, password });
    login(userData)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  if (user) {
    return (
    <div>
      Logged in as: {user.username}
      <button onClick={logout}>logout</button>
    </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>
                <input
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  name="username"
                />
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input
                  type="current-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  name="password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit'>login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default InlogField