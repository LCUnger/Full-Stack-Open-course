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
  return <h2>{props.courseName}</h2>
}

const Part = (props: { part: Part }) => {
  return (
    <p>
      {props.part.name}: {props.part.exercises}
    </p>
  )
}

const Content = ({ parts }: { parts: Part[] }) => {
  return (
    <div>
      {parts.map((part, idx) => (
        <p key={idx}>
          {part.name}: {part.exercises}
        </p>
      ))}
    </div>
  )
}

const Total = ({ parts }: { parts: Part[]} ) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p style={{ fontWeight: "bold" }}>total number of exercises: {totalExercises}</p>
  )
}

const Course = ({course} : {course: Course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
  </div>
  )
}

const Courses = ({courses}: {courses:Course[]}) => {
  return <div>{courses.map((course, idx) => <Course key={idx} course={course}/>)}</div>
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      <Courses courses={courses}/>
    </>
  )
}


export default App
