interface ColorSwatchesProps {
  colors: { name: string; hex: string }[]
  value: string
  onChange: (name: string) => void
}

/** Seletor de cor por bolinhas. */
export function ColorSwatches({ colors, value, onChange }: ColorSwatchesProps) {
  return (
    <div>
      <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
        {colors.map((color) => {
          const selected = color.name === value
          return (
            <li key={color.name}>
              <button
                type="button"
                onClick={() => onChange(color.name)}
                aria-pressed={selected}
                aria-label={`Cor ${color.name}`}
                title={color.name}
                className={`h-8 w-8 rounded-full border transition-shadow ${
                  selected ? 'border-ink ring-1 ring-ink ring-offset-2' : 'border-line'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            </li>
          )
        })}
      </ul>

      <p className="m-0 mt-3 text-sm text-muted">
        Cor: <span className="text-ink">{value}</span>
      </p>
    </div>
  )
}