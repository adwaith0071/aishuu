import { useState } from 'react'
import { content } from './content'
import FallingPetals from './components/FallingPetals'
import Garden from './components/Garden'
import Letter from './components/Letter'
import Rose from './components/Rose'
import RosePicker from './components/RosePicker'

// Roses tucked into the corners of the hero.
const HERO_ROSES = [
  { size: 210, top: '-50px', left: '-60px', delay: '0s' },
  { size: 130, top: '90px', left: '70px', delay: '-2s' },
  { size: 90, top: '-20px', left: '150px', delay: '-4s' },
  { size: 230, bottom: '-70px', right: '-70px', delay: '-1s' },
  { size: 140, bottom: '80px', right: '80px', delay: '-3s' },
  { size: 96, bottom: '-24px', right: '170px', delay: '-5s' },
  { size: 110, top: '-30px', right: '-30px', delay: '-2.5s' },
  { size: 120, bottom: '-36px', left: '-30px', delay: '-1.5s' },
]

export default function App() {
  const [burst, setBurst] = useState(0)
  const { name, from, tagline, letter, reasons, closing } = content

  return (
    <>
      <FallingPetals burst={burst} />

      <header className="hero">
        {HERO_ROSES.map(({ size, delay, ...position }, i) => (
          <span key={i} className="hero__rose" style={{ ...position, animationDelay: delay }}>
            <Rose size={size} />
          </span>
        ))}

        <div className="hero__content">
          <p className="eyebrow">To the girl who has my heart</p>
          <h1 className="hero__name">{name}</h1>
          <p className="hero__tagline">{tagline}</p>
          <a className="button" href="#letter">
            Open your letter
          </a>
        </div>
      </header>

      <main>
        <section id="letter" className="section">
          <p className="eyebrow">A letter</p>
          <h2>Words I wrote for you</h2>
          <Letter name={name} paragraphs={letter} from={from} />
        </section>

        <section className="section">
          <p className="eyebrow">Pick a rose</p>
          <h2>Each one hides a reason I love you</h2>
          <RosePicker reasons={reasons} />
        </section>

        <section className="section">
          <p className="eyebrow">Your garden</p>
          <h2>Plant as many as you like</h2>
          <Garden name={name} />
        </section>

        <section className="section finale">
          <svg className="finale__heart" viewBox="0 0 24 24" width="72" height="72" aria-hidden="true">
            <path
              d="M12 21 C 4 15, 1.5 10.5, 3.2 6.8 C 4.8 3.4, 9.4 3.2, 12 6.6 C 14.6 3.2, 19.2 3.4, 20.8 6.8 C 22.5 10.5, 20 15, 12 21 Z"
              fill="#e11d48"
            />
          </svg>
          <h2 className="finale__title">I love you, {name}</h2>
          <p className="finale__closing">{closing}</p>
          {from && <p className="finale__from">{from}</p>}
          <button className="button" onClick={() => setBurst((n) => n + 1)}>
            Shower me with petals
          </button>
        </section>
      </main>
    </>
  )
}
