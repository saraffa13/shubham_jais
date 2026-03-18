"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Stethoscope,
  Brain,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Clinical Skills",
    icon: Stethoscope,
    skills: ["Patient Assessment", "History Taking", "Physical Examination", "Diagnosis", "Treatment Planning"],
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  },
  {
    title: "Medical Knowledge",
    icon: Brain,
    skills: ["Internal Medicine", "Pharmacology", "Pathology", "Anatomy", "Physiology"],
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]",
  },
  {
    title: "Emergency & Critical Care",
    icon: HeartPulse,
    skills: ["BLS/ACLS", "Trauma Care", "Emergency Medicine", "Triage", "IV Cannulation"],
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]",
  },
  {
    title: "Research & Diagnostics",
    icon: Microscope,
    skills: ["Clinical Research", "Case Studies", "Lab Interpretation", "Evidence-Based Medicine"],
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]",
  },
  {
    title: "Patient Care",
    icon: ShieldCheck,
    skills: ["Counseling", "Chronic Disease Management", "Preventive Care", "Health Education"],
    area: "md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]",
  },
  {
    title: "Soft Skills",
    icon: Users,
    skills: ["Communication", "Teamwork", "Leadership", "Empathy", "Time Management"],
    area: "md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]",
  },
]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Skills &amp; Expertise<span className="text-blue-500">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mb-12">
            The clinical competencies and professional skills I bring to healthcare every day.
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2">
          {skillCategories.map((category, i) => (
            <motion.li
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className={cn("min-h-[12rem] list-none", category.area)}
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-neutral-200 dark:border-neutral-800 p-2 md:rounded-[1.5rem] md:p-3">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
                  <div className="flex flex-col gap-3">
                    <div className="w-fit rounded-lg border-[0.75px] border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-2">
                      <category.icon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
