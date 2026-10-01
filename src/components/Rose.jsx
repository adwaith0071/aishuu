// A single petal pointing up from the centre of a 100x100 box.
const PETAL = 'M50 52 C 22 44, 14 14, 50 6 C 86 14, 78 44, 50 52 Z'

// Outer to inner. Each ring is smaller, darker and twisted against the last.
const LAYERS = [
  { count: 6, scale: 1, offset: 0, fill: '#e11d48' },
  { count: 5, scale: 0.76, offset: 30, fill: '#c8163f' },
  { count: 4, scale: 0.54, offset: 12, fill: '#a50f33' },
  { count: 3, scale: 0.33, offset: 45, fill: '#7f0a26' },
]

export default function Rose({ size = 120, open = true, stem = false, className = '' }) {
  const height = stem ? size * 2.3 : size

  return (
    <svg
      className={`rose ${open ? 'rose--open' : 'rose--bud'} ${className}`}
      width={size}
      height={height}
      viewBox={stem ? '0 0 100 230' : '0 0 100 100'}
      aria-hidden="true"
    >
      {stem && (
        <g>
          <path
            d="M50 70 C 45 120, 57 170, 50 230"
            fill="none"
            stroke="#2f6b3a"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M50 142 C 32 124, 14 132, 9 148 C 27 157, 42 154, 50 142 Z" fill="#3a7d44" />
          <path d="M51 182 C 68 164, 86 171, 91 186 C 74 196, 59 193, 51 182 Z" fill="#2f6b3a" />
          <path d="M34 72 L50 96 L66 72 Z" fill="#3a7d44" />
        </g>
      )}

      {LAYERS.map((layer, i) => (
        <g key={i} className="rose__layer" style={{ transitionDelay: `${i * 110}ms` }}>
          {Array.from({ length: layer.count }, (_, p) => (
            <path
              key={p}
              d={PETAL}
              fill={layer.fill}
              stroke="rgba(60, 0, 15, 0.4)"
              strokeWidth={1 / layer.scale}
              transform={`rotate(${layer.offset + (360 / layer.count) * p} 50 50) translate(50 50) scale(${layer.scale}) translate(-50 -50)`}
            />
          ))}
        </g>
      ))}

      <path
        className="rose__heart"
        d="M47 50 a4 4 0 1 1 6 3 a7 7 0 1 1 -9 -8"
        fill="none"
        stroke="#fda4af"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
