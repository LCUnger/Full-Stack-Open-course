import { useState } from 'react';


type FeedbackType = "good" | "neutral" | "bad"

interface FeedbackButtonProps {
  text: FeedbackType; // Use the keys of the enum for button text
  onClick: () => void;
}

const FeedbackButton = ({ text, onClick }: FeedbackButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
};

interface FeedbackDisplayProps {
  text: FeedbackType;
  count: number;
}

const FeedbackDisplay = ({ text, count }: FeedbackDisplayProps) => {
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

function postiveFraction(arr: ThreeNumbers): number {
  const totalCount = total(arr)
  if (totalCount === 0) return 0;
  return arr[0]/totalCount*100

}

type ThreeNumbers = [number,number,number]


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const states: ThreeNumbers = [good, neutral, bad]
  const feedbackValues: ThreeNumbers = [1,0,-1]

  return (
    <>
      <h1>Give Feedback</h1>
      <FeedbackButton text="good" onClick={() => setGood(good + 1)} />
      <FeedbackButton text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <FeedbackButton text="bad" onClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>
      <FeedbackDisplay text="good" count={good} />
      <FeedbackDisplay text="neutral" count={neutral} />
      <FeedbackDisplay text="bad" count={bad} />


      <p>all {total(states)}</p>
      <p>average {average(states,feedbackValues)}</p>
      <p>positive {postiveFraction(states)}%</p>
    </>
  );
};

export default App;