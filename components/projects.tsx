"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Filter } from "lucide-react"
import { useEffect, useState } from "react"

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All")

  const projects = [
    {
      title: "Sales Analytics Dashboard",
      description:
        "Interactive dashboard built with React and D3.js for visualizing sales performance metrics, featuring real-time data updates and predictive analytics.",
      image: "/sales-analytics-dashboard.png",
      technologies: ["React", "D3.js", "Python", "PostgreSQL", "Flask"],
      category: "Data Visualization",
      github: "#",
      demo: "#",
    },
    {
      title: "Customer Churn Prediction",
      description:
        "Machine learning model using Random Forest and XGBoost to predict customer churn with 89% accuracy, deployed as a REST API.",
      image: "/ml-model-visualization.png",
      technologies: ["Python", "Scikit-learn", "XGBoost", "Flask", "Docker"],
      category: "Machine Learning",
      github: "#",
      demo: "#",
    },
    {
      title: "E-commerce Data Pipeline",
      description:
        "Automated ETL pipeline processing 1M+ daily transactions, with data quality monitoring and real-time alerting system.",
      image: "/data-pipeline-architecture.png",
      technologies: ["Python", "Apache Airflow", "PostgreSQL", "Redis", "AWS"],
      category: "Data Engineering",
      github: "#",
      demo: "#",
    },
    {
      title: "Financial Portfolio Optimizer",
      description:
        "Web application using Modern Portfolio Theory to optimize investment portfolios with risk assessment and backtesting capabilities.",
      image: "/financial-portfolio-optimization-interface.png",
      technologies: ["React", "Python", "NumPy", "Pandas", "Chart.js"],
      category: "Data Analysis",
      github: "#",
      demo: "#",
    },
    {
      title: "Social Media Sentiment Analysis",
      description:
        "NLP project analyzing social media sentiment using BERT transformers, with real-time monitoring and trend detection.",
      image: "/sentiment-analysis-dashboard.png",
      technologies: ["Python", "Transformers", "BERT", "Streamlit", "MongoDB"],
      category: "Machine Learning",
      github: "#",
      demo: "#",
    },
    {
      title: "Supply Chain Analytics",
      description:
        "Full-stack application for supply chain optimization with demand forecasting and inventory management insights.",
      image: "/supply-chain-analytics-dashboard.png",
      technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Tableau"],
      category: "Data Analysis",
      github: "#",
      demo: "#",
    },
  ]

  const categories = ["All", ...new Set(projects.map((project) => project.category))]
  const filteredProjects =
    selectedFilter === "All" ? projects : projects.filter((project) => project.category === selectedFilter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("projects")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of data science projects demonstrating my journey from software engineering to analytics and
              machine learning.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(category)}
                className="transition-all duration-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.title}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-heading text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
