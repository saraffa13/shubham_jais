"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, Instagram, Facebook } from "lucide-react"
import Image from "next/image"
import { SceneContainer } from "@/components/three/scene-container"
import { HeroScene } from "@/components/three/hero-scene"

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* 3D Hero Scene */}
      <div className="absolute inset-0 z-0">
        <SceneContainer frameloop="always" camera={{ position: [0, 0, 5], fov: 60 }}>
          <HeroScene />
        </SceneContainer>
      </div>

      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/60 via-white/30 to-white/70 dark:from-neutral-950/70 dark:via-neutral-950/40 dark:to-neutral-950/80" />

      {/* Grain overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] dark:opacity-[0.07]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-blue-700 dark:text-blue-300">Open to new opportunities</span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white"
            >
              Hey, I&apos;m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Shubham
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0"
            >
              Medical professional passionate about healthcare, patient care, and making
              a real difference in people&apos;s lives — one patient at a time.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors backdrop-blur-sm"
              >
                Know more
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50/80 dark:hover:bg-neutral-900/80 transition-colors backdrop-blur-sm"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="mt-8 flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Instagram, href: "https://www.instagram.com/sketchjais?igsh=bnJpNTVyOHk4emI1", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/sketchjais", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors backdrop-blur-sm"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile Image with 3D glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-30 animate-pulse" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-spin-slow" style={{ animationDuration: "8s" }} />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-purple-500/20">
                <Image
                  src="/shubham_jais.png"
                  alt="Shubham Kr Jaiswal"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
