"use client"

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from "react"

interface FloatingCardProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function FloatingCard({ children, className = "", intensity = 12 }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTransform({
      rotateX: (0.5 - y) * intensity,
      rotateY: (x - 0.5) * intensity,
    })
    setGlarePos({ x: x * 100, y: y * 100 })
  }, [intensity])

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`group ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative h-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {/* Glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  )
}
