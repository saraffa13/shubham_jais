"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { FloatingCard } from "@/components/three/floating-card"
import Image from "next/image"

const projects = [
  {
    title: "Community Health Camp Initiative",
    description: "Organized and led free health screening camps in rural areas, providing basic diagnostics, health education, and referrals to over 500+ patients.",
    tags: ["Public Health", "Community Outreach", "Screening"],
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop",
    link: "#",
  },
  {
    title: "Clinical Case Study Research",
    description: "Conducted and presented detailed case studies on rare clinical presentations, contributing to better diagnostic approaches in the department.",
    tags: ["Research", "Case Study", "Clinical Medicine"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    link: "#",
  },
  {
    title: "Health Awareness Campaign",
    description: "Designed and executed a social media health awareness campaign reaching 10K+ people on topics like preventive care, nutrition, and mental health.",
    tags: ["Health Education", "Social Media", "Prevention"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
    link: "#",
  },
  {
    title: "Patient Management System",
    description: "Helped implement a digital patient record system at the clinic, improving workflow efficiency and reducing patient wait times significantly.",
    tags: ["Healthcare IT", "Process Improvement", "EHR"],
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop",
    link: "#",
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-24 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Work &amp; Initiatives<span className="text-blue-500">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mb-12">
            Projects, research, and initiatives I&apos;ve been part of — each one driven by a
            desire to improve healthcare and help those in need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group relative"
            >
              <FloatingCard intensity={6}>
                <div className="relative h-full rounded-[1.25rem] border border-neutral-200 dark:border-neutral-800 p-2 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                  />
                  <div className="relative h-full flex flex-col overflow-hidden rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-100 dark:border-neutral-800 backdrop-blur-sm">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors">
                          {project.title}
                        </h3>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-1 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
