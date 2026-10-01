import { useRef, useState } from 'react'
import Rose from './Rose'

const MAX_ROSES = 60
const rand = (min, max) => min + Math.random() * (max - min)

export default function Garden({ name }) {
  const [roses, setRoses] = useState([])
  const [planted, setPlanted] = useState(0)
  const nextId = useRef(0)

  const plant = (x) => {
    const rose = { id: nextId.current++, x, size: rand(46, 78), tilt: rand(-8, 8) }
    setRoses((prev) => [...prev.slice(-(MAX_ROSES - 1)), rose])
    setPlanted((n) => n + 1)
  }

  const plantAtClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    plant(((event.clientX - rect.left) / rect.width) * 100)
  }

  return (
    <div className="garden">
      <div className="garden__field" onClick={plantAtClick}>
        {roses.length === 0 && <p className="garden__hint">Tap anywhere to plant a rose</p>}
        {roses.map((rose) => (
          <span key={rose.id} className="garden__rose" style={{ left: `${rose.x}%` }}>
            <span className="garden__grow" style={{ '--tilt': `${rose.tilt}deg` }}>
              <Rose size={rose.size} stem />
            </span>
          </span>
        ))}
      </div>

      <div className="garden__footer">
        <p aria-live="polite">
          {planted === 0
            ? `An empty garden, waiting for ${name}.`
            : `${planted} ${planted === 1 ? 'rose' : 'roses'} planted for ${name}.`}
        </p>
        <button className="button button--ghost" onClick={() => plant(rand(6, 94))}>
          Plant a rose
        </button>
      </div>
    </div>
  )
}
