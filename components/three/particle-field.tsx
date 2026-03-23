"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useIsMobile } from "@/hooks/use-is-mobile"

export function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const isMobile = useIsMobile()
  const count = isMobile ? 600 : 1800
  const mouse = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)
  const { viewport } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorArray = useMemo(() => new Float32Array(count * 3), [count])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * viewport.width * 3,
        y: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 8 - 2,
        speed: 0.002 + Math.random() * 0.005,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04,
      })
    }
    return temp
  }, [count, viewport.width])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Colors: blue → purple → pink based on position
  const colorA = useMemo(() => new THREE.Color("#3b82f6"), [])
  const colorB = useMemo(() => new THREE.Color("#a855f7"), [])
  const colorC = useMemo(() => new THREE.Color("#ec4899"), [])
  const tempColor = useMemo(() => new THREE.Color(), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const time = clock.elapsedTime
    const scrollOffset = scrollY.current * 0.002

    for (let i = 0; i < count; i++) {
      const p = particles[i]
      const px = p.x + Math.sin(time * p.speed * 50 + p.offset) * 0.3
      const py = p.y + Math.cos(time * p.speed * 30 + p.offset) * 0.2 + scrollOffset * 2
      const pz = p.z + Math.sin(time * 0.2 + p.offset) * 0.1

      // Mouse repulsion (desktop only)
      if (!isMobile) {
        const mx = mouse.current.x * viewport.width * 0.5
        const my = mouse.current.y * viewport.height * 0.5
        const dx = px - mx
        const dy = py - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 2) {
          const force = (2 - dist) * 0.05
          dummy.position.set(px + dx * force, py + dy * force, pz)
        } else {
          dummy.position.set(px, py, pz)
        }
      } else {
        dummy.position.set(px, py, pz)
      }

      // Fade based on distance from camera
      const distFromCenter = Math.abs(dummy.position.z)
      const scaleFade = Math.max(0.3, 1 - distFromCenter * 0.1)
      dummy.scale.setScalar(p.scale * scaleFade)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      // Color gradient based on normalized y
      const t = ((py % 20) + 20) % 20 / 20
      if (t < 0.5) {
        tempColor.lerpColors(colorA, colorB, t * 2)
      } else {
        tempColor.lerpColors(colorB, colorC, (t - 0.5) * 2)
      }
      colorArray[i * 3] = tempColor.r
      colorArray[i * 3 + 1] = tempColor.g
      colorArray[i * 3 + 2] = tempColor.b
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    const colorAttr = meshRef.current.geometry.getAttribute("color")
    if (colorAttr) {
      ;(colorAttr as THREE.BufferAttribute).set(colorArray)
      colorAttr.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshBasicMaterial vertexColors transparent opacity={0.6} toneMapped={false} />
    </instancedMesh>
  )
}
