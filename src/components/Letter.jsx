import { useState } from 'react'

export default function Letter({ name, paragraphs, from }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={`letter${open ? ' letter--open' : ''}`}>
      <p className="letter__greeting">My dearest {name},</p>

      {!open && (
        <button className="letter__seal" onClick={() => setOpen(true)}>
          <span className="letter__wax">{name[0]}</span>
          <span className="letter__hint">Tap the seal to open</span>
        </button>
      )}

      <div className="letter__body">
        <div className="letter__inner">
          {paragraphs.map((text, i) => (
            <p key={i} style={{ transitionDelay: `${0.3 + i * 0.35}s` }}>
              {text}
            </p>
          ))}
          <p className="letter__sign" style={{ transitionDelay: `${0.3 + paragraphs.length * 0.35}s` }}>
            Yours, always{from ? ',' : '.'}
            {from && <span>{from}</span>}
          </p>
        </div>
      </div>
    </article>
  )
}
