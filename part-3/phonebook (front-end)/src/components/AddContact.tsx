const AddContact = ({
    handleSubmit,
    newName,
    setNewName,
    newPhoneNumber,
    setNewPhoneNumber,
  }: {
    handleSubmit: (event: React.FormEvent) => void;
    newName: string;
    setNewName: React.Dispatch<React.SetStateAction<string>>;
    newPhoneNumber: string;
    setNewPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="name">Name: </label>
                </td>
                <td>
                  <input
                    id="name"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="phone-number">Phone number:</label>
                </td>
                <td>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '5px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                      }}
                    >
                      +
                    </span>
                    <input
                      type="tel"
                      id="phone-number"
                      value={newPhoneNumber}
                      onChange={(event) => setNewPhoneNumber(event.target.value)}
                      style={{ paddingLeft: '15px' }}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

export default AddContact