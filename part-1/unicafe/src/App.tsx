import { useState } from 'react';


type FeedbackType = "good" | "neutral" | "bad"


const FeedbackButton = ({ text, onClick }: { text: FeedbackType, onClick: () => void }) => {
  return <button onClick={onClick}>{text}</button>;
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

type ThreeNumbers = [number, number, number];

const StatisticLine = ({ text, value }: { text: string; value: number }) => (
  <tr>
    <th style={{ textAlign: "left" }}>{text}:</th>
    <td style={{ textAlign: "left" }}>{value}</td>
  </tr>
);

const Statistics = ({ states, feedbackValues }: { states: ThreeNumbers; feedbackValues: ThreeNumbers }) => {
  if (total(states) === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback is given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={states[0]} />
          <StatisticLine text="neutral" value={states[1]} />
          <StatisticLine text="bad" value={states[2]} />
          <StatisticLine text="all" value={total(states)} />
          <StatisticLine text="average" value={average(states, feedbackValues)} />
          <StatisticLine text="positive" value={positiveFraction(states)} />
        </tbody>
      </table>
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