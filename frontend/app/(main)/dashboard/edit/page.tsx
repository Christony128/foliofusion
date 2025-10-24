"use client";
import { useEffect, useState } from "react";
import "./edit.css";
import {
  addSocial,
  addSkill,
  addProject,
  addExperience,
  addEducation,
  addAchievement,
  addCustomSection,
  getCustomSections,
} from "./edithelpers";
import {
  deleteSocial,
  deleteSkill,
  deleteProject,
  deleteExperience,
  deleteEducation,
  deleteAchievement,
  deleteCustomSection,
} from "./edithelpers";

export default function Edit() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [customSections, setCustomSections] = useState<any[]>([]);

  const [showAddSocial, setShowAddSocial] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddCustom, setShowAddCustom] = useState(false);

  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });
  const [newSkill, setNewSkill] = useState({ skill_name: "" });
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech_stack: "",
    project_url: "",
    repo_url: "",
  });
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    start_year: "",
    end_year: "",
  });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [newCustom, setNewCustom] = useState({
    title: "",
    content: "",
  });
  const [editProfile, setEditProfile] = useState({
    email: "",
    biodata: "",
    theme: ""
  });
  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return;
    setToken(t);

    const fetchAllData = async () => {
      try {
        const headers = { Authorization: `Bearer ${t}` };
        const responses = await Promise.all([
          fetch("http://localhost:1100/api/users/me", { headers }),
          fetch("http://localhost:1100/api/fields/socials", { headers }),
          fetch("http://localhost:1100/api/fields/skills", { headers }),
          fetch("http://localhost:1100/api/fields/projects", { headers }),
          fetch("http://localhost:1100/api/fields/experience", { headers }),
          fetch("http://localhost:1100/api/fields/education", { headers }),
          fetch("http://localhost:1100/api/fields/achievements", { headers }),
        ]);
        if (!responses[0].ok) throw new Error("User fetch failed");
        const [
          userData,
          socialsData,
          skillsData,
          projectsData,
          experienceData,
          educationData,
          achievementsData,
        ] = await Promise.all(responses.map((res) => res.json()));
        setUser(userData);
        setEditProfile({
          email: userData.email || "",
          biodata: userData.biodata || "",
          theme:userData.theme || "1"
        });
        setSocials(socialsData);
        setSkills(skillsData);
        setProjects(projectsData);
        setExperience(experienceData);
        setEducation(educationData);
        setAchievements(achievementsData);
        await getCustomSections(t, setCustomSections);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchAllData();
  }, []);
  
  
  const updateProfile = async (updatedData?:any) => {
    if (!token) return;
    const newData=updatedData || editProfile
    console.log("Sending to server:", newData);
    try {
      const response = await fetch("http://localhost:1100/api/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setShowEditProfile(false);
        console.log("Updated profile");
      } else {
        console.log("Could not update profile")
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="resume-editor">
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-editor">
      {editProfile && <div className="themeSelect">
      <input type="radio" name="theme" onChange={()=>{const updated={...editProfile,theme:'1'};setEditProfile(updated);updateProfile(updated)}} checked={editProfile.theme==='1'} />
      <input type="radio" name="theme" onChange={()=>{const updated={...editProfile,theme:'2'};setEditProfile(updated);updateProfile(updated)}} checked={editProfile.theme==='2'}/>
      <input type="radio" name="theme" onChange={()=>{const updated={...editProfile,theme:'3'};setEditProfile(updated);updateProfile(updated)}} checked={editProfile.theme==='3'}/>
      <input type="radio" name="theme" onChange={()=>{const updated={...editProfile,theme:'4'};setEditProfile(updated);updateProfile(updated)}} checked={editProfile.theme==='4'}/>
      </div>}
      <div className="resume-container">
        <table className="resume-table">
          <tbody>
            <tr>
              <td colSpan={2} className="header-cell">
                <h1>Portfolio Editor</h1>
                <div className="user-info">
                  <span>Welcome, {user.username}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="label-cell">
                <strong>Profile</strong>
              </td>
              <td className="content-cell">
                <div className="info-section">
                  <div className="profile-info">
                    <div className="profile-field">
                      <div className="field-label">Email</div>
                      <div className="field-value">{user.email}</div>
                    </div>
                    <div className="profile-field bio-field">
                      <div className="field-label">Bio</div>
                      <div className="field-value bio-content">
                        {user.biodata || "No bio added yet"}
                      </div>
                    </div>
                  </div>
                  <button
                    className="section-add-btn"
                    onClick={() => setShowEditProfile(!showEditProfile)}
                  >
                    {showEditProfile ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
                {showEditProfile && (
                  <div className="add-form">
                    <input
                      placeholder="Email"
                      value={editProfile.email}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          email: e.target.value,
                        })
                      }
                      className="form-input"
                    />
                    <textarea
                      placeholder="Bio"
                      value={editProfile.biodata}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          biodata: e.target.value,
                        })
                      }
                      className="form-textarea"
                      rows={4}
                    />
                    <button className="save-btn" onClick={()=>updateProfile(editProfile)}>
                      Update Profile
                    </button>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="label-cell">
                <strong>Social Links</strong>
              </td>
              <td className="content-cell">
                <div className="info-section">
                  <button
                    className="section-add-btn"
                    onClick={() => setShowAddSocial(!showAddSocial)}
                  >
                    {showAddSocial ? "Cancel" : "+ Social"}
                  </button>
                </div>

                {showAddSocial && (
                  <div className="add-form">
                    <input
                      placeholder="Platform"
                      value={newSocial.platform}
                      onChange={(e) =>
                        setNewSocial({ ...newSocial, platform: e.target.value })
                      }
                      className="form-input"
                    />
                    <input
                      placeholder="URL"
                      value={newSocial.url}
                      onChange={(e) =>
                        setNewSocial({ ...newSocial, url: e.target.value })
                      }
                      className="form-input"
                    />
                    <button
                      className="save-btn"
                      onClick={() =>
                        addSocial(
                          token,
                          newSocial,
                          setSocials,
                          setShowAddSocial,
                          socials,
                          setNewSocial
                        )
                      }
                    >
                      Save Social
                    </button>
                  </div>
                )}

                <div className="socials-list">
                  {socials.map((social) => (
                    <div key={social.id} className="social-item">
                      <div className="item-with-action">
                        <div className="social-info">
                          <strong>{social.platform}:</strong>
                          <span className="url">{social.url}</span>
                        </div>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteSocial(social.id, token, socials, setSocials)
                          }
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td className="label-cell">
                <strong>Skills</strong>
              </td>
              <td className="content-cell">
                <div className="skills-section">
                  <div className="section-header">
                    <div className="skills-list">
                      {skills.map((skill) => (
                        <span key={skill.id} className="skill-item">
                          {skill.skill_name}
                          <button
                            className="delete-btn small"
                            onClick={() =>
                              deleteSkill(skill.id, token, skills, setSkills)
                            }
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
                        onChange={(e) =>
                          setNewSkill({
                            ...newSkill,
                            skill_name: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                      <button
                        className="save-btn"
                        onClick={() =>
                          addSkill(
                            token,
                            newSkill,
                            setSkills,
                            setShowAddSkill,
                            skills,
                            setNewSkill
                          )
                        }
                      >
                        Save Skill
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
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
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            title: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                      <textarea
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                        }
                        className="form-textarea"
                      />
                      <input
                        placeholder="Tech Stack"
                        value={newProject.tech_stack}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            tech_stack: e.target.value,
                          })
                        }
                        className="form-input"
                      />
                      <div className="form-row">
                        <input
                          placeholder="Project URL"
                          value={newProject.project_url}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              project_url: e.target.value,
                            })
                          }
                          className="form-input"
                        />
                        <input
                          placeholder="Repo URL"
                          value={newProject.repo_url}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              repo_url: e.target.value,
                            })
                          }
                          className="form-input"
                        />
                      </div>
                      <button
                        className="save-btn"
                        onClick={() =>
                          addProject(
                            token,
                            newProject,
                            setProjects,
                            setShowAddProject,
                            projects,
                            setNewProject
                          )
                        }
                      >
                        Save Project
                      </button>
                    </div>
                  )}

                  {projects.map((project) => (
                    <div key={project.id} className="project-item">
                      <div className="project-header">
                        <strong>{project.title}</strong>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteProject(
                              project.id,
                              token,
                              projects,
                              setProjects
                            )
                          }
                        >
                          ×
                        </button>
                      </div>
                      <div className="project-description">
                        {project.description}
                      </div>
                      <div className="project-details">
                        <span>
                          <strong>Tech Stack:</strong> {project.tech_stack}
                        </span>
                        <div className="project-urls">
                          <span>
                            <strong>Project URL:</strong>{" "}
                            {project.project_url || "Not provided"}
                          </span>
                          <span>
                            <strong>Repo URL:</strong>{" "}
                            {project.repo_url || "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
              onChange={(e) =>
                setNewExperience({ ...newExperience, role: e.target.value })
              }
              className="form-input"
            />
            <input
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
              className="form-input"
            />
            <div className="form-row">
              <input
                placeholder="Start Date"
                value={newExperience.start_date}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    start_date: e.target.value,
                  })
                }
                className="form-input"
              />
              <input
                placeholder="End Date"
                value={newExperience.end_date}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    end_date: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <textarea
              placeholder="Description"
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              className="form-textarea"
            />
            <button
              className="save-btn"
              onClick={() =>
                addExperience(
                  token,
                  newExperience,
                  setExperience,
                  setShowAddExperience,
                  experience,
                  setNewExperience
                )
              }
            >
              Save Experience
            </button>
          </div>
        )}

        <div className="experience-list">
          {experience.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="experience-header">
                <span>
                  Worked as <strong>{exp.role}</strong> at{" "}
                  <strong>{exp.company}</strong> ({exp.start_date}-
                  {exp.end_date})
                </span>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteExperience(exp.id, token, experience, setExperience)
                  }
                >
                  ×
                </button>
              </div>
              {exp.description && (
                <div className="experience-description">{exp.description}</div>
              )}
            </div>
          ))}
        </div>
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
              onChange={(e) =>
                setNewEducation({
                  ...newEducation,
                  institution: e.target.value,
                })
              }
              className="form-input"
            />
            <input
              placeholder="Degree"
              value={newEducation.degree}
              onChange={(e) =>
                setNewEducation({ ...newEducation, degree: e.target.value })
              }
              className="form-input"
            />
            <div className="form-row">
              <input
                placeholder="Start Year"
                value={newEducation.start_year}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    start_year: e.target.value,
                  })
                }
                className="form-input"
              />
              <input
                placeholder="End Year"
                value={newEducation.end_year}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, end_year: e.target.value })
                }
                className="form-input"
              />
            </div>
            <button
              className="save-btn"
              onClick={() =>
                addEducation(
                  token,
                  newEducation,
                  setEducation,
                  setShowAddEducation,
                  education,
                  setNewEducation
                )
              }
            >
              Save Education
            </button>
          </div>
        )}

        <div className="education-list">
          {education.map((edu) => (
            <div key={edu.id} className="education-item">
              <div className="education-header">
                <span>
                  <strong>{edu.degree}</strong> - {edu.institution} (
                  {edu.start_year}-{edu.end_year})
                </span>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteEducation(edu.id, token, education, setEducation)
                  }
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
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
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, title: e.target.value })
              }
              className="form-input"
            />
            <input
              placeholder="Description"
              value={newAchievement.description}
              onChange={(e) =>
                setNewAchievement({
                  ...newAchievement,
                  description: e.target.value,
                })
              }
              className="form-input"
            />
            <input
              placeholder="Date"
              value={newAchievement.date}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, date: e.target.value })
              }
              className="form-input"
            />
            <button
              className="save-btn"
              onClick={() =>
                addAchievement(
                  token,
                  newAchievement,
                  setAchievements,
                  setShowAddAchievement,
                  achievements,
                  setNewAchievement
                )
              }
            >
              Save Achievement
            </button>
          </div>
        )}

        <div className="achievements-list">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-item">
              <div className="achievement-header">
                <span>
                  <strong>{achievement.title}</strong> ({achievement.date}) -{" "}
                  {achievement.description}
                </span>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteAchievement(
                      achievement.id,
                      token,
                      achievements,
                      setAchievements
                    )
                  }
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="section-divider">
          <h2>Custom Sections</h2>
          <button
            className="section-add-btn"
            onClick={() => setShowAddCustom(!showAddCustom)}
          >
            {showAddCustom ? "Cancel" : "+ Custom Section"}
          </button>
        </div>

        {showAddCustom && (
          <div className="add-form full-width">
            <input
              placeholder="Section Name (e.g., Publications, Awards, Hobbies)"
              value={newCustom.title}
              onChange={(e) =>
                setNewCustom({ ...newCustom, title: e.target.value })
              }
              className="form-input"
            />
            <textarea
              placeholder="Section Content - Write anything you want here..."
              value={newCustom.content}
              onChange={(e) =>
                setNewCustom({ ...newCustom, content: e.target.value })
              }
              className="form-textarea"
              rows={4}
            />
            <button
              className="save-btn"
              onClick={() =>
                addCustomSection(
                  token,
                  newCustom,
                  setCustomSections,
                  setShowAddCustom,
                  customSections,
                  setNewCustom
                )
              }
            >
              Save Custom Section
            </button>
          </div>
        )}

        <div className="custom-sections-list">
          {customSections.map((section) => (
            <div key={section.id} className="custom-section-item">
              <div className="custom-section-header">
                <strong>{section.title}</strong>
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteCustomSection(
                      section.id,
                      token,
                      customSections,
                      setCustomSections
                    )
                  }
                >
                  ×
                </button>
              </div>
              <div className="custom-section-description">
                {section.content?.text || section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
