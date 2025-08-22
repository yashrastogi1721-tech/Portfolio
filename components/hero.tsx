"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const texts = ["I am a Data Analyst", "I am an AI/ML Engineer"]
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (currentTextIndex === 0) {
      // Data Analyst theme - Emerald green
      root.style.setProperty("--primary", "oklch(0.45 0.15 160)")
      root.style.setProperty("--primary-foreground", "oklch(1 0 0)")
      root.style.setProperty("--accent", "oklch(0.55 0.12 160)")
      root.style.setProperty("--accent-foreground", "oklch(1 0 0)")
      root.classList.remove("theme-ai-ml")
      root.classList.add("theme-data-analyst")
    } else {
      // AI/ML Engineer theme - Blue-purple
      root.style.setProperty("--primary", "oklch(0.45 0.15 260)")
      root.style.setProperty("--primary-foreground", "oklch(1 0 0)")
      root.style.setProperty("--accent", "oklch(0.55 0.12 260)")
      root.style.setProperty("--accent-foreground", "oklch(1 0 0)")
      root.classList.remove("theme-data-analyst")
      root.classList.add("theme-ai-ml")
    }
  }, [currentTextIndex])

  useEffect(() => {
    const currentText = texts[currentTextIndex]

    if (!isDeleting && typewriterIndex < currentText.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterIndex + 1))
        setTypewriterIndex(typewriterIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && typewriterIndex === currentText.length) {
      // Pause at end of text
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    } else if (isDeleting && typewriterIndex > 0) {
      // Deleting backward
      const timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterIndex - 1))
        setTypewriterIndex(typewriterIndex - 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else if (isDeleting && typewriterIndex === 0) {
      // Switch to next text
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }
  }, [typewriterIndex, currentTextIndex, isDeleting, texts])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadResume = () => {
    const link = document.createElement("a")
    link.href = "/Resume2.pdf"
    link.download = "Resume2.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-1000"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 transition-colors duration-1000" />
      <div className="absolute inset-0 bg-[url('/subtle-data-pattern.png')] opacity-5" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-foreground mb-6 font-serif">
            YASH
            <span className="block text-primary transition-colors duration-1000">RASTOGI</span>
          </h1>

          <div className="mb-6">
            <p className="text-xl sm:text-2xl text-primary font-semibold min-h-[2rem] transition-colors duration-1000">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Data Analyst transitioning into Data Science. Passionate about turning data into actionable insights and
            building intelligent solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToProjects}
                className="animate-pulse-glow font-semibold"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={downloadResume} className="font-semibold bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/yashrastogi1721-tech" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/yash-rastogi-207a1037a/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:yashrastogi1721@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">1</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">7+</div>
              <div className="text-sm text-muted-foreground">Technologies Mastered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
