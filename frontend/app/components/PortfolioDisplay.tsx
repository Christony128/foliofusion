"use client";
import './PortfolioDisplay.css'

interface User {
  id: string;
  username: string;
  email: string;
  biodata?: string;
  theme?: string;
}

interface Social { id: string; platform: string; url: string; }
interface Skill { id: string; skill_name: string; }
interface Project { id: string; title: string; description: string; tech_stack: string; project_url?: string; repo_url?: string; }
interface Experience { id: string; role: string; company: string; start_date: string; end_date?: string; description?: string; }
interface Education { id: string; degree: string; institution: string; start_year: string; end_year: string; }
interface Achievement { id: string; title: string; description: string; date: string; }
interface CustomSection { id: string; title: string; content: any; }

interface Props {
  user: User;
  socials: Social[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
  custom: CustomSection[];
}

export default function PortfolioDisplay({ user, socials, skills, projects, experience, education, achievements, custom }: Props) {
  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      github: '⚡',
      linkedin: '💼',
      twitter: '🐦',
      website: '🌐',
      email: '📧',
      portfolio: '🎨',
      facebook: '👥',
      instagram: '📷',
      youtube: '🎥'
    };
    return icons[platform.toLowerCase()] || '🔗';
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        <section className="portfolio-hero">
          <div className="hero-content">
            <div className="hero-main">
              <h1>{user.username}</h1>
              {user.biodata && (
                <div className="hero-bio">
                  {user.biodata}
                </div>
              )}
            </div>
            
            <div className="hero-contact">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              
              {socials.map((social) => (
                <div key={social.id} className="contact-item">
                  <span className="contact-icon">{getPlatformIcon(social.platform)}</span>
                  <a href={social.url || '#'} target="_blank" rel="noopener noreferrer">
                    {social.platform}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="portfolio-body">
          <div className="portfolio-sidebar">
            {skills.length > 0 && (
              <section className="portfolio-section">
                <h2>Skills & Technologies</h2>
                <div className="skills-grid">
                  {skills.map((skill) => (
                    <div key={skill.id} className="skill-item">
                      {skill.skill_name}
                    </div>
                  ))}
                </div>
              </section>
            )}
            {education.length > 0 && (
              <section className="portfolio-section">
                <h2>Education</h2>
                <div className="education-list">
                  {education.map((edu) => (
                    <div key={edu.id} className="timeline-item">
                      <div className="timeline-content">
                        <h3 className="timeline-title">{edu.degree}</h3>
                        <div className="timeline-subtitle">{edu.institution}</div>
                        <div className="timeline-date">
                          {edu.start_year} - {edu.end_year}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {achievements.length > 0 && (
              <section className="portfolio-section">
                <h2>Achievements</h2>
                <div className="achievements-grid">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-card">
                      <h3 className="achievement-title">{achievement.title}</h3>
                      <div className="achievement-date">{achievement.date}</div>
                      <p className="achievement-description">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="portfolio-main">
            {projects.length > 0 && (
              <section className="portfolio-section">
                <h2>Featured Projects</h2>
                <div className="projects-grid">
                  {projects.map((project) => (
                    <div key={project.id} className="project-card">
                      <div className="project-image">
                        🚀
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        {project.tech_stack && (
                          <span className="project-tech">{project.tech_stack}</span>
                        )}
                        <p className="project-description">{project.description}</p>
                        <div className="project-links">
                          {project.project_url && (
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="project-link">
                              Live Demo
                            </a>
                          )}
                          {project.repo_url && (
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {experience.length > 0 && (
              <section className="portfolio-section">
                <h2>Professional Experience</h2>
                <div className="experience-list">
                  {experience.map((exp) => (
                    <div key={exp.id} className="timeline-item">
                      <div className="timeline-content">
                        <h3 className="timeline-title">{exp.role}</h3>
                        <div className="timeline-subtitle">{exp.company}</div>
                        <div className="timeline-date">
                          {exp.start_date} - {exp.end_date || 'Present'}
                        </div>
                        {exp.description && (
                          <p className="timeline-description">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {custom.length > 0 && (
              <section className="portfolio-section">
                <h2>Additional Information</h2>
                <div className="custom-sections-grid">
                  {custom.map((section) => (
                    <div key={section.id} className="custom-section-card">
                      <div className="custom-section-header">
                        <h3 className="custom-section-title">{section.title}</h3>
                      </div>
                      <div className="custom-section-content">
                        {section.content?.text || section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}