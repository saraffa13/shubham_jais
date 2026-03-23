"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Timeline } from "@/components/ui/timeline"
import { SceneContainer } from "@/components/three/scene-container"
import { ExperienceParticles } from "@/components/three/experience-particles"

const experienceData = [
  {
    title: "2024",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Medical Professional
        </h4>
        <p className="text-sm text-blue-500 dark:text-blue-400 mb-4">Current Role</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
          Actively practicing clinical medicine with a focus on patient-centered care.
          Managing outpatient consultations, inpatient care, and participating in
          multidisciplinary team discussions to ensure comprehensive treatment plans.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Patient Care", "Clinical Practice", "Team Collaboration", "Health Education"].map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Clinical Rotations &amp; Internship
        </h4>
        <p className="text-sm text-blue-500 dark:text-blue-400 mb-4">Hospital Training</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
          Completed rigorous clinical rotations across multiple departments including
          Internal Medicine, Surgery, Pediatrics, OB-GYN, and Emergency Medicine.
          Gained hands-on experience in patient assessment, procedures, and case management.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Internal Medicine", "Surgery", "Pediatrics", "Emergency", "OB-GYN"].map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2020",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Medical Education
        </h4>
        <p className="text-sm text-blue-500 dark:text-blue-400 mb-4">University / Medical College</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
          Deep dive into core medical sciences — Anatomy, Physiology, Biochemistry,
          Pharmacology, Pathology, and Microbiology. Built the foundation that every
          good clinician needs.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Anatomy", "Physiology", "Pharmacology", "Pathology", "Microbiology"].map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Earlier",
    content: (
      <div>
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Where It All Began
        </h4>
        <p className="text-sm text-blue-500 dark:text-blue-400 mb-4">The Starting Point</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
          The spark that lit the fire — a genuine desire to help people and
          curiosity about how the human body works. From biology classes to medical
          entrance exams, every step was driven by purpose.
        </p>
        <div className="space-y-2">
          <div className="flex gap-2 items-center text-neutral-600 dark:text-neutral-400 text-sm">
            &#10003; Cleared medical entrance exams
          </div>
          <div className="flex gap-2 items-center text-neutral-600 dark:text-neutral-400 text-sm">
            &#10003; First hospital volunteer experience
          </div>
          <div className="flex gap-2 items-center text-neutral-600 dark:text-neutral-400 text-sm">
            &#10003; Committed to a life in healthcare
          </div>
        </div>
      </div>
    ),
  },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-24 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm relative overflow-hidden">
      {/* 3D floating particles behind timeline - desktop only */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
        <SceneContainer frameloop="always" camera={{ position: [0, 0, 5], fov: 75 }}>
          <ExperienceParticles />
        </SceneContainer>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            My Journey<span className="text-blue-500">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mb-8">
            From medical school to clinical practice — every chapter shaped who I am today.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10">
        <Timeline data={experienceData} />
      </div>
    </section>
  )
}
