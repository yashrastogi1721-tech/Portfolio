"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Award } from "lucide-react"
import { useEffect, useState } from "react"

export function Timeline() {
  const [isVisible, setIsVisible] = useState(false)

  const timelineEvents = [
    {
      year: "2023-2027",
      title: "B.Tech in Computer Science",
      company: "Moradabad Institute of Technology",
      location: "Moradabad, India",
      description:
        "Currently pursuing Bachelor of Technology in Computer Science Engineering. Building strong foundation in programming, algorithms, and software development.",
      skills: ["Computer Science", "Programming", "Software Engineering", "Algorithms"],
      type: "education",
    },
    {
      year: "2024",
      title: "Python Essentials 1",
      company: "Cisco Networking Academy",
      location: "Online",
      description:
        "Completed comprehensive Python programming fundamentals course covering syntax, data types, control structures, and basic programming concepts.",
      skills: ["Python", "Programming Fundamentals", "Data Types", "Control Structures"],
      type: "education",
    },
    {
      year: "2024",
      title: "Python Essentials 2",
      company: "Cisco Networking Academy",
      location: "Online",
      description:
        "Advanced Python programming course focusing on object-oriented programming, modules, packages, and advanced Python concepts.",
      skills: ["Python", "OOP", "Modules", "Advanced Programming"],
      type: "education",
    },
    {
      year: "2024",
      title: "Introduction to Machine Learning",
      company: "NPTEL",
      location: "Online",
      description:
        "Comprehensive machine learning course from July 21 to October 25, 2024. Covered ML algorithms, data preprocessing, model evaluation, and practical applications.",
      skills: ["Machine Learning", "Data Science", "Algorithms", "Model Evaluation"],
      type: "education",
    },
    {
      year: "2024",
      title: "Data Science Journey",
      company: "Self-Learning & Projects",
      location: "Remote",
      description:
        "Actively building data science skills through hands-on projects, online courses, and practical applications. Developing portfolio to showcase analytical and technical capabilities.",
      skills: ["Data Science", "Portfolio Development", "Analytics", "Project Management"],
      type: "current",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("timeline")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work":
        return <MapPin className="w-4 h-4" />
      case "education":
        return <Award className="w-4 h-4" />
      case "current":
        return <Calendar className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-primary"
      case "education":
        return "bg-accent"
      case "current":
        return "bg-chart-3"
      default:
        return "bg-muted"
    }
  }

  return (
    <section id="timeline" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">My Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From computer science student to aspiring data scientist - a timeline of continuous learning and skill
              development.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className="relative flex items-start gap-6 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`relative z-10 w-16 h-16 ${getTypeColor(event.type)} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {getTypeIcon(event.type)}
                  </div>

                  {/* Content Card */}
                  <Card className="flex-1 group-hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-foreground mb-1">{event.title}</h3>
                          <p className="text-primary font-medium">{event.company}</p>
                        </div>
                        <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                          <Badge variant="outline" className="mb-1">
                            {event.year}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4">{event.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
