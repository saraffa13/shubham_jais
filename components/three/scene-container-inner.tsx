"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { Suspense, useState, type ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  frameloop?: "always" | "demand" | "never"
  camera?: { position?: [number, number, number]; fov?: number }
}

export default function SceneContainerInner({
  children,
  className,
  style,
  frameloop = "always",
  camera,
}: Props) {
  const [dpr, setDpr] = useState(1.5)

  return (
    <Canvas
      className={className}
      style={{ ...style }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: camera?.position ?? [0, 0, 5], fov: camera?.fov ?? 75 }}
      frameloop={frameloop}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
