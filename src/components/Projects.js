'use client'

import { ExternalLink } from './ui/Icons'
import Section, { SectionHeader } from './ui/Section'
import { useProjects } from '@/lib/content-context'
import styles from './Projects.module.css'

export default function Projects() {
  const projects = useProjects()

  if (!projects?.length) return null

  return (
    <Section id="projects">

      <SectionHeader>
        <h2>Projects</h2>
      </SectionHeader>

      <div className={styles.grid}>

        {projects.map((project, i) => (
          <div className={styles.card} key={i}>

            <div className={styles.cardBody}>

              <h3 className={styles.title}>
                {project.title}
              </h3>

              <p className={styles.body}>
                {project.description}
              </p>

              {project.tech?.length > 0 && (
                <div className={styles.techs}>
                  {project.tech.map((tech) => (
                    <span
                      className={styles.tech}
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.features?.length > 0 && (
                <ul className={styles.features}>
                  {project.features.map((feature, j) => (
                    <li key={j}>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {project.github && (
                <div className={styles.footer}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <ExternalLink
                      className={styles.linkIcon}
                    />

                    View on GitHub
                  </a>
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

    </Section>
  )
}
