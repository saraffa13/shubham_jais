"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float wave1 = sin(uv.x * 5.0 + uTime * 0.4) * 0.12;
    float wave2 = sin(uv.x * 3.5 - uTime * 0.25 + 1.5) * 0.18;
    float wave3 = sin(uv.x * 7.0 + uTime * 0.6 + 3.0) * 0.07;
    float wave4 = sin(uv.x * 2.0 + uTime * 0.15 + 5.0) * 0.2;

    float dist1 = smoothstep(0.04, 0.0, abs(uv.y - 0.5 + wave1));
    float dist2 = smoothstep(0.06, 0.0, abs(uv.y - 0.35 + wave2));
    float dist3 = smoothstep(0.03, 0.0, abs(uv.y - 0.65 + wave3));
    float dist4 = smoothstep(0.05, 0.0, abs(uv.y - 0.45 + wave4));

    vec3 col = dist1 * uColorA + dist2 * uColorB + dist3 * uColorC + dist4 * uColorA * 0.5;
    float alpha = (dist1 + dist2 + dist3 + dist4) * 0.5;

    gl_FragColor = vec4(col, alpha);
  }
`

export function ContactAurora() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#3b82f6") },
      uColorB: { value: new THREE.Color("#a855f7") },
      uColorC: { value: new THREE.Color("#ec4899") },
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
