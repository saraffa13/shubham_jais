"use client"

import dynamic from "next/dynamic"
import { type ReactNode } from "react"

const SceneContainerInner = dynamic(() => import("./scene-container-inner"), {
  ssr: false,
})

interface SceneContainerProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  frameloop?: "always" | "demand" | "never"
  camera?: { position?: [number, number, number]; fov?: number }
  eventSource?: React.RefObject<HTMLElement>
}

export function SceneContainer(props: SceneContainerProps) {
  return <SceneContainerInner {...props} />
}
