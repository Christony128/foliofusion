import express from 'express'
import pool from '../config/db.ts'
import type {AuthRequest} from '../types/index.ts'
type Response = express.Response;
export const getMySkills=async(req: AuthRequest, res: Response)=>{
    try{
    if(!(req.user)){
        res.status(401).json({error: "Must be signed in to view resumes"})
        return;
    }
    const userid=req.user.id
    const result=await pool.query(" select * from skills where user_id=$1",[userid])
    res.status(200).json(result.rows)
    }
    catch(err){
        res.status(500).json({error: "Failed to get logged in user info"})
    }
}
export const getSkills=async(req:AuthRequest, res: Response)=>{
    try{
        const userid=req.params.id
        const result=await pool.query("select * from skills where user_id=$1",[userid])
        res.status(200).json(result.rows)
    }
    catch(err){
        res.status(500).json({error: "Failed to get user skills"})
    }
}
export const postSkills=async(req:AuthRequest, res: Response)=>{
    if(!(req.user)){
        res.status(401).json({error: "Must be signed in to add skills"})
        return;
    }
    const userid=req.user.id
    const {skill_name}=req.body
    if(!skill_name){
        res.status(400).json({error: "This field is required"})
        return;
    }
    try{
        const result=await pool.query("INSERT INTO skills (user_id,skill_name) VALUES ($1,$2) returning skill_name",[userid,skill_name])
        res.status(200).json({message: "Added row",added: result})
    }
    catch{
        res.status(400).json({error:"Failed to add skill"})
    }
}   
export const putSkills = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Must be signed in to update skills" });
    return;
  }

  const { id } = req.params;
  const {skill_name} = req.body;

  if (!skill_name) {
    res.status(400).json({ error: "This is a required field" });
    return;
  }

  try {
    const result = await pool.query(
      "UPDATE skills SET user_name=$1 WHERE id=$2 AND user_id=$3 RETURNING *",
      [skill_name, id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot edit this skill" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update skill (wrong user)" });
  }
};
export const deleteSkills = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Must be signed in to delete skills" });
    return;
  }

  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM skills WHERE id=$1 AND user_id=$2 RETURNING *",[id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot delete this skill (wrong user)" });
      return;
    }

    res.status(200).json({ message: "Skill deleted", deleted: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete skill" });
  }
};
