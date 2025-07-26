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
              <td>
                <label htmlFor="username">Username:</label>
              </td>
              <td>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  name="username"
                  autoComplete="username"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password:</label>
              </td>
              <td>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  name="password"
                  autoComplete="current-password"
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