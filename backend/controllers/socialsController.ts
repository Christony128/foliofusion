import express from 'express'
import pool from '../config/db.ts'
import type {AuthRequest} from '../types/index.ts'
type Response = express.Response;
export const getMySocials=async(req: AuthRequest, res: Response)=>{
    try{
    if(!(req.user)){
        res.status(401).json({error: "Must be signed in to view resumes"})
        return;
    }
    const userid=req.user.id
    const result=await pool.query(" select * from socials where user_id=$1",[userid])
    res.status(200).json(result.rows)
    }
    catch(err){
        res.status(500).json({error: "Failed to get logged in user info"})
    }
}
export const getSocials=async(req:AuthRequest, res: Response)=>{
    try{
        const userid=req.params.id
        const result=await pool.query("select * from socials where user_id=$1",[userid])
        res.status(200).json(result.rows)
    }
    catch(err){
        res.status(500).json({error: "Failed to get user socials"})
    }
}
export const postSocials = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: "Must be signed in to add socials" });
        return;
    }
    
    const userid = req.user.id;
    const { platform, url } = req.body;
    
    if (!platform || !url) {
        res.status(400).json({ error: "Both fields are required" });
        return;
    }
    
    try {
        const result = await pool.query(
            "INSERT INTO socials (user_id, platform, url) VALUES ($1, $2, $3) RETURNING *",
            [userid, platform, url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Add social error:", err);
        res.status(400).json({ error: "Failed to add social link" });
    }
}
export const putSocials = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Must be signed in to update socials" });
    return;
  }

  const { id } = req.params;
  const { platform, url } = req.body;

  if (!platform || !url) {
    res.status(400).json({ error: "Both fields required" });
    return;
  }

  try {
    const result = await pool.query(
      "UPDATE socials SET platform=$1, url=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
      [platform, url, id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot edit this social" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update social (wrong user)" });
  }
};
export const deleteSocials = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Must be signed in to delete socials" });
    return;
  }

  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM socials WHERE id=$1 AND user_id=$2 RETURNING *",[id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot delete this social (wrong user)" });
      return;
    }

    res.status(200).json({ message: "Social link deleted", deleted: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete social link" });
  }
};
