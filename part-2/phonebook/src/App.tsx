import { useState } from 'react'

interface Part {
  name: string;
  exercises: number;
}

interface Course {
  name: string;
  parts: Part[];
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

const Course = ({course} : {course: Course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts}/>
      {/* <Total parts={course.parts} /> */}
  </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}


export default App
