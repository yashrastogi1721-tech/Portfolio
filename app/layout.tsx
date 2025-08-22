import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Yash Rastogi - Data Analyst & AI/ML Engineer | Portfolio",
  description:
    "Yash Rastogi is an aspiring Data Analyst and AI/ML Engineer from Uttar Pradesh, India. B.Tech student at Moradabad Institute of Technology with expertise in Python, SQL, Machine Learning, and Data Science. View projects, certifications, and contact information.",
  keywords: [
    "Yash Rastogi",
    "Data Analyst",
    "AI Engineer",
    "ML Engineer",
    "Data Science",
    "Python Developer",
    "SQL Expert",
    "Machine Learning",
    "Moradabad Institute of Technology",
    "Uttar Pradesh",
    "India",
    "Portfolio",
    "Data Visualization",
    "Power BI",
    "Cisco Certification",
  ],
  authors: [{ name: "Yash Rastogi" }],
  creator: "Yash Rastogi",
  publisher: "Yash Rastogi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashrastogi.vercel.app",
    siteName: "Yash Rastogi Portfolio",
    title: "Yash Rastogi - Data Analyst & AI/ML Engineer",
    description:
      "Professional portfolio of Yash Rastogi showcasing data science projects, AI/ML expertise, and technical skills. B.Tech student from Moradabad Institute of Technology.",
    images: [
      {
        url: "/yash-rastogi-portfolio.png",
        width: 1200,
        height: 630,
        alt: "Yash Rastogi - Data Analyst & AI/ML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Rastogi - Data Analyst & AI/ML Engineer",
    description:
      "Professional portfolio showcasing data science projects and AI/ML expertise by Yash Rastogi from Uttar Pradesh, India.",
    images: ["/yash-rastogi-portfolio.png"],
    creator: "@yashrastogi1721",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://yashrastogi.vercel.app",
  },
  category: "portfolio",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yash Rastogi",
              jobTitle: "Data Analyst & AI/ML Engineer",
              description:
                "Aspiring Data Analyst and AI/ML Engineer with expertise in Python, SQL, and Machine Learning",
              url: "https://yashrastogi.vercel.app",
              email: "yashrastogi1721@gmail.com",
              telephone: "+91-7900385651",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Uttar Pradesh",
                addressCountry: "India",
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Moradabad Institute of Technology",
              },
              knowsAbout: [
                "Data Analysis",
                "Machine Learning",
                "Artificial Intelligence",
                "Python Programming",
                "SQL",
                "Data Science",
                "Power BI",
              ],
              sameAs: [
                "https://github.com/yashrastogi1721-tech",
                "https://www.linkedin.com/in/yash-rastogi-207a1037a/",
              ],
            }),
          }}
        />
        <meta name="author" content="Yash Rastogi" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Uttar Pradesh, India" />
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
