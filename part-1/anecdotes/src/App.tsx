import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState<number[]>(Array(anecdotes.length).fill(0))
  const [maxIndexes, setMaxIndexes] = useState<number[]>([]) // State for maxIndexes

  function voteSelected() {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    updateMaxIndexes(newVotes); // Update maxIndexes whenever votes change
  }

  function updateMaxIndexes(arr: number[]) {
    const maxValue = Math.max(...arr);
    const indexes = arr
      .map((val, idx) => (val === maxValue ? idx : -1))
      .filter(idx => idx !== -1);
    setMaxIndexes(indexes);
  }

  const ShowCaseVotes = ({ maxIndexes }: { maxIndexes: number[] }) => {
    if (maxIndexes.length === 0) {
      return (
        <div>
          <h1>Anecdote(s) with most votes</h1>
          <p>No votes yet</p>
        </div>
      );
    }

    return (
      <div>
        <h1>Anecdote(s) with most votes</h1>
        {maxIndexes.map(index => (
            <p key={index} style={{ fontStyle: 'italic' }}>
            {anecdotes[index]}
            </p>
        ))}
          <p> (with {votes[maxIndexes[0]]} votes)</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

      <div>
        <button onClick={voteSelected}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      </div>

      <ShowCaseVotes maxIndexes={maxIndexes} />
    </div>
  )
}

export default App