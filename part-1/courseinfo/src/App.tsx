interface Part {
  name: string;
  numExercises: number;
}

const Header = (props: { courseName: string }) => {
  return <h1>{props.courseName}</h1>
}

const Part = (props: { part: Part }) => {
  return (
    <p>
      {props.part.name}: {props.part.numExercises}
    </p>
  )
}

const Content = (props: { parts: Part[] }) => {
  return (
    <div>
      {/* {props.parts.map((part, idx) => (
        <p key={idx}>
          {part.name}: {part.numExercises}
        </p>
      ))} */}
      {/* I had the above earlier, but I believe this is how you wanted it. */}
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props: { parts: Part[]} ) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.numExercises, 0)
  return <p>Number of exercises: {totalExercises}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts: Part[] = [
    { name: part1, numExercises: exercises1 },
    { name: part2, numExercises: exercises2 },
    { name: part3, numExercises: exercises3 }]

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default App
