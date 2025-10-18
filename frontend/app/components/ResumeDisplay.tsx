"use client";
import './ResumeDisplay.css'
interface User {
  id: string;
  username: string;
  email: string;
}

interface Social { id: string; platform: string; url: string; }
interface Skill { id: string; skill_name: string; }
interface Project { id: string; title: string; description: string; tech_stack: string; project_url?: string; repo_url?: string; }
interface Experience { id: string; role: string; company: string; start_date: string; end_date?: string; description?: string; }
interface Education { id: string; degree: string; institution: string; start_year: string; end_year: string; }
interface Achievement { id: string; title: string; description: string; date: string; }

interface Props {
  user: User;
  socials: Social[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
}

export default function ResumeDisplay({ user, socials, skills, projects, experience, education, achievements }: Props) {
  const displayUrl = (url: string | undefined) => {
    if (!url) return 'N/A';
    return url.replace(/^https?:\/\//, '');
  };

  return (
    <div className="resume-page">
      <div className="resume-container">
        <header className="resume-header">
          <div className="resume-personal">
            <h1>{user.username}</h1>
            <p className="resume-email">{user.email}</p>
          </div>
          
          {/* Contact Info */}
          <div className="resume-contact">
            {socials && socials.length > 0 && (
              <div className="contact-links">
                {socials.map((social) => (
                  <div key={social.id} className="contact-item">
                    <strong>{social.platform}:</strong>
                    <a href={social.url || '#'} target="_blank" rel="noopener noreferrer">
                      {displayUrl(social.url)}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="resume-body">
          <div className="resume-sidebar">
            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <section className="resume-section">
                <h2>Skills</h2>
                <div className="skills-list">
                  {skills.map((skill) => (
                    <div key={skill.id} className="skill-item">
                      {skill.skill_name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education && education.length > 0 && (
              <section className="resume-section">
                <h2>Education</h2>
                <div className="education-list">
                  {education.map((edu) => (
                    <div key={edu.id} className="education-item">
                      <h3>{edu.degree}</h3>
                      <div className="education-institution">{edu.institution}</div>
                      <div className="education-dates">
                        {edu.start_year} - {edu.end_year}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements Section */}
            {achievements && achievements.length > 0 && (
              <section className="resume-section">
                <h2>Achievements</h2>
                <div className="achievements-list">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-item">
                      <h3>{achievement.title}</h3>
                      <div className="achievement-date">{achievement.date}</div>
                      <p>{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="resume-main">
            {/* Experience Section */}
            {experience && experience.length > 0 && (
              <section className="resume-section">
                <h2>Work Experience</h2>
                <div className="experience-list">
                  {experience.map((exp) => (
                    <div key={exp.id} className="experience-item">
                      <div className="experience-header">
                        <div className="experience-title">
                          <h3>{exp.role}</h3>
                          <span className="experience-company">{exp.company}</span>
                        </div>
                        <div className="experience-dates">
                          {exp.start_date} - {exp.end_date || 'Present'}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="experience-description">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects && projects.length > 0 && (
              <section className="resume-section">
                <h2>Projects</h2>
                <div className="projects-list">
                  {projects.map((project) => (
                    <div key={project.id} className="project-item">
                      <div className="project-header">
                        <div className="project-title">
                          <h3>{project.title}</h3>
                          {project.tech_stack && (
                            <span className="project-tech">{project.tech_stack}</span>
                          )}
                        </div>
                        <div className="project-links">
                          {project.project_url && (
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                              Live Demo
                            </a>
                          )}
                          {project.repo_url && (
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="project-description">{project.description}</p>
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