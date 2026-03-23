"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function ExperienceParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = 250
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 2 - 1,
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.015 + Math.random() * 0.03,
      })
    }
    return temp
  }, [])

  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3)
    const colorA = new THREE.Color("#6366f1")
    const colorB = new THREE.Color("#3b82f6")
    const tempColor = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const t = i / count
      tempColor.lerpColors(colorA, colorB, t)
      colors[i * 3] = tempColor.r
      colors[i * 3 + 1] = tempColor.g
      colors[i * 3 + 2] = tempColor.b
    }
    return colors
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const p = particles[i]
      const px = p.x + Math.sin(time * p.speed + p.offset) * 0.5
      const py = p.y + Math.cos(time * p.speed * 0.5 + p.offset) * 0.3
      const pz = p.z + Math.sin(time * 0.3 + p.offset) * 0.2

      dummy.position.set(px, py, pz)
      const pulse = 0.8 + Math.sin(time * 2 + p.offset) * 0.2
      dummy.scale.setScalar(p.scale * pulse)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.5} toneMapped={false} />
    </instancedMesh>
  )
}
