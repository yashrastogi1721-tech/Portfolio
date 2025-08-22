"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, TrendingUp, Brain } from "lucide-react"
import { useEffect, useState } from "react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("about")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    {
      icon: Code,
      title: "Software Engineering",
      description: "Strong foundation in full-stack development with modern frameworks and best practices.",
    },
    {
      icon: Database,
      title: "Data Analysis",
      description: "Experience in data manipulation, statistical analysis, and database management.",
    },
    {
      icon: TrendingUp,
      title: "Business Intelligence",
      description: "Translating complex data into actionable business insights and recommendations.",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Exploring predictive modeling and AI solutions to solve real-world problems.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm a passionate technologist with a unique blend of software engineering expertise and analytical
              mindset. Currently transitioning into data science to leverage the power of data in creating intelligent
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-card rounded-lg p-8 border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Starting as a software engineer, I discovered my passion for data while building analytics dashboards
                  and working with large datasets. This led me to pursue data analysis, where I honed my skills in
                  statistical analysis and data visualization.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Now, I'm expanding into data science and machine learning, combining my technical background with
                  analytical expertise to create data-driven solutions that make a real impact.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/data-scientist-charts.png"
                  alt="Data Science Workspace"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
