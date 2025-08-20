import { useState } from "react"
import loginService from "../services/login.service"
import { useAuth } from "../hooks/useAuth"
import axios from "axios"
import { useNotification } from "../hooks/useNotification"


const InlogField = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { login, user, logout } = useAuth()
  const { pushNotification } = useNotification()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userData = await loginService.login({ username, password });
      login(userData)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "An unknown error occurred";
        pushNotification(errorMessage, true)
      }
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
                <label htmlFor="username_entry">Username:</label>
              </td>
              <td>
                <input
                  id="username_entry"
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  name="username_entry"
                  autoComplete="username"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password_entry">Password:</label>
              </td>
              <td>
                <input
                  id="password_entry"
                  type="password_entry"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  name="password_entry"
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