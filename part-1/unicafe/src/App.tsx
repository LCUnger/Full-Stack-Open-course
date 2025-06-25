import { useState } from 'react';

type FeedbackType = "good" | "neutral" | "bad";

interface FeedbackButtonProps {
  text: FeedbackType;
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




const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
    </>
  );
};

export default App;