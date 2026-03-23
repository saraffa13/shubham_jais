"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, BookOpen, Users } from "lucide-react"
import { FloatingCard } from "@/components/three/floating-card"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-neutral-50/90 dark:bg-neutral-900/70 backdrop-blur-sm relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            About me<span className="text-blue-500">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I&apos;m Shubham Kr Jaiswal — a medical professional based in India
              with a deep commitment to healthcare and patient well-being. Medicine
              isn&apos;t just my career, it&apos;s my calling.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I believe in a patient-first approach — combining clinical knowledge
              with genuine empathy. Every patient has a story, and understanding that
              story is half the treatment. I&apos;m passionate about evidence-based
              medicine and staying current with the latest advancements in healthcare.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Outside the clinic, you&apos;ll find me reading medical journals,
              attending conferences, or volunteering for community health initiatives.
              I&apos;m always looking for ways to grow — both as a professional
              and as a person.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-4"
          >
            {[
              {
                icon: Heart,
                title: "Patient-Centered Care",
                description: "I treat people, not just conditions. Empathy and active listening are at the core of everything I do.",
              },
              {
                icon: BookOpen,
                title: "Lifelong Learner",
                description: "Medicine evolves every day and so do I. Staying updated with research, guidelines, and clinical breakthroughs is non-negotiable.",
              },
              {
                icon: Users,
                title: "Community Health Advocate",
                description: "Healthcare shouldn't stop at the clinic door. I actively participate in health camps, awareness drives, and community outreach.",
              },
            ].map((item, i) => (
              <FloatingCard key={item.title} intensity={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-white/80 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 transition-colors backdrop-blur-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              </FloatingCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
