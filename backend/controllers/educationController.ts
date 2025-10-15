import express from 'express';
import pool from '../config/db.ts';
import type { AuthRequest } from '../types/index.ts';

type Response = express.Response;

export const getMyEducation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Must be signed in to view education" });

    const result = await pool.query("SELECT * FROM education WHERE user_id=$1", [req.user.id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch education" });
  }
};

export const getEducation = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM education WHERE user_id=$1", [userId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user education" });
  }
};

export const postEducation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Must be signed in to add education" });

    const { institution, degree, field_of_study, start_date, end_date, grade, description } = req.body;
    if (!institution || !degree || !field_of_study || !start_date) {
      return res.status(400).json({ error: "institution, degree, field_of_study and start_date are required" });
    }

    const result = await pool.query(
      "INSERT INTO education (user_id, institution, degree, field_of_study, start_date, end_date, grade, description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [req.user.id, institution, degree, field_of_study, start_date, end_date || null, grade || null, description || null]
    );

    res.status(200).json({ message: "Education added", education: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add education" });
  }
};
export const putEducation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Must be signed in to update education" });

    const { id } = req.params;
    const { institution, degree, field_of_study, start_date, end_date, grade, description } = req.body;

    if (!institution || !degree || !field_of_study || !start_date) {
      return res.status(400).json({ error: "institution, degree, field_of_study and start_date are required" });
    }

    const result = await pool.query(
      "UPDATE education SET institution=$1, degree=$2, field_of_study=$3, start_date=$4, end_date=$5, grade=$6, description=$7 WHERE id=$8 AND user_id=$9 RETURNING *",
      [institution, degree, field_of_study, start_date, end_date || null, grade || null, description || null, id, req.user.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Cannot edit this education" });

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update education" });
  }
};
export const deleteEducation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Must be signed in to delete education" });

    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM education WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Cannot delete this education" });

    res.status(200).json({ message: "Education deleted", deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete education" });
  }
};
