"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { SceneContainer } from "@/components/three/scene-container"
import { ParticleField } from "@/components/three/particle-field"

export default function Home() {
  return (
    <>
      {/* Global 3D particle background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SceneContainer frameloop="always" camera={{ position: [0, 0, 5], fov: 75 }}>
          <ParticleField />
        </SceneContainer>
      </div>

      <main className="relative z-10 min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
