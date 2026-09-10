'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Section, { SectionHeader } from './ui/Section'
import { Briefcase } from 'lucide-react'
import { useExperience } from '@/lib/content-context'
import styles from './Experience.module.css'
import { cn } from '@/lib/utils'


function isActiveJob(period = '') {
  return /present|current|now/i.test(period)
}


function getYears(period = '') {
  const years = String(period).match(/\b(19|20)\d{2}\b/g) || []

  return {
    start: years[0] || 'START',
    end: isActiveJob(period)
      ? 'PRESENT'
      : years[1] || years[0] || 'END',
  }
}


export default function Experience() {
  const experience = useExperience()

  const stageRef = useRef(null)

  const [visible, setVisible] = useState(false)


  useEffect(() => {
    const node = stageRef.current

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


  const careerYears = useMemo(() => {
    if (!experience?.length) {
      return []
    }

    const years = []

    experience.forEach((item) => {
      const matches =
        String(item.period).match(/\b(19|20)\d{2}\b/g) || []

      matches.forEach((year) => {
        if (!years.includes(year)) {
          years.push(year)
        }
      })
    })

    years.sort()

    if (
      experience.some((item) =>
        isActiveJob(item.period)
      )
    ) {
      years.push('PRESENT')
    }

    return years
  }, [experience])


  if (!experience?.length) return null


  return (
    <Section id="experience">
      <SectionHeader>
        <h2>Experience</h2>
      </SectionHeader>

      <div
        ref={stageRef}
        className={cn(
          styles.stage,
          visible && styles.visible
        )}
      >
        <div
          className={styles.backgroundGrid}
          aria-hidden="true"
        />

        <div
          className={styles.backgroundGlow}
          aria-hidden="true"
        />


        {/* CAREER PIPELINE */}
        {careerYears.length > 1 && (
          <div className={styles.careerPipeline}>
            <div className={styles.pipelineHeader}>
              <span>
                CAREER DEPLOYMENT PIPELINE
              </span>

              <span className={styles.pipelineState}>
                <i />
                HISTORY ONLINE
              </span>
            </div>

            <div className={styles.pipelineTrack}>
              <span className={styles.pipelineFill} />

              {careerYears.map((year, index) => (
                <div
                  key={`${year}-${index}`}
                  className={styles.yearNode}
                  style={{
                    left:
                      careerYears.length === 1
                        ? '50%'
                        : `${
                            (index /
                              (careerYears.length - 1)) *
                            100
                          }%`,
                  }}
                >
                  <i />

                  <span>{year}</span>
                </div>
              ))}
            </div>
          </div>
        )}


        <div className={styles.grid}>
          {experience.map((item, i) => {
            const active =
              isActiveJob(item.period)

            const years =
              getYears(item.period)

            return (
              <article
                key={i}
                className={cn(
                  styles.card,
                  active && styles.activeCard
                )}
                style={{
                  '--card-delay': `${i * 150}ms`,
                }}
              >
                <div
                  className={styles.scanBeam}
                  aria-hidden="true"
                />

                <div
                  className={styles.cornerTL}
                  aria-hidden="true"
                />

                <div
                  className={styles.cornerBR}
                  aria-hidden="true"
                />


                {/* ENV HEADER */}
                <div className={styles.envHeader}>
                  <div className={styles.envIdentity}>
                    <span
                      className={cn(
                        styles.envDot,
                        active && styles.envDotActive
                      )}
                    />

                    <span>
                      ENV-{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div
                    className={cn(
                      styles.envState,
                      active && styles.envStateActive
                    )}
                  >
                    <span />

                    {active
                      ? 'ACTIVE'
                      : 'COMPLETED'}
                  </div>
                </div>


                {/* ROLE */}
                <div className={styles.roleHeader}>
                  <div className={styles.iconWrap}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.company}
                        onError={(e) => {
                          e.target.style.display =
                            'none'

                          if (
                            e.target.nextElementSibling
                          ) {
                            e.target.nextElementSibling.style.display =
                              'block'
                          }
                        }}
                      />
                    ) : null}

                    <Briefcase
                      style={
                        item.image
                          ? { display: 'none' }
                          : {}
                      }
                    />
                  </div>

                  <div className={styles.info}>
                    <span className={styles.roleLabel}>
                      production.assignment
                    </span>

                    <h3 className={styles.title}>
                      {item.title}
                    </h3>

                    <p className={styles.company}>
                      {item.company}
                    </p>

                    <p className={styles.period}>
                      {item.period}
                    </p>
                  </div>
                </div>


                {/* TIME RANGE */}
                <div className={styles.jobTimeline}>
                  <div className={styles.jobTimelineLabels}>
                    <span>{years.start}</span>

                    <span>
                      {active
                        ? 'CURRENT DEPLOYMENT'
                        : 'DEPLOYMENT CLOSED'}
                    </span>

                    <span>{years.end}</span>
                  </div>

                  <div className={styles.jobTimelineTrack}>
                    <span
                      className={styles.jobTimelineFill}
                    />

                    <i
                      className={styles.startPoint}
                    />

                    <i
                      className={cn(
                        styles.endPoint,
                        active &&
                          styles.endPointActive
                      )}
                    />
                  </div>
                </div>


                {/* DEPLOYMENT LOG */}
                <div className={styles.logSection}>
                  <div className={styles.logHeader}>
                    <span>
                      DEPLOYMENT LOG
                    </span>

                    <span>
                      {item.details?.length || 0}{' '}
                      TASKS
                    </span>
                  </div>

                  <ul className={styles.details}>
                    {item.details?.map(
                      (detail, j) => (
                        <li
                          key={j}
                          style={{
                            '--detail-delay': `${
                              480 +
                              i * 120 +
                              j * 115
                            }ms`,
                          }}
                        >
                          <span
                            className={styles.ok}
                          >
                            OK
                          </span>

                          <span
                            className={
                              styles.detailText
                            }
                          >
                            {detail}
                          </span>

                          <span
                            className={
                              styles.detailCheck
                            }
                          >
                            ✓
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>


                {/* TELEMETRY */}
                <div className={styles.telemetry}>
                  <div>
                    <span>
                      environment
                    </span>

                    <strong>
                      PRODUCTION
                    </strong>
                  </div>

                  <div>
                    <span>
                      state
                    </span>

                    <strong>
                      {active
                        ? 'HEALTHY'
                        : 'COMPLETE'}
                    </strong>
                  </div>

                  <div>
                    <span>
                      lifecycle
                    </span>

                    <strong>
                      {active
                        ? 'RUNNING'
                        : 'ARCHIVED'}
                    </strong>
                  </div>
                </div>


                {/* FOOTER */}
                <div className={styles.cardFooter}>
                  <span>
                    deployment://experience/
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className={styles.activity}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>

                  <strong>
                    {active
                      ? 'PROCESS RUNNING'
                      : 'EXIT CODE 0'}
                  </strong>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
