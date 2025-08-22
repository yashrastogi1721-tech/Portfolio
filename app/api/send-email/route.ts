import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called")

    const apiKey = process.env.RESEND_API_KEY
    console.log("[v0] RESEND_API_KEY exists:", !!apiKey)
    console.log("[v0] API key format:", apiKey ? `${apiKey.substring(0, 3)}...` : "none")

    if (!apiKey) {
      console.log("[v0] No API key found")
      return NextResponse.json(
        {
          error: "Email service not configured. Please set RESEND_API_KEY environment variable.",
        },
        { status: 500 },
      )
    }

    if (!apiKey.startsWith("re_")) {
      console.log("[v0] Invalid API key format")
      return NextResponse.json(
        {
          error: "Invalid API key format. Resend API keys should start with 're_'",
        },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)

    const { name, email, subject, message } = await request.json()
    console.log("[v0] Request data:", { name, email, subject, messageLength: message?.length })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Validation failed - missing fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Send email using Resend
    console.log("[v0] Attempting to send email...")
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["yashrastogi1721@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Message:</h3>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #059669; border-radius: 4px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: error.message || "Unknown error from email service",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Email sent successfully:", data?.id)
    return NextResponse.json({ message: "Email sent successfully", id: data?.id }, { status: 200 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
