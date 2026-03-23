"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Billboard } from "@react-three/drei"
import * as THREE from "three"

interface Skill {
  name: string
  category: string
}

const categoryColors: Record<string, string> = {
  "Clinical Skills": "#3b82f6",
  "Medical Knowledge": "#6366f1",
  "Emergency & Critical Care": "#ef4444",
  "Research & Diagnostics": "#a855f7",
  "Patient Care": "#10b981",
  "Soft Skills": "#f59e0b",
}

export function SkillsSphere({ skills }: { skills: Skill[] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Fibonacci sphere distribution
  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / skills.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 2.8
      return [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ] as [number, number, number]
    })
  }, [skills])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const speed = isHovered ? 0.03 : 0.1
      groupRef.current.rotation.y += speed * 0.016
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.15
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => {
        setIsHovered(false)
        setHoveredCategory(null)
      }}
    >
      {/* Central glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.005, 8, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.005, 8, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.1} />
      </mesh>

      {skills.map((skill, i) => {
        const color = categoryColors[skill.category] || "#94a3b8"
        const isActive = hoveredCategory === null || hoveredCategory === skill.category
        return (
          <Billboard key={skill.name + i} position={positions[i]}>
            <Text
              fontSize={0.2}
              color={isActive ? color : "#4a4a4a"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.005}
              outlineColor="#000000"
              onPointerOver={(e) => {
                e.stopPropagation()
                setHoveredCategory(skill.category)
              }}
              onPointerOut={(e) => {
                e.stopPropagation()
                setHoveredCategory(null)
              }}
            >
              {skill.name}
            </Text>
          </Billboard>
        )
      })}
    </group>
  )
}
