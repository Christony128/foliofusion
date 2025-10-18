"use client";
import { useEffect, useState } from "react";
import './edit.css'
import {addSocial,addSkill,addProject,addExperience,addEducation,addAchievement} from './edithelpers'
import {deleteSocial,deleteSkill,deleteProject,deleteExperience,deleteEducation,deleteAchievement} from './edithelpers'
export default function Edit() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [showAddSocial, setShowAddSocial] = useState<boolean>(false);
  const [showAddSkill, setShowAddSkill] = useState<boolean>(false);
  const [showAddProject, setShowAddProject] = useState<boolean>(false);
  const [showAddExperience, setShowAddExperience] = useState<boolean>(false);
  const [showAddEducation, setShowAddEducation] = useState<boolean>(false);
  const [showAddAchievement, setShowAddAchievement] = useState<boolean>(false);
  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });
  const [newSkill, setNewSkill] = useState({ skill_name: "" });
  const [newProject, setNewProject] = useState({ 
    title: "", description: "", tech_stack: "", project_url: "", repo_url: "" 
  });
  const [newExperience, setNewExperience] = useState({ 
    role: "", company: "", start_date: "", end_date: "", description: "" 
  });
  const [newEducation, setNewEducation] = useState({ 
    institution: "", degree: "", start_year: "", end_year: "" 
  });
  const [newAchievement, setNewAchievement] = useState({ 
    title: "", description: "", date: "" 
  });

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return;
    setToken(t);

    const fetchAll = async () => {
      try {
        const headers = { Authorization: `Bearer ${t}` };

        const [
          userRes,
          socialsRes,
          skillsRes,
          projectsRes,
          experienceRes,
          educationRes,
          achievementsRes,
        ] = await Promise.all([
          fetch("http://localhost:1100/api/users/me", { headers }),
          fetch("http://localhost:1100/api/fields/socials", { headers }),
          fetch("http://localhost:1100/api/fields/skills", { headers }),
          fetch("http://localhost:1100/api/fields/projects", { headers }),
          fetch("http://localhost:1100/api/fields/experience", { headers }),
          fetch("http://localhost:1100/api/fields/education", { headers }),
          fetch("http://localhost:1100/api/fields/achievements", { headers }),
        ]);

        if (!userRes.ok) throw new Error("User fetch failed");

        const [
          userData,
          socialsData,
          skillsData,
          projectsData,
          experienceData,
          educationData,
          achievementsData,
        ] = await Promise.all([
          userRes.json(),
          socialsRes.json(),
          skillsRes.json(),
          projectsRes.json(),
          experienceRes.json(),
          educationRes.json(),
          achievementsRes.json(),
        ]);
        setUser(userData);
        const id=userData.id
        setSocials(socialsData);
        setSkills(skillsData);
        setProjects(projectsData);
        setExperience(experienceData);
        setEducation(educationData);
        setAchievements(achievementsData);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchAll();
  }, []);
  

  if (!user) return <p>Loading...</p>;

  return (
    <div className="resume-editor">
      <div className="resume-container">
        <table className="resume-table">
          <tbody>
            <tr>
              <td colSpan={2} className="header-cell">
                <h1>Resume Editor</h1>
                <div className="user-info">
                  <span>Welcome, {user.username}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </td>
            </tr>

            <tr>
              <td className="label-cell">
                <strong>Name</strong>
              </td>
              <td className="content-cell">
                <div className="info-section">
                  <div className="info-item">
                    <span>{user.username}</span>
                    <button 
                      className="section-add-btn"
                      onClick={() => setShowAddSocial(!showAddSocial)}
                    >
                      {showAddSocial ? "Cancel" : "+ Social"}
                    </button>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="label-cell">
                <strong>Email</strong>
              </td>
              <td className="content-cell">
                <div className="info-section">
                  <span>{user.email}</span>
                </div>
              </td>
            </tr>

            {/* Socials Section */}
            {showAddSocial && (
              <tr>
                <td colSpan={2} className="form-cell">
                  <div className="add-form">
                    <input
                      placeholder="Platform"
                      value={newSocial.platform}
                      onChange={(e) => setNewSocial({...newSocial, platform: e.target.value})}
                      className="form-input"
                    />
                    <input
                      placeholder="URL"
                      value={newSocial.url}
                      onChange={(e) => setNewSocial({...newSocial, url: e.target.value})}
                      className="form-input"
                    />
                    <button className="save-btn" onClick={()=>addSocial(token,newSocial,setSocials,setShowAddSocial,socials,setNewSocial)}>
                      Save Social
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {socials.map((s) => (
              <tr key={s.id}>
                <td className="label-cell">
                  <strong>{s.platform}:</strong>
                </td>
                <td className="content-cell">
                  <div className="item-with-action">
                    <span className="url">{s.url}</span>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteSocial(s.id,token,socials,setSocials)}
                    >
                      ×
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Skills Section */}
            <tr>
              <td className="label-cell">
                <strong>Skills</strong>
              </td>
              <td className="content-cell">
                <div className="skills-section">
                  <div className="section-header">
                    <div className="skills-list">
                      {skills.map((s) => (
                        <span key={s.id} className="skill-item">
                          {s.skill_name}
                          <button 
                            className="delete-btn small"
                            onClick={() => deleteSkill(s.id,token,skills,setSkills)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <button 
                      className="section-add-btn"
                      onClick={() => setShowAddSkill(!showAddSkill)}
                    >
                      {showAddSkill ? "Cancel" : "+ Skill"}
                    </button>
                  </div>
                  
                  {showAddSkill && (
                    <div className="add-form">
                      <input
                        placeholder="Skill Name"
                        value={newSkill.skill_name}
                        onChange={(e) => setNewSkill({...newSkill, skill_name: e.target.value})}
                        className="form-input"
                      />
                      <button className="save-btn" onClick={()=>addSkill(token,newSkill,setSkills,setShowAddSkill,skills,setNewSkill)}>
                        Save Skill
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>

            {/* Projects Section */}
            <tr>
              <td className="label-cell">
                <strong>Projects</strong>
              </td>
              <td className="content-cell">
                <div className="projects-section">
                  <div className="section-header">
                    <button 
                      className="section-add-btn"
                      onClick={() => setShowAddProject(!showAddProject)}
                    >
                      {showAddProject ? "Cancel" : "+ Project"}
                    </button>
                  </div>

                  {showAddProject && (
                    <div className="add-form">
                      <input
                        placeholder="Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="form-input"
                      />
                      <textarea
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="form-textarea"
                      />
                      <input
                        placeholder="Tech Stack"
                        value={newProject.tech_stack}
                        onChange={(e) => setNewProject({...newProject, tech_stack: e.target.value})}
                        className="form-input"
                      />
                      <div className="form-row">
                        <input
                          placeholder="Project URL"
                          value={newProject.project_url}
                          onChange={(e) => setNewProject({...newProject, project_url: e.target.value})}
                          className="form-input"
                        />
                        <input
                          placeholder="Repo URL"
                          value={newProject.repo_url}
                          onChange={(e) => setNewProject({...newProject, repo_url: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <button className="save-btn" onClick={()=>addProject(token,newProject,setProjects,setShowAddProject,projects,setNewProject)}>
                        Save Project
                      </button>
                    </div>
                  )}

                  {projects.map((p) => (
                    <div key={p.id} className="project-item">
                      <div className="project-header">
                        <strong>{p.title}</strong>
                        <button 
                          className="delete-btn"
                          onClick={() => deleteProject(p.id,token,projects,setProjects)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="project-description">{p.description}</div>
                      <div className="project-details">
                        <span><strong>Tech Stack:</strong> {p.tech_stack}</span>
                        <div className="project-urls">
                          <span><strong>Project URL:</strong> {p.project_url}</span>
                          <span><strong>Repo URL:</strong> {p.repo_url}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Experiences Section */}
        <div className="section-divider">
          <h2>Experiences</h2>
          <button 
            className="section-add-btn"
            onClick={() => setShowAddExperience(!showAddExperience)}
          >
            {showAddExperience ? "Cancel" : "+ Experience"}
          </button>
        </div>

        {showAddExperience && (
          <div className="add-form full-width">
            <input
              placeholder="Role"
              value={newExperience.role}
              onChange={(e) => setNewExperience({...newExperience, role: e.target.value})}
              className="form-input"
            />
            <input
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
              className="form-input"
            />
            <div className="form-row">
              <input
                placeholder="Start Date"
                value={newExperience.start_date}
                onChange={(e) => setNewExperience({...newExperience, start_date: e.target.value})}
                className="form-input"
              />
              <input
                placeholder="End Date"
                value={newExperience.end_date}
                onChange={(e) => setNewExperience({...newExperience, end_date: e.target.value})}
                className="form-input"
              />
            </div>
            <textarea
              placeholder="Description"
              value={newExperience.description}
              onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
              className="form-textarea"
            />
            <button className="save-btn" onClick={()=>addExperience(token,newExperience,setExperience,setShowAddExperience,experience,setNewExperience)}>
              Save Experience
            </button>
          </div>
        )}

        <div className="experience-list">
          {experience.map((e) => (
            <div key={e.id} className="experience-item">
              <div className="experience-header">
                <span>Worked as <strong>{e.role}</strong> at <strong>{e.company}</strong> ({e.start_date}-{e.end_date})</span>
                <button 
                  className="delete-btn"
                  onClick={() => deleteExperience(e.id,token,experience,setExperience)}
                >
                  ×
                </button>
              </div>
              {e.description && <div className="experience-description">{e.description}</div>}
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="section-divider">
          <h2>Education</h2>
          <button 
            className="section-add-btn"
            onClick={() => setShowAddEducation(!showAddEducation)}
          >
            {showAddEducation ? "Cancel" : "+ Education"}
          </button>
        </div>

        {showAddEducation && (
          <div className="add-form full-width">
            <input
              placeholder="Institution"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
              className="form-input"
            />
            <input
              placeholder="Degree"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
              className="form-input"
            />
            <div className="form-row">
              <input
                placeholder="Start Year"
                value={newEducation.start_year}
                onChange={(e) => setNewEducation({...newEducation, start_year: e.target.value})}
                className="form-input"
              />
              <input
                placeholder="End Year"
                value={newEducation.end_year}
                onChange={(e) => setNewEducation({...newEducation, end_year: e.target.value})}
                className="form-input"
              />
            </div>
            <button className="save-btn" onClick={()=>addEducation(token,newEducation,setEducation,setShowAddEducation,education,setNewEducation)}>
              Save Education
            </button>
          </div>
        )}

        <div className="education-list">
          {education.map((edu) => (
            <div key={edu.id} className="education-item">
              <div className="education-header">
                <span><strong>{edu.degree}</strong> - {edu.institution} ({edu.start_year}-{edu.end_year})</span>
                <button 
                  className="delete-btn"
                  onClick={() => deleteEducation(edu.id,token,education,setEducation)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="section-divider">
          <h2>Achievements</h2>
          <button 
            className="section-add-btn"
            onClick={() => setShowAddAchievement(!showAddAchievement)}
          >
            {showAddAchievement ? "Cancel" : "+ Achievement"}
          </button>
        </div>

        {showAddAchievement && (
          <div className="add-form full-width">
            <input
              placeholder="Title"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
              className="form-input"
            />
            <input
              placeholder="Description"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
              className="form-input"
            />
            <input
              placeholder="Date"
              value={newAchievement.date}
              onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
              className="form-input"
            />
            <button className="save-btn" onClick={()=>addAchievement(token,newAchievement,setAchievements,setShowAddAchievement,achievements,setNewAchievement)}>
              Save Achievement
            </button>
          </div>
        )}

        <div className="achievements-list">
          {achievements.map((a) => (
            <div key={a.id} className="achievement-item">
              <div className="achievement-header">
                <span><strong>{a.title}</strong> ({a.date}) - {a.description}</span>
                <button 
                  className="delete-btn"
                  onClick={() => deleteAchievement(a.id,token,achievements,setAchievements)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}