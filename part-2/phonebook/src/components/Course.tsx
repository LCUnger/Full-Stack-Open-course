interface Part {
    name: string;
    exercises: number;
  }
  
export interface CourseInterface {
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
  
  const Course = ({course} : {course: CourseInterface}) => {
    return (
      <div>
        <Header courseName={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
    </div>
    )
  }

export default Course