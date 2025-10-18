

export const addSocial = async (token:string | null,newSocial:any,setSocials:any,setShowAddSocial:any,socials:any[],setNewSocial:any) => {
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
export const addSkill = async (token: string | null,newSkill:any,setSkills:any,setShowAddSkill:any,skills:any[],setNewSkill:any) => {
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

  export const addProject = async (token:string|null,newProject:any,setProjects:any,setShowAddProject:any,projects:any[],setNewProject:any) => {
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

  export const addExperience = async (token:string|null,newExperience:any,setExperience:any,setShowAddExperience:any,experience:any[],setNewExperience:any) => {
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

  export const addEducation = async (token:string|null,newEducation:any,setEducation:any,setShowAddEducation:any,education:any[],setNewEducation:any) => {
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

  export const addAchievement = async (token: string|null,newAchievement:any,setAchievements:any,setShowAddAchievement:any,achievements:any,setNewAchievement:any) => {
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
  export const deleteSocial = async (id: string,token:string|null,socials:any[],setSocials:any) => {
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

  export const deleteSkill = async (id: string,token:string|null,skills:any[],setSkills:any) => {
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

  export const deleteProject = async (id: string,token:string|null,projects:any[],setProjects:any) => {
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

  export const deleteExperience = async (id: string,token:string|null,experience:any[],setExperience:any) => {
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

  export const deleteEducation = async (id: string,token:string|null,education:any[],setEducation:any) => {
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

  export const deleteAchievement = async (id: string,token:string|null,achievements:any[],setAchievements:any) => {
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