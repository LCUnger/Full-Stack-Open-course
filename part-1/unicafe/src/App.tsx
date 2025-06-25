import { useState } from 'react';


type FeedbackType = "good" | "neutral" | "bad"


const FeedbackButton = ({ text, onClick }: { text: FeedbackType, onClick: () => void }) => {
  return <button onClick={onClick}>{text}</button>;
};

const FeedbackDisplay = ({ text, count }: { text: FeedbackType, count: number }) => {
  return <p>{text}: {count}</p>;
};

function total(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

function average(arr: ThreeNumbers, indexValue: ThreeNumbers): number {
  const totalCount = total(arr);
  if (totalCount === 0) return 0;
  return arr.reduce((acc, val, idx) => acc + val * indexValue[idx], 0) / totalCount;
}

function positiveFraction(arr: ThreeNumbers): number {
  const totalCount = total(arr)
  if (totalCount === 0) return 0;
  return arr[0]/totalCount*100

}

type ThreeNumbers = [number,number,number]


const Statistics = ({states, feedbackValues}: { states: ThreeNumbers, feedbackValues: ThreeNumbers }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <FeedbackDisplay text="good" count={states[0]} />
      <FeedbackDisplay text="neutral" count={states[1]} />
      <FeedbackDisplay text="bad" count={states[2]} />


      <p>all {total(states)}</p>
      <p>average {average(states,feedbackValues)}</p>
      <p>positive {positiveFraction(states)}%</p>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const states: ThreeNumbers = [good, neutral, bad]
  const feedbackValues: ThreeNumbers = [1,0,-1]

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <FeedbackButton text="good" onClick={() => setGood(good + 1)} />
        <FeedbackButton text="neutral" onClick={() => setNeutral(neutral + 1)} />
        <FeedbackButton text="bad" onClick={() => setBad(bad + 1)} />
      </div>

      <Statistics states={states} feedbackValues={feedbackValues}/>
    </>
  );
};

export default App;