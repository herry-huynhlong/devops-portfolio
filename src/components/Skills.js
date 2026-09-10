'use client'

import { useEffect, useRef, useState } from 'react'
import Section, { SectionHeader } from './ui/Section'
import { useSkills } from '@/lib/content-context'
import styles from './Skills.module.css'


function getCategoryStatus(label = '') {
  const value = label.toLowerCase()

  if (value.includes('ci') || value.includes('cd')) {
    return {
      state: 'PIPELINE READY',
      code: 'CI/CD',
    }
  }

  if (value.includes('system')) {
    return {
      state: 'SYSTEM HEALTHY',
      code: 'SYS',
    }
  }

  if (
    value.includes('container') ||
    value.includes('docker')
  ) {
    return {
      state: 'RUNTIME ACTIVE',
      code: 'CTR',
    }
  }

  if (
    value.includes('cloud') ||
    value.includes('aws')
  ) {
    return {
      state: 'CLOUD ONLINE',
      code: 'CLD',
    }
  }

  return {
    state: 'STACK READY',
    code: 'DEV',
  }
}


function SkillCard({
  category,
  index,
}) {
  const skills = category.skills || []
  const meta = getCategoryStatus(category.label)

  /*
   * Dùng chính skill từ admin để tạo flow,
   * không hard-code Jenkins / Docker / AWS...
   */
  const flow = skills.slice(0, 3)

  return (
    <article
      className={styles.category}
      style={{
        '--card-delay': `${index * 130}ms`,
      }}
    >
      <div
        className={styles.cardGlow}
        aria-hidden="true"
      />

      <div
        className={styles.scanLine}
        aria-hidden="true"
      />

      <div className={styles.categoryHeader}>
        <div>
          <div className={styles.nodeName}>
            <span className={styles.nodeDot} />

            NODE-{String(index + 1).padStart(2, '0')}
          </div>

          <h3 className={styles.categoryLabel}>
            {category.label}
          </h3>
        </div>

        <div className={styles.categoryStatus}>
          <span className={styles.liveDot} />

          {meta.state}
        </div>
      </div>


      <div className={styles.headerDivider}>
        <span />
      </div>


      <div className={styles.skillsList}>
        {skills.map((skill, skillIndex) => (
          <span
            className={styles.skill}
            key={skill}
            style={{
              '--skill-delay': `${
                450 +
                index * 100 +
                skillIndex * 90
              }ms`,
            }}
          >
            <span className={styles.skillIndicator}>
              ●
            </span>

            {skill}
          </span>
        ))}
      </div>


      <div className={styles.flowArea}>
        <div className={styles.flowHeader}>
          <span>STACK FLOW</span>

          <span>
            {skills.length}{' '}
            {skills.length === 1 ? 'NODE' : 'NODES'}
          </span>
        </div>

        <div className={styles.flow}>
          {flow.map((skill, flowIndex) => (
            <div
              className={styles.flowPart}
              key={`${skill}-${flowIndex}`}
            >
              <span className={styles.flowNode}>
                {skill}
              </span>

              {flowIndex < flow.length - 1 && (
                <span className={styles.flowArrow}>
                  →
                </span>
              )}
            </div>
          ))}

          <span className={styles.flowSuccess}>
            ✓
          </span>
        </div>
      </div>


      <div className={styles.cardFooter}>
        <span className={styles.footerCode}>
          {meta.code}://stack
        </span>

        <div className={styles.activity}>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <strong>
          {meta.state}
        </strong>
      </div>
    </article>
  )
}


export default function Skills() {
  const skillCategories = useSkills()

  const stageRef = useRef(null)

  const [visible, setVisible] =
    useState(false)

  useEffect(() => {
    const element = stageRef.current

    if (!element) return

    const observer =
      new IntersectionObserver(
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

    observer.observe(element)

    return () =>
      observer.disconnect()
  }, [])


  if (!skillCategories?.length) {
    return null
  }


  /*
   * Topology trung tâm tối ưu cho layout
   * 4 category hiện tại.
   *
   * Nếu admin thay đổi số category,
   * card vẫn hoạt động bình thường.
   */
  const showCore =
    skillCategories.length === 4


  return (
    <Section id="skills">
      <SectionHeader>
        <h2>Skills & Expertise</h2>
      </SectionHeader>

      <div
        ref={stageRef}
        className={[
          styles.stage,
          visible ? styles.visible : '',
          showCore ? styles.withCore : '',
        ].join(' ')}
      >
        <div
          className={styles.backgroundGrid}
          aria-hidden="true"
        />

        <div
          className={styles.backgroundGlow}
          aria-hidden="true"
        />


        {showCore && (
          <>
            <svg
              className={styles.topologyLines}
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="500"
                y1="250"
                x2="250"
                y2="105"
              />

              <line
                x1="500"
                y1="250"
                x2="750"
                y2="105"
              />

              <line
                x1="500"
                y1="250"
                x2="250"
                y2="395"
              />

              <line
                x1="500"
                y1="250"
                x2="750"
                y2="395"
              />

              <circle
                cx="250"
                cy="105"
                r="4"
              />

              <circle
                cx="750"
                cy="105"
                r="4"
              />

              <circle
                cx="250"
                cy="395"
                r="4"
              />

              <circle
                cx="750"
                cy="395"
                r="4"
              />
            </svg>


            <div
              className={styles.core}
              aria-hidden="true"
            >
              <div className={styles.corePulse} />

              <span className={styles.coreTop}>
                DEVOPS CORE
              </span>

              <strong>
                long@portfolio
              </strong>

              <span className={styles.coreOnline}>
                <i />
                STACK ONLINE
              </span>
            </div>
          </>
        )}


        <div className={styles.grid}>
          {skillCategories.map(
            (category, index) => (
              <SkillCard
                key={category.label}
                category={category}
                index={index}
              />
            )
          )}
        </div>
      </div>
    </Section>
  )
}
