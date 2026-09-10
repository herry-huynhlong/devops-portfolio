'use client'

import { useEffect, useRef, useState } from 'react'
import Section, { SectionHeader } from './ui/Section'
import { useEducation } from '@/lib/content-context'
import styles from './Education.module.css'
import { cn } from '@/lib/utils'


function extractYears(period = '') {
  const years = String(period).match(/\b(19|20)\d{2}\b/g) || []

  return {
    start: years[0] || 'START',
    end: years[1] || years[0] || 'NOW',
  }
}


function isCompletedStatus(status = '') {
  return /graduated|completed|complete|passed|finished/i.test(status)
}


export default function Education() {
  const education = useEducation()

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
        threshold: 0.18,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  if (!education?.length) return null

  return (
    <Section id="education">
      <SectionHeader>
        <h2>Education</h2>
      </SectionHeader>

      <div
        ref={stageRef}
        className={cn(
          styles.educationStage,
          visible && styles.stageVisible
        )}
      >
        <div
          className={styles.backgroundGrid}
          aria-hidden="true"
        />

        <div
          className={styles.topology}
          aria-hidden="true"
        >
          <span className={styles.node1} />
          <span className={styles.node2} />
          <span className={styles.node3} />
          <span className={styles.node4} />

          <i className={styles.link1} />
          <i className={styles.link2} />
          <i className={styles.link3} />
        </div>

        <div className={styles.grid}>
          {education.map((item, i) => {
            const years = extractYears(item.period)
            const completed = isCompletedStatus(item.status)

            return (
              <article
                key={i}
                className={cn(
                  styles.card,
                  item.image && styles.cardWithImage,
                  i === 0 && styles.cardFeatured
                )}
                style={{
                  '--card-delay': `${i * 140}ms`,
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

                <div className={styles.cardHeader}>
                  <div className={styles.nodeIdentity}>
                    <span className={styles.nodeDot} />

                    <span>
                      EDU-NODE-{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div
                    className={cn(
                      styles.runtime,
                      completed && styles.runtimeComplete
                    )}
                  >
                    <span className={styles.runtimeDot} />

                    {completed ? 'COMPLETED' : 'ACTIVE'}
                  </div>
                </div>

                <div className={styles.cardLayout}>
                  <div className={styles.primary}>
                    {item.image ? (
                      <div className={styles.imageWrap}>
                        <img
                          src={item.image}
                          alt={item.title}
                        />
                      </div>
                    ) : null}

                    <div className={styles.headingBlock}>
                      <span className={styles.commandLabel}>
                        academic.profile
                      </span>

                      <h3 className={styles.title}>
                        {item.title}
                      </h3>

                      <p className={styles.degree}>
                        {item.degree}
                      </p>

                      <p className={styles.meta}>
                        {item.institution || 'Institution'}

                        {item.period && (
                          <>
                            <span className={styles.metaSeparator}>
                              /
                            </span>

                            {item.period}
                          </>
                        )}
                      </p>
                    </div>

                    {!!item.details?.length && (
                      <div className={styles.modules}>
                        <div className={styles.modulesHeader}>
                          <span>LEARNING MODULES</span>
                          <span>{item.details.length} MODULES</span>
                        </div>

                        <ul className={styles.details}>
                          {item.details.map((detail, j) => (
                            <li
                              key={j}
                              style={{
                                '--detail-delay': `${450 + j * 130}ms`,
                              }}
                            >
                              <span className={styles.detailPrompt}>
                                &gt;
                              </span>

                              <span>{detail}</span>

                              <span className={styles.detailCheck}>
                                ✓
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.achievement && (
                      <div className={styles.achievement}>
                        <span>ACHIEVEMENT</span>
                        <strong>{item.achievement}</strong>
                      </div>
                    )}
                  </div>

                  <aside className={styles.statusPanel}>
                    <div className={styles.statusPanelHeader}>
                      DEGREE STATUS
                    </div>

                    <div className={styles.progressVisual}>
                      <div className={styles.progressRing}>
                        <div className={styles.progressRingInner}>
                          <strong>
                            {completed ? '100' : 'RUN'}
                          </strong>

                          <span>
                            {completed ? '%' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.timeline}>
                      <div className={styles.timelineYears}>
                        <span>{years.start}</span>
                        <span>{years.end}</span>
                      </div>

                      <div className={styles.timelineTrack}>
                        <span className={styles.timelineFill} />

                        <i className={styles.timelineStart} />
                        <i className={styles.timelineEnd} />
                      </div>
                    </div>

                    <div className={styles.pipelineInfo}>
                      <div>
                        <span>pipeline</span>
                        <strong>
                          {completed ? 'PASSED' : 'RUNNING'}
                        </strong>
                      </div>

                      <div>
                        <span>validation</span>
                        <strong>OK</strong>
                      </div>

                      <div>
                        <span>node</span>
                        <strong>HEALTHY</strong>
                      </div>
                    </div>

                    {item.status && (
                      <span
                        className={cn(
                          styles.status,
                          completed && styles.statusCompleted
                        )}
                      >
                        <i />
                        {item.status}
                      </span>
                    )}
                  </aside>
                </div>

                <div className={styles.cardFooter}>
                  <span>
                    academic.pipeline
                  </span>

                  <span className={styles.footerDots}>
                    <i />
                    <i />
                    <i />
                  </span>

                  <strong>
                    {completed ? 'EXIT CODE 0' : 'PROCESS ACTIVE'}
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
