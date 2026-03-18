"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Instagram, Facebook, ArrowUpRight, Download } from "lucide-react"

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/sketchjais?igsh=bnJpNTVyOHk4emI1", username: "@sketchjais" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/sketchjais", username: "sketchjais" },
  { icon: Mail, label: "Email", href: "mailto:44shubhamjaiswal@gmail.com", username: "44shubhamjaiswal@gmail.com" },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Let&apos;s connect<span className="text-blue-500">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8 mx-auto" />
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
            Want to connect, collaborate, or just have a conversation?
          </p>
          <p className="text-neutral-500 dark:text-neutral-500 mb-12">
            Whether it&apos;s about healthcare, a professional opportunity, or
            just a friendly hello — I&apos;d love to hear from you. Reach out
            through any of the channels below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="mailto:44shubhamjaiswal@gmail.com"
              className="group flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
            >
              <Mail className="h-5 w-5" />
              Say Hello
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="group flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-full border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white font-medium text-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors"
            >
              <Download className="h-5 w-5" />
              Resume
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -2 }}
                className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 transition-colors">
                  <social.icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">{social.label}</p>
                  <p className="text-xs text-neutral-500 truncate">{social.username}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-neutral-400 dark:text-neutral-600 mt-20"
        >
          Built with Next.js, Tailwind CSS &amp; a lot of chai.
        </motion.p>
      </div>
    </section>
  )
}
