interface Part {
  name: string;
  exercises: number;
}

const Header = (props: { courseName: string }) => {
  return <h1>{props.courseName}</h1>
}

const Part = (props: { part: Part }) => {
  return (
    <p>
      {props.part.name}: {props.part.exercises}
    </p>
  )
}

const Content = (props: { parts: Part[] }) => {
  return (
    <div>
      {/* {props.parts.map((part, idx) => (
        <p key={idx}>
          {part.name}: {part.exercises}
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
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises: {totalExercises}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const part1: Part = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts: Part[] = [part1, part2, part3]

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default App
