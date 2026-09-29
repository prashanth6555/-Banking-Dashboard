import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) {
  const fromRef = useRef(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(fromRef.current, value, {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        fromRef.current = latest
        setDisplay(latest)
      },
    })
    return () => controls.stop()
  }, [value])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
