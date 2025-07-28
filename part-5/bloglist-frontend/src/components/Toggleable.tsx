import { useState } from 'react'
import type { ReactNode } from 'react'

interface ToggleableProps {
  children: ReactNode
  buttonLabel: string
  hideLabel?: string
  initialVisible?: boolean
}

const Toggleable = (props: ToggleableProps) => {
  const [visible, setVisible] = useState(props.initialVisible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <button 
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        {props.buttonLabel}
      </button>
      
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>
          {props.hideLabel}
        </button>
      </div>
    </div>
  )
}

export default Toggleable