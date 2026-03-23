"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useIsMobile } from "@/hooks/use-is-mobile"

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const isMobile = useIsMobile()

  const { spherePositions, rungPairs } = useMemo(() => {
    const positions: { pos: [number, number, number]; color: string }[] = []
    const rungs: { from: [number, number, number]; to: [number, number, number] }[] = []
    const steps = isMobile ? 30 : 50
    const radius = 0.8
    const height = 6

    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const angle = t * Math.PI * 4
      const y = t * height - height / 2

      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius

      positions.push(
        { pos: [x1, y, z1], color: "#6366f1" },
        { pos: [x2, y, z2], color: "#ec4899" },
      )

      if (i % 3 === 0) {
        rungs.push({ from: [x1, y, z1], to: [x2, y, z2] })
      }
    }
    return { spherePositions: positions, rungPairs: rungs }
  }, [isMobile])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[2.5, 0, -1]}>
      {spherePositions.map((sp, i) => (
        <mesh key={i} position={sp.pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={sp.color}
            emissive={sp.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      {rungPairs.map((rung, i) => {
        const from = new THREE.Vector3(...rung.from)
        const to = new THREE.Vector3(...rung.to)
        const mid = from.clone().lerp(to, 0.5)
        const dir = to.clone().sub(from)
        const len = dir.length()
        return (
          <mesh key={`r${i}`} position={mid}>
            <cylinderGeometry args={[0.015, 0.015, len, 4]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.3}
              transparent
              opacity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function FloatingShape({
  position,
  color,
  speed,
  geometry,
}: {
  position: [number, number, number]
  color: string
  speed: number
  geometry: "icosahedron" | "torus" | "octahedron" | "torusKnot"
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh position={position}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[0.4, 0]} />}
        {geometry === "torus" && <torusGeometry args={[0.35, 0.12, 12, 24]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[0.35, 0]} />}
        {geometry === "torusKnot" && <torusKnotGeometry args={[0.25, 0.08, 64, 8]} />}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.35}
          wireframe
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  const isMobile = useIsMobile()

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#ec4899" />

      <DNAHelix />

      {!isMobile && (
        <>
          <FloatingShape position={[-3, 2, -2]} color="#3b82f6" speed={1.5} geometry="icosahedron" />
          <FloatingShape position={[-2.5, -2, -1]} color="#a855f7" speed={1.2} geometry="torus" />
          <FloatingShape position={[3.5, -2.5, -3]} color="#ec4899" speed={1.8} geometry="octahedron" />
          <FloatingShape position={[-4, 0.5, -2.5]} color="#6366f1" speed={1} geometry="torusKnot" />
        </>
      )}

      {!isMobile && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            intensity={0.4}
          />
        </EffectComposer>
      )}
    </>
  )
}
