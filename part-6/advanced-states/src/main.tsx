import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { createStore } from 'redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT' | 'ZERO'
}

const counterReducer = (state: number = 0, action: CounterAction) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}

const store = createStore(counterReducer)