import { useState } from 'react'
import Rose from './Rose'

export default function RosePicker({ reasons }) {
  const [opened, setOpened] = useState(() => new Set())

  const reveal = (index) => setOpened((prev) => new Set(prev).add(index))

  return (
    <ul className="picker">
      {reasons.map((reason, i) => {
        const isOpen = opened.has(i)
        return (
          <li key={i}>
            <button
              className={`picker__card${isOpen ? ' picker__card--open' : ''}`}
              onClick={() => reveal(i)}
              aria-expanded={isOpen}
            >
              <Rose size={92} open={isOpen} />
              <span className="picker__text">{isOpen ? reason : 'Pick me'}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
