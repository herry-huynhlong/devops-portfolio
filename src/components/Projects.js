'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from './ui/Icons'
import Section, { SectionHeader } from './ui/Section'
import { useProjects } from '@/lib/content-context'
import styles from './Projects.module.css'
import { cn } from '@/lib/utils'


function buildArchitecture(project) {
  const tech = project.tech || []

  const haystack = [
    project.title || '',
    project.description || '',
    ...tech,
  ]
    .join(' ')
    .toLowerCase()

  const nodes = []

  const add = (label) => {
    if (!nodes.includes(label)) {
      nodes.push(label)
    }
  }


  /*
   * Tự suy ra kiến trúc từ tech/project.
   * Không hard-code riêng từng project.
   */

  if (
    /gitlab|github actions|jenkins|ci\/cd|cicd|pipeline/.test(
      haystack
    )
  ) {
    add('SOURCE')
    add('CI/CD')
  }


  if (
    /dns|firewall|route|gateway|load balancer/.test(
      haystack
    )
  ) {
    add('EDGE')
  }


  if (
    /nginx|apache|proxy/.test(
      haystack
    )
  ) {
    add('PROXY')
  }


  if (
    /docker|container|kubernetes|k8s/.test(
      haystack
    )
  ) {
    add('RUNTIME')
  }


  if (
    /linux|ubuntu|server|ec2|aws/.test(
      haystack
    )
  ) {
    add('HOST')
  }


  if (
    /erp|application|website|web app|service/.test(
      haystack
    )
  ) {
    add('APP')
  }


  if (
    /database|mysql|postgres|sql|backup|s3|storage/.test(
      haystack
    )
  ) {
    add('DATA')
  }


  /*
   * Nếu project không match các nhóm trên,
   * sử dụng chính technology từ admin.
   */
  if (nodes.length < 3) {
    tech.slice(0, 5).forEach((item) => {
      add(String(item).toUpperCase())
    })
  }


  /*
   * Đảm bảo diagram không quá trống.
   */
  if (nodes.length === 0) {
    add('SOURCE')
    add('SERVICE')
    add('DELIVERY')
  }

  if (nodes.length === 1) {
    add('SERVICE')
    add('DELIVERY')
  }

  if (nodes.length === 2) {
    add('DELIVERY')
  }


  return nodes.slice(0, 5)
}


