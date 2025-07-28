import { useState, useImperativeHandle } from 'react'
import type { ReactNode } from 'react'

interface ToggleableProps {
  children: ReactNode
  buttonLabel: string
  hideLabel?: string
  initialVisible?: boolean
  ref?: React.Ref<ToggleableRef>
}

export interface ToggleableRef {
  toggleVisibility: () => void
  hide: () => void
  show: () => void
}

const Toggleable = (props: ToggleableProps) => {
  const [visible, setVisible] = useState(props.initialVisible || false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hide = () => {
    setVisible(false)
  }

  const show = () => {
    setVisible(true)
  }

  // Expose methods to parent component
  useImperativeHandle(props.ref, () => ({
    toggleVisibility,
    hide,
    show
  }))

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
          {props.hideLabel || 'cancel'}
        </button>
      </div>
    </div>
  )
}

export default Toggleable