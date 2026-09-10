'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
} from './ui/Icons'
import { Phone } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Section, { SectionHeader } from './ui/Section'
import { useContact } from '@/lib/content-context'
import styles from './Contact.module.css'
import { cn } from '@/lib/utils'


export default function Contact() {
  const contact = useContact()

  const formRef = useRef(null)
  const gatewayRef = useRef(null)

  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    const node = gatewayRef.current

    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.16,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])


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


      <div className={styles.headingRow}>
        <p className={styles.intro}>
          I&apos;m always interested in new opportunities,
          learning experiences, and connecting with fellow
          technology professionals.
        </p>

        <div className={styles.headingStatus}>
          <span className={styles.onlineDot} />

          <div>
            <strong>AVAILABLE</strong>
            <span>Communication channel ready</span>
          </div>
        </div>
      </div>


      <div
        ref={gatewayRef}
        className={cn(
          styles.gateway,
          visible && styles.gatewayVisible
        )}
      >
        {/* TECH BACKGROUND */}
        <div
          className={styles.gatewayGrid}
          aria-hidden="true"
        />

        <div
          className={styles.gatewayGlow}
          aria-hidden="true"
        />

        <div
          className={styles.networkPath}
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
          <i />
        </div>


        {/* HEADER */}
        <div className={styles.gatewayHeader}>
          <div className={styles.gatewayIdentity}>
            <span className={styles.gatewayIcon}>
              &gt;_
            </span>

            <div>
              <strong>COMMUNICATION GATEWAY</strong>

              <span>
                contact://long.portfolio
              </span>
            </div>
          </div>


          <div className={styles.gatewayState}>
            <span className={styles.signal}>
              <i />
              <i />
              <i />
            </span>

            <span className={styles.gatewayStateText}>
              <strong>ONLINE</strong>
              <small>CHANNEL READY</small>
            </span>
          </div>
        </div>


        {/* MAIN */}
        <div className={styles.gatewayBody}>

          {/* LEFT - FORM */}
          <form
            ref={formRef}
            className={styles.formPanel}
            onSubmit={handleSubmit}
          >
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.panelIndex}>
                  01
                </span>

                <div>
                  <strong>SEND REQUEST</strong>

                  <span>
                    Compose a new message
                  </span>
                </div>
              </div>

              <span className={styles.requestMethod}>
                POST
              </span>
            </div>


            <div className={styles.inputRow}>
              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="name"
                >
                  <span>NAME</span>
                  <small>required</small>
                </label>

                <div className={styles.inputShell}>
                  <span className={styles.fieldPrompt}>
                    $
                  </span>

                  <input
                    className={styles.input}
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                  />
                </div>
              </div>


              <div className={styles.field}>
                <label
                  className={styles.label}
                  htmlFor="email"
                >
                  <span>EMAIL</span>
                  <small>required</small>
                </label>

                <div className={styles.inputShell}>
                  <span className={styles.fieldPrompt}>
                    @
                  </span>

                  <input
                    className={styles.input}
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>


            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="subject"
              >
                <span>SUBJECT</span>
                <small>required</small>
              </label>

              <div className={styles.inputShell}>
                <span className={styles.fieldPrompt}>
                  #
                </span>

                <input
                  className={styles.input}
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                />
              </div>
            </div>


            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="message"
              >
                <span>MESSAGE</span>
                <small>payload</small>
              </label>

              <div
                className={cn(
                  styles.inputShell,
                  styles.textareaShell
                )}
              >
                <span
                  className={styles.textareaPrompt}
                >
                  &gt;
                </span>

                <textarea
                  className={styles.textarea}
                  id="message"
                  name="message"
                  required
                  placeholder="Your message..."
                />
              </div>
            </div>


            <button
              className={styles.submitButton}
              type="submit"
              disabled={sending}
            >
              <span
                className={styles.buttonPacket}
                aria-hidden="true"
              />

              <Send size={16} />

              <span>
                {sending
                  ? 'TRANSMITTING...'
                  : 'SEND MESSAGE'}
              </span>

              <span className={styles.buttonArrow}>
                →
              </span>
            </button>


            <div className={styles.requestFooter}>
              <span>
                endpoint: /contact
              </span>

              <span>
                method: POST
              </span>

              <span className={styles.requestReady}>
                <i />
                ready
              </span>
            </div>


            {status === 'success' && (
              <div
                className={cn(
                  styles.status,
                  styles.success
                )}
              >
                <span>✓</span>

                <div>
                  <strong>MESSAGE DELIVERED</strong>
                  <small>
                    Request completed successfully.
                  </small>
                </div>
              </div>
            )}


            {status === 'error' && (
              <div
                className={cn(
                  styles.status,
                  styles.error
                )}
              >
                <span>!</span>

                <div>
                  <strong>
                    DELIVERY FAILED
                  </strong>

                  <small>
                    Try emailing me at{' '}
                    {contact?.email}
                  </small>
                </div>
              </div>
            )}
          </form>


          {/* RIGHT */}
          <aside className={styles.contactPanel}>
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.panelIndex}>
                  02
                </span>

                <div>
                  <strong>DIRECT CHANNELS</strong>

                  <span>
                    Alternative communication routes
                  </span>
                </div>
              </div>

              <span className={styles.channelCount}>
                ACTIVE
              </span>
            </div>


            <div className={styles.quickLinks}>

              {contact?.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className={styles.quickLink}
                >
                  <span className={styles.quickIcon}>
                    <Phone size={16} />
                  </span>

                  <span className={styles.quickContent}>
                    <small>PHONE</small>
                    <strong>
                      {formatPhone(contact.phone)}
                    </strong>
                  </span>

                  <span className={styles.quickArrow}>
                    ↗
                  </span>
                </a>
              )}


              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className={styles.quickLink}
                >
                  <span className={styles.quickIcon}>
                    <Mail />
                  </span>

                  <span className={styles.quickContent}>
                    <small>EMAIL</small>
                    <strong>
                      {contact.email}
                    </strong>
                  </span>

                  <span className={styles.quickArrow}>
                    ↗
                  </span>
                </a>
              )}


              {contact?.zalo && (
                <a
                  href={contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickLink}
                >
                  <span className={styles.quickIcon}>
                    <MessageSquare />
                  </span>

                  <span className={styles.quickContent}>
                    <small>ZALO</small>
                    <strong>
                      Open conversation
                    </strong>
                  </span>

                  <span className={styles.quickArrow}>
                    ↗
                  </span>
                </a>
              )}


              {contact?.whatsapp && (
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quickLink}
                >
                  <span className={styles.quickIcon}>
                    <MessageSquare />
                  </span>

                  <span className={styles.quickContent}>
                    <small>WHATSAPP</small>
                    <strong>
                      Open conversation
                    </strong>
                  </span>

                  <span className={styles.quickArrow}>
                    ↗
                  </span>
                </a>
              )}

            </div>


            {contact?.zalo_qr && (
              <div className={styles.qrSection}>
                <div className={styles.qrHeading}>
                  <span>
                    MOBILE HANDSHAKE
                  </span>

                  <span className={styles.qrStatus}>
                    <i />
                    READY
                  </span>
                </div>


                <div className={styles.qrBody}>
                  <div className={styles.qrScanner}>
                    <span className={styles.corner1} />
                    <span className={styles.corner2} />
                    <span className={styles.corner3} />
                    <span className={styles.corner4} />

                    <span
                      className={styles.qrScanLine}
                      aria-hidden="true"
                    />

                    {contact?.zalo ? (
                      <a
                        href={contact.zalo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Zalo"
                      >
                        <img
                          src={contact.zalo_qr}
                          alt="Zalo QR Code"
                        />
                      </a>
                    ) : (
                      <img
                        src={contact.zalo_qr}
                        alt="Zalo QR Code"
                      />
                    )}
                  </div>


                  <div className={styles.qrDescription}>
                    <strong>
                      SCAN TO CONNECT
                    </strong>

                    <p>
                      Point your mobile camera at
                      the QR code to open Zalo.
                    </p>

                    <div className={styles.handshake}>
                      <span>DEVICE</span>
                      <i />
                      <i />
                      <i />
                      <span>ZALO</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>


        {/* FOOTER */}
        <div className={styles.gatewayFooter}>
          <div className={styles.socialBlock}>
            <span className={styles.footerLabel}>
              SOCIAL ENDPOINTS
            </span>

            <div className={styles.social}>

              {contact?.zalo && (
                <a
                  href={contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Zalo"
                  aria-label="Zalo"
                  className={styles.zaloButton}
                >
                  Zalo
                </a>
              )}


              {contact?.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}


              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}

            </div>
          </div>


          <div
            className={styles.gatewayTelemetry}
            aria-hidden="true"
          >
            <div>
              <span>GATEWAY</span>
              <strong>ONLINE</strong>
            </div>

            <i />

            <div>
              <span>MESSAGE BUS</span>
              <strong>READY</strong>
            </div>

            <i />

            <div>
              <span>DELIVERY</span>
              <strong>ENABLED</strong>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