export default function Projects() {
  const projects = useProjects()

  const stageRef = useRef(null)

  const [visible, setVisible] =
    useState(false)


  useEffect(() => {
    const node = stageRef.current

    if (!node) return

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        },
        {
          threshold: 0.13,
        }
      )

    observer.observe(node)

    return () =>
      observer.disconnect()
  }, [])


  if (!projects?.length) {
    return null
  }


  return (
    <Section id="projects">

      <SectionHeader>
        <h2>Projects</h2>
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


        <div className={styles.grid}>

          {projects.map((project, i) => {

            const architecture =
              buildArchitecture(project)

            return (
              <article
                className={styles.card}
                key={i}
                style={{
                  '--card-delay':
                    `${i * 140}ms`,
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


                {/* HEADER */}
                <div className={styles.cardHeader}>

                  <div className={styles.projectNode}>
                    <span className={styles.nodeDot} />

                    PROJECT-
                    {String(i + 1).padStart(2, '0')}
                  </div>


                  <div className={styles.projectState}>
                    <i />

                    ARCHITECTURE READY
                  </div>

                </div>


                <div className={styles.cardBody}>

                  {/* TITLE */}
                  <div className={styles.titleBlock}>

                    <span className={styles.projectLabel}>
                      infrastructure.project
                    </span>

                    <h3 className={styles.title}>
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className={styles.description}>
                        {project.description}
                      </p>
                    )}

                  </div>


                  {/* TECH STACK */}
                  {project.tech?.length > 0 && (
                    <div className={styles.stackSection}>

                      <div className={styles.sectionLabel}>
                        <span>
                          ACTIVE STACK
                        </span>

                        <span>
                          {project.tech.length}{' '}
                          {project.tech.length === 1
                            ? 'SERVICE'
                            : 'SERVICES'}
                        </span>
                      </div>


                      <div className={styles.techs}>

                        {project.tech.map(
                          (tech, techIndex) => (
                            <span
                              className={styles.tech}
                              key={`${tech}-${techIndex}`}
                              style={{
                                '--tech-delay':
                                  `${
                                    480 +
                                    i * 80 +
                                    techIndex * 65
                                  }ms`,
                              }}
                            >
                              <i />

                              {tech}
                            </span>
                          )
                        )}

                      </div>

                    </div>
                  )}


                  {/* ARCHITECTURE */}
                  <div className={styles.architecture}>

                    <div className={styles.sectionLabel}>
                      <span>
                        ARCHITECTURE MAP
                      </span>

                      <span className={styles.archState}>
                        <i />
                        ROUTE ACTIVE
                      </span>
                    </div>


                    <div className={styles.architectureFlow}>

                      {architecture.map(
                        (node, nodeIndex) => (
                          <div
                            className={styles.flowGroup}
                            key={`${node}-${nodeIndex}`}
                          >
                            <div className={styles.archNode}>

                              <span
                                className={
                                  styles.archNodeStatus
                                }
                              />

                              <span>
                                {node}
                              </span>

                            </div>


                            {nodeIndex <
                              architecture.length - 1 && (
                              <div
                                className={
                                  styles.connector
                                }
                              >
                                <span
                                  className={
                                    styles.connectorLine
                                  }
                                />

                                <i
                                  className={
                                    styles.packet
                                  }
                                />

                                <span
                                  className={
                                    styles.connectorArrow
                                  }
                                >
                                  ›
                                </span>
                              </div>
                            )}

                          </div>
                        )
                      )}

                    </div>

                  </div>


                  {/* DEPLOYMENT LOG */}
                  {project.features?.length > 0 && (
                    <div className={styles.logSection}>

                      <div className={styles.sectionLabel}>
                        <span>
                          DELIVERY LOG
                        </span>

                        <span>
                          {project.features.length} TASKS
                        </span>
                      </div>


                      <ul className={styles.features}>

                        {project.features.map(
                          (feature, j) => (
                            <li
                              key={j}
                              style={{
                                '--feature-delay':
                                  `${
                                    650 +
                                    i * 100 +
                                    j * 90
                                  }ms`,
                              }}
                            >

                              <span className={styles.ok}>
                                OK
                              </span>

                              <span
                                className={
                                  styles.featureText
                                }
                              >
                                {feature}
                              </span>

                              <span
                                className={
                                  styles.featureCheck
                                }
                              >
                                ✓
                              </span>

                            </li>
                          )
                        )}

                      </ul>

                    </div>
                  )}


                  {/* METRICS */}
                  <div className={styles.metrics}>

                    <div>
                      <span>
                        architecture
                      </span>

                      <strong>
                        VALID
                      </strong>
                    </div>


                    <div>
                      <span>
                        services
                      </span>

                      <strong>
                        {project.tech?.length || 0}
                      </strong>
                    </div>


                    <div>
                      <span>
                        tasks
                      </span>

                      <strong>
                        {project.features?.length || 0}
                      </strong>
                    </div>

                  </div>

                </div>


                {/* FOOTER */}
                <div className={styles.footer}>

                  <div className={styles.footerPath}>
                    project://
                    {String(i + 1).padStart(2, '0')}
                  </div>


                  <div
                    className={styles.activity}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>


                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      VIEW SOURCE

                      <ExternalLink
                        className={
                          styles.linkIcon
                        }
                      />
                    </a>
                  ) : (
                    <span
                      className={
                        styles.footerStatus
                      }
                    >
                      CONFIG LOADED
                    </span>
                  )}

                </div>

              </article>
            )
          })}

        </div>

      </div>

    </Section>
  )
}
