interface HelloProps {
  name: string;
}

const Hello = (props: HelloProps) => {
  return (
      <p>Hello {props.name}</p>
  )
}

const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="George"/>
    </>
  )
}

export default App