"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"

export function Contact() {
  const useMailto = false // Set to false when you have a valid Resend API key
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("contact")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If using mailto fallback, open email client with pre-filled content
    if (useMailto) {
      const subject = encodeURIComponent(formData.subject || "Contact from Portfolio")
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )
      window.open(`mailto:yashrastogi1721@gmail.com?subject=${subject}&body=${body}`)

      // Clear form and show success message
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitStatus("success")
      return
    }

    // Original API submission logic
    setIsSubmitting(true)
    setSubmitStatus("idle")

    console.log("[v0] Form submission started", formData)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("[v0] API response status:", response.status)
      const result = await response.json()
      console.log("[v0] API response data:", result)

      if (response.ok) {
        console.log("[v0] Success response:", result)
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        console.log("[v0] Error response:", result)
        setSubmitStatus("error")
        alert(`Error: ${result.error}${result.details ? ` - ${result.details}` : ""}`)
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setSubmitStatus("error")
      alert("Network error: Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "yashrastogi1721@gmail.com",
      href: "mailto:yashrastogi1721@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-7900385651",
      href: "tel:+917900385651",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Uttar Pradesh, India",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/yashrastogi1721-tech",
      color: "hover:text-gray-900",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yash-rastogi-207a1037a/",
      color: "hover:text-blue-600",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">Let's Connect</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm always interested in discussing data science opportunities, collaborating on projects, or simply
              connecting with fellow data enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-foreground">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-foreground">Follow Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h3 className="font-heading font-bold text-foreground mb-2">Ready to Collaborate?</h3>
                <p className="text-muted-foreground mb-4">
                  Whether you're looking for a data scientist, need help with analytics, or want to discuss exciting
                  opportunities, I'd love to hear from you.
                </p>
                <Button asChild className="w-full sm:w-auto">
                  <a href="mailto:yashrastogi1721@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading text-foreground">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        {useMailto
                          ? "✅ Email client opened! Please send the pre-filled message."
                          : "✅ Message sent successfully! I'll get back to you soon."}
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        ❌ Failed to send message. Please try again or email me directly.
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
