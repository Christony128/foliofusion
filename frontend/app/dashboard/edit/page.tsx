"use client";
import { useEffect, useState } from "react";

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
  const addSocial = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:1100/api/fields/socials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSocial),
      });
      
      if (!res.ok) {
        const error = await res.text();
        console.error("Add social failed:", error);
        return;
      }
      
      const added = await res.json();
      setSocials([...socials, added]);
      setNewSocial({ platform: "", url: "" });
      setShowAddSocial(false);
    } catch (err) {
      console.error("Add social error:", err);
    }
  };
  const addSkill = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:1100/api/fields/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSkill),
      });
      
      if (!res.ok) {
        const error = await res.text();
        console.error("Add skill failed:", error);
        return;
      }
      
      const added = await res.json();
      setSkills([...skills, added]);
      setNewSkill({ skill_name: "" });
      setShowAddSkill(false);
    } catch (err) {
      console.error("Add skill error:", err);
    }
  };

  const addProject = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:1100/api/fields/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });
      
      if (!res.ok) {
        const error = await res.text();
        console.error("Add project failed:", error);
        return;
      }
      
      const added = await res.json();
      setProjects([...projects, added]);
      setNewProject({ 
        title: "", description: "", tech_stack: "", project_url: "", repo_url: "" 
      });
      setShowAddProject(false);
    } catch (err) {
      console.error("Add project error:", err);
    }
  };

  const addExperience = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:1100/api/fields/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExperience),
      });
      
      if (!res.ok) {
        const error = await res.text();
        console.error("Add experience failed:", error);
        return;
      }
      
      const added = await res.json();
      setExperience([...experience, added]);
      setNewExperience({ role: "", company: "", start_date: "", end_date: "", description: "" });
      setShowAddExperience(false);
    } catch (err) {
      console.error("Add experience error:", err);
    }
  };

  const addEducation = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:1100/api/fields/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEducation),
      });
      
      if (!res.ok) {
        const error = await res.text();
        console.error("Add education failed:", error);
        return;
      }
      
      const added = await res.json();
      setEducation([...education, added]);
      setNewEducation({ institution: "", degree: "", start_year: "", end_year: "" });
      setShowAddEducation(false);
    } catch (err) {
      console.error("Add education error:", err);
    }
  };

  const addAchievement = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:1100/api/fields/achievements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAchievement),
      });
      
      if (!res.ok) {
        const error = await res.text();
        console.error("Add achievement failed:", error);
        return;
      }
      
      const added = await res.json();
      setAchievements([...achievements, added]);
      setNewAchievement({ title: "", description: "", date: "" });
      setShowAddAchievement(false);
    } catch (err) {
      console.error("Add achievement error:", err);
    }
  };
  const deleteSocial = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:1100/api/fields/socials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSocials(socials.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error("Delete social error:", err);
    }
  };

  const deleteSkill = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:1100/api/fields/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSkills(skills.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error("Delete skill error:", err);
    }
  };

  const deleteProject = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:1100/api/fields/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  const deleteExperience = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:1100/api/fields/experience/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setExperience(experience.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error("Delete experience error:", err);
    }
  };

  const deleteEducation = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:1100/api/fields/education/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEducation(education.filter(edu => edu.id !== id));
      }
    } catch (err) {
      console.error("Delete education error:", err);
    }
  };

  const deleteAchievement = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:1100/api/fields/achievements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setAchievements(achievements.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error("Delete achievement error:", err);
    }
  };

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
                    <button className="save-btn" onClick={addSocial}>
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
                      onClick={() => deleteSocial(s.id)}
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
                            onClick={() => deleteSkill(s.id)}
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
                      <button className="save-btn" onClick={addSkill}>
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
                      <button className="save-btn" onClick={addProject}>
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
                          onClick={() => deleteProject(p.id)}
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
            <button className="save-btn" onClick={addExperience}>
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
                  onClick={() => deleteExperience(e.id)}
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
            <button className="save-btn" onClick={addEducation}>
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
                  onClick={() => deleteEducation(edu.id)}
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
            <button className="save-btn" onClick={addAchievement}>
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
                  onClick={() => deleteAchievement(a.id)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .resume-editor {
          padding: 20px;
          background: white;
          font-family: Arial, sans-serif;
          color: #333;
        }

        .resume-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .resume-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        .resume-table td {
          border: 1px solid #ddd;
          padding: 12px;
          vertical-align: top;
        }

        .header-cell {
          background: #f5f5f5;
          text-align: center;
          border: 2px solid #333 !important;
        }

        .header-cell h1 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }

        .user-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 14px;
        }

        .user-email {
          font-weight: bold;
        }

        .label-cell {
          width: 120px;
          background: #f9f9f9;
          font-weight: bold;
          border-right: 2px solid #333;
        }

        .content-cell {
          background: white;
        }

        .form-cell {
          background: #f8f9fa;
          border: 1px dashed #ccc;
        }

        .info-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .url {
          color: #0066cc;
          word-break: break-all;
        }

        .skills-section {
          width: 100%;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          flex: 1;
        }

        .skill-item {
          background: #e9ecef;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .section-add-btn {
          background: #007acc;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          white-space: nowrap;
        }

        .section-add-btn:hover {
          background: #005a9e;
        }

        .add-form {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          margin: 10px 0;
          border: 1px dashed #ccc;
        }

        .full-width {
          width: 100%;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 8px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-textarea {
          min-height: 60px;
          resize: vertical;
          font-family: inherit;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .save-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .save-btn:hover {
          background: #218838;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
          border: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .delete-btn.small {
          width: 16px;
          height: 16px;
          font-size: 10px;
        }

        .delete-btn:hover {
          background: #c82333;
        }

        .project-item, .experience-item, .education-item, .achievement-item {
          border: 1px solid #e1e5e9;
          border-radius: 4px;
          padding: 12px;
          margin-bottom: 10px;
          background: #fafbfc;
        }

        .project-header, .experience-header, .education-header, .achievement-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .project-description {
          margin: 8px 0;
          color: #555;
          line-height: 1.4;
        }

        .project-details {
          font-size: 14px;
          color: #666;
        }

        .project-urls {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 4px;
        }

        .section-divider {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 30px 0 15px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #333;
        }

        .section-divider h2 {
          margin: 0;
          font-size: 18px;
        }

        .experience-list, .education-list, .achievements-list {
          space-y: 10px;
        }

        .experience-description {
          margin-top: 8px;
          color: #555;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .resume-table {
            font-size: 14px;
          }
          
          .label-cell {
            width: 100px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .user-info {
            flex-direction: column;
            gap: 5px;
          }
          
          .section-header {
            flex-direction: column;
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .resume-editor {
            padding: 10px;
          }
          
          .resume-table td {
            padding: 8px;
          }
          
          .label-cell {
            width: 80px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}