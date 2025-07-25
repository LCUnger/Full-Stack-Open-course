import { useState } from "react"

const InlogField = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <div>
      <form>
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
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default InlogField