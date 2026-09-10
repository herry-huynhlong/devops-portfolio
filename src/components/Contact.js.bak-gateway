'use client'

import { useRef, useState } from 'react'
import { Github, Linkedin, Mail, MessageSquare, Send } from './ui/Icons'
import { Phone } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Section, { SectionHeader } from './ui/Section'
import Button from './ui/Button'
import { useContact } from '@/lib/content-context'
import styles from './Contact.module.css'
import { cn } from '@/lib/utils'

export default function Contact() {
  const contact = useContact()
  const formRef = useRef(null)

  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setSending(true)
    setStatus(null)

    const form = formRef.current

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.value,
          from_email: form.email.value,
          subject: form.subject.value,
          message: form.message.value,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )

      if (response.status === 200) {
        setStatus('success')
        form.reset()
      } else {
        throw new Error('Email sending failed')
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  function formatPhone(phone) {
    if (!phone) return ''

    const clean = phone.replace(/\D/g, '')

    if (clean.length === 10) {
      return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7)}`
    }

    return phone
  }

  return (
    <Section id="contact">
      <SectionHeader>
        <h2>Let&apos;s Connect</h2>
      </SectionHeader>

      <p className={styles.intro}>
        I&apos;m always interested in new opportunities, learning experiences,
        and connecting with fellow technology professionals.
      </p>

      <div className={styles.columns}>

        {/* CONTACT FORM */}
        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.inputRow}>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>

              <input
                className={styles.input}
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>

              <input
                className={styles.input}
                id="email"
                name="email"
                type="text"
                required
                placeholder="john@example.com"
              />
            </div>

          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="subject">
              Subject
            </label>

            <input
              className={styles.input}
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What's this about?"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">
              Message
            </label>

            <textarea
              className={styles.textarea}
              id="message"
              name="message"
              required
              placeholder="Your message..."
            />
          </div>

          <Button
            variant="brand"
            type="submit"
            disabled={sending}
            icon={sending ? null : Send}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </Button>

          {status === 'success' && (
            <p className={cn(styles.status, styles.success)}>
              Message sent successfully!
            </p>
          )}

          {status === 'error' && (
            <p className={cn(styles.status, styles.error)}>
              Something went wrong. Try emailing me at {contact?.email}
            </p>
          )}
        </form>


        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>

          {/* DIRECT CONTACT */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>
              Direct Contact
            </p>

            <div className={styles.quickLinks}>

              {/* PHONE */}
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className={styles.quickLink}
                >
                  <Phone size={18} />
                  {formatPhone(contact.phone)}
                </a>
              )}

              {/* ZALO */}
              {contact?.zalo && (
                <a
                  href={contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickLink}
                >
                  <MessageSquare />
                  Zalo
                </a>
              )}

              {/* WHATSAPP */}
              {contact?.whatsapp && (
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickLink}
                >
                  <MessageSquare />
                  WhatsApp
                </a>
              )}

              {/* EMAIL */}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className={styles.quickLink}
                >
                  <Mail />
                  {contact.email}
                </a>
              )}

            </div>


            {/* ZALO QR */}
            {contact?.zalo_qr && (
              <div
                style={{
                  marginTop: '22px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >

                <p
                  style={{
                    width: '100%',
                    margin: '0 0 14px 0',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    opacity: 0.65,
                  }}
                >
                  Scan Zalo QR
                </p>

                {contact?.zalo ? (
                  <a
                    href={contact.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Zalo"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <img
                      src={contact.zalo_qr}
                      alt="Zalo QR Code"
                      style={{
                        display: 'block',
                        width: '145px',
                        height: '145px',
                        objectFit: 'contain',
                        background: '#ffffff',
                        padding: '8px',
                        borderRadius: '12px',
                      }}
                    />
                  </a>
                ) : (
                  <img
                    src={contact.zalo_qr}
                    alt="Zalo QR Code"
                    style={{
                      display: 'block',
                      width: '145px',
                      height: '145px',
                      objectFit: 'contain',
                      background: '#ffffff',
                      padding: '8px',
                      borderRadius: '12px',
                    }}
                  />
                )}

                <p
                  style={{
                    width: '100%',
                    margin: '12px 0 0 0',
                    textAlign: 'center',
                    fontSize: '12px',
                    opacity: 0.55,
                  }}
                >
                  Scan to connect on Zalo
                </p>

              </div>
            )}

          </div>


          {/* SOCIAL */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>
              Social
            </p>

            <div className={styles.social}>

              {/* ZALO SOCIAL */}
              {contact?.zalo && (
                <a
                  href={contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Zalo"
                  aria-label="Zalo"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '7px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0068ff',
                    color: '#ffffff',
                    fontSize: '9px',
                    lineHeight: '1',
                    fontWeight: '800',
                    textDecoration: 'none',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Zalo
                </a>
              )}

              {/* GITHUB */}
              {contact?.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
              )}

              {/* LINKEDIN */}
              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              )}

            </div>
          </div>

        </div>

      </div>
    </Section>
  )
}
