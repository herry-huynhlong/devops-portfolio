'use client'

import { useEffect, useState } from 'react'
import Section, { SectionHeader } from './ui/Section'
import { Github, Linkedin, User } from './ui/Icons'
import { useAbout, useContact } from '@/lib/content-context'
import styles from './About.module.css'


const TERMINAL_SESSIONS = [
  {
    command: 'systemctl status portfolio.service',
    output: [
      '● portfolio.service - DevOps Portfolio',
      '  Loaded: loaded (/etc/systemd/system/portfolio.service)',
      '  Active: active (running)',
      '  Tasks: 18    Memory: 84.7M',
    ],
  },
  {
    command: 'docker ps --format "table {{.Names}}\\t{{.Status}}"',
    output: [
      'NAMES              STATUS',
      'portfolio-web      Up 27 days',
      'nginx-proxy        Up 27 days',
      'monitor-agent      Up 27 days',
    ],
  },
  {
    command: 'sudo nginx -t',
    output: [
      'nginx: configuration file /etc/nginx/nginx.conf syntax is ok',
      'nginx: configuration file /etc/nginx/nginx.conf test is successful',
      '',
      'TLS certificate: valid',
    ],
  },
  {
    command: 'free -h && df -h /',
    output: [
      '              total    used    free',
      'Mem:           3.8Gi   1.7Gi   1.6Gi',
      '/dev/root       29G     11G     17G',
      'System resources: healthy',
    ],
  },
  {
    command: 'curl -sI https://long.org | head',
    output: [
      'HTTP/2 200',
      'server: nginx',
      'cache-control: public',
      'x-status: healthy',
    ],
  },
]


const LOG_SETS = [
  [
    'nginx[1842]: GET / 200 12ms',
    'portfolio[921]: healthcheck passed',
    'systemd[1]: portfolio.service active',
    'nginx[1842]: GET /projects 200 9ms',
  ],
  [
    'docker[744]: portfolio-web healthy',
    'kernel: eth0 link ready',
    'nginx[1842]: TLS handshake completed',
    'portfolio[921]: request completed 200',
  ],
  [
    'systemd[1]: backup.service finished',
    'docker[744]: container state healthy',
    'nginx[1842]: upstream response 200',
    'monitor[602]: all systems operational',
  ],
]


function LinuxBackdrop() {
  const [session, setSession] = useState(0)
  const [logSet, setLogSet] = useState(0)

  useEffect(() => {
    const terminalTimer = setInterval(() => {
      setSession((current) => (
        current + 1
      ) % TERMINAL_SESSIONS.length)
    }, 3400)

    const logTimer = setInterval(() => {
      setLogSet((current) => (
        current + 1
      ) % LOG_SETS.length)
    }, 2300)

    return () => {
      clearInterval(terminalTimer)
      clearInterval(logTimer)
    }
  }, [])

  const current = TERMINAL_SESSIONS[session]

  return (
    <div
      className={styles.linuxBackdrop}
      aria-hidden="true"
    >
      <div className={styles.terminalWindow}>
        <div className={styles.terminalHeader}>
          <div className={styles.windowControls}>
            <span />
            <span />
            <span />
          </div>

          <div className={styles.terminalTitle}>
            long@portfolio: ~
          </div>

          <div className={styles.terminalStatus}>
            SSH
          </div>
        </div>

        <div className={styles.terminalBody}>
          <div
            key={session}
            className={styles.terminalSession}
          >
            <div className={styles.commandLine}>
              <span className={styles.promptUser}>
                long@portfolio
              </span>

              <span className={styles.promptColon}>
                :
              </span>

              <span className={styles.promptPath}>
                ~
              </span>

              <span className={styles.promptDollar}>
                $
              </span>

              <span className={styles.command}>
                {current.command}
              </span>
            </div>

            <div className={styles.commandOutput}>
              {current.output.map((line, index) => (
                <div key={index}>
                  {line || '\u00A0'}
                </div>
              ))}
            </div>

            <div className={styles.commandLine}>
              <span className={styles.promptUser}>
                long@portfolio
              </span>

              <span className={styles.promptColon}>
                :
              </span>

              <span className={styles.promptPath}>
                ~
              </span>

              <span className={styles.promptDollar}>
                $
              </span>

              <span className={styles.cursor}>
                █
              </span>
            </div>
          </div>
        </div>

        <div className={styles.scanLine} />
      </div>


      <div className={styles.systemMonitor}>
        <div className={styles.monitorHeader}>
          <span>SYSTEM MONITOR</span>

          <span className={styles.liveStatus}>
            <i />
            LIVE
          </span>
        </div>

        <div className={styles.hostname}>
          prod@long.org
        </div>

        <div className={styles.metric}>
          <div className={styles.metricInfo}>
            <span>CPU</span>
            <span>34%</span>
          </div>

          <div className={styles.metricBar}>
            <span className={styles.cpuBar} />
          </div>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricInfo}>
            <span>RAM</span>
            <span>47%</span>
          </div>

          <div className={styles.metricBar}>
            <span className={styles.ramBar} />
          </div>
        </div>

        <div className={styles.metric}>
          <div className={styles.metricInfo}>
            <span>NETWORK</span>
            <span>12.4 MB/s</span>
          </div>

          <div className={styles.metricBar}>
            <span className={styles.netBar} />
          </div>
        </div>

        <div className={styles.monitorFooter}>
          <span>UPTIME 27d 14h</span>
          <span>STATUS OK</span>
        </div>
      </div>


      <div className={styles.logWindow}>
        <div className={styles.logHeader}>
          <span>journalctl -f</span>

          <span className={styles.logPulse} />
        </div>

        <div
          key={logSet}
          className={styles.logLines}
        >
          {LOG_SETS[logSet].map((line, index) => (
            <div key={index}>
              <span className={styles.logTime}>
                {String(10 + index).padStart(2, '0')}:
                {String(14 + index * 7).padStart(2, '0')}:
                {String(21 + index * 4).padStart(2, '0')}
              </span>

              {' '}

              {line}
            </div>
          ))}
        </div>
      </div>


      <div className={styles.networkTrace}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}


export default function About() {
  const about = useAbout()
  const contact = useContact()

  return (
    <Section id="about">
      <SectionHeader>
        <h2>About Me</h2>
      </SectionHeader>

      <div className={styles.aboutStage}>
        <LinuxBackdrop />

        <div className={styles.grid}>
          <div className={styles.text}>
            {about?.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className={styles.imageWrap}>
            <div className={styles.imageGlow} />

            <div className={styles.imagePlaceholder}>
              {about?.image ? (
                <img
                  src={about.image}
                  alt="Mohamed Alsayed"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}

              <div
                style={
                  about?.image
                    ? { display: 'none' }
                    : {}
                }
              >
                <User />
                <span>Your Photo Here</span>
              </div>
            </div>

            <div className={styles.socialOverlay}>
              <a
                href={contact?.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <Github size={22} />
              </a>

              <a
                href={contact?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
