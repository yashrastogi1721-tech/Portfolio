"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})

  const technicalSkills = [
    { name: "Python", level: 90, category: "Programming" },
    { name: "JavaScript/TypeScript", level: 85, category: "Programming" },
    { name: "SQL", level: 88, category: "Database" },
    { name: "React/Next.js", level: 82, category: "Frontend" },
    { name: "Pandas/NumPy", level: 85, category: "Data Analysis" },
    { name: "Scikit-learn", level: 75, category: "Machine Learning" },
    { name: "Tableau/Power BI", level: 80, category: "Visualization" },
    { name: "Git/GitHub", level: 90, category: "Tools" },
  ]

  const tools = [
    "Python",
    "R",
    "SQL",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "Matplotlib",
    "Seaborn",
    "Tableau",
    "Power BI",
    "Excel",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate progress bars
          technicalSkills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedValues((prev) => ({
                ...prev,
                [skill.name]: skill.level,
              }))
            }, index * 100)
          })
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("skills")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const categories = [...new Set(technicalSkills.map((skill) => skill.category))]

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Technical Skills</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit spanning software engineering, data analysis, and emerging data science
              capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {categories.map((category, categoryIndex) => (
              <Card key={category} className="h-fit">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-foreground">{category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {technicalSkills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{animatedValues[skill.name] || 0}%</span>
                        </div>
                        <Progress value={animatedValues[skill.name] || 0} className="h-2" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-heading text-foreground text-center">Technologies & Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {tools.map((tool, index) => (
                  <Badge
                    key={tool}
                    variant="secondary"
                    className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
