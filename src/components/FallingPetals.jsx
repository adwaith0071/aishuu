import { useEffect, useState } from 'react'

const COLORS = ['#e11d48', '#be123c', '#fb7185', '#f43f5e', '#fda4af']
const rand = (min, max) => min + Math.random() * (max - min)

function makePetals(count, burst = false) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand(0, 100),
    size: rand(12, 26),
    duration: burst ? rand(3, 6) : rand(9, 18),
    // Negative delays start the gentle fall mid-air, so the sky is never empty.
    delay: burst ? rand(0, 1.5) : rand(-18, 0),
    sway: rand(2.5, 5),
    drift: rand(-12, 12),
    color: COLORS[i % COLORS.length],
    opacity: rand(0.55, 0.95),
  }))
}

function Petal({ petal, once }) {
  return (
    <span
      className={`petal${once ? ' petal--once' : ''}`}
      style={{
        left: `${petal.left}%`,
        opacity: petal.opacity,
        animationDuration: `${petal.duration}s`,
        animationDelay: `${petal.delay}s`,
        '--drift': `${petal.drift}vw`,
      }}
    >
      <svg
        width={petal.size}
        height={petal.size}
        viewBox="0 0 24 24"
        style={{ animationDuration: `${petal.sway}s` }}
      >
        <path d="M12 2 C 19 6, 22 14, 12 22 C 2 14, 5 6, 12 2 Z" fill={petal.color} />
      </svg>
    </span>
  )
}

// `burst` is a counter: every time it increases, a quick shower of extra petals falls.
export default function FallingPetals({ count = 26, burst = 0 }) {
  const [petals] = useState(() => makePetals(count))
  const [shower, setShower] = useState([])

  useEffect(() => {
    if (!burst) return
    setShower(makePetals(45, true))
    const timer = setTimeout(() => setShower([]), 8000)
    return () => clearTimeout(timer)
  }, [burst])

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((petal) => (
        <Petal key={petal.id} petal={petal} />
      ))}
      {shower.map((petal) => (
        <Petal key={`${burst}-${petal.id}`} petal={petal} once />
      ))}
    </div>
  )
}
