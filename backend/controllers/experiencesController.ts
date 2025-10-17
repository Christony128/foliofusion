import express from 'express';
import pool from '../config/db.ts';
import type { AuthRequest } from '../types/index.ts';

type Response = express.Response;

export const getMyExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to view experiences" });
      return;
    }

    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM experience WHERE user_id=$1 ORDER BY start_date DESC", [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get experiences" });
  }
};

export const getExperience = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM experience WHERE user_id=$1 ORDER BY start_date DESC", [userId]);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user experiences" });
  }
};

export const postExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to add experience" });
      return;
    }

    const userId = req.user.id;
    const { company, role, start_date, end_date, description } = req.body;

    if (!company || !role || !start_date) {
      res.status(400).json({ error: "Company name, role, and start date are required" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO experience (user_id, company, role, start_date, end_date, description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [userId, company, role, start_date, end_date || null, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add experience" });
  }
};

export const putExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to update experience" });
      return;
    }

    const userId = req.user.id;
    const { id } = req.params;
    const { company, role, start_date, end_date, description } = req.body;

    if (!company || !role || !start_date) {
      res.status(400).json({ error: "Company name, role, and start date are required" });
      return;
    }

    const result = await pool.query(
      "UPDATE experience SET company=$1, role=$2, start_date=$3, end_date=$4, description=$5 WHERE id=$6 AND user_id=$7 RETURNING *",
      [company, role, start_date, end_date || null, description || null, id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot edit this experience (wrong user or id)" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update experience" });
  }
};

export const deleteExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to delete experience" });
      return;
    }

    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM experience WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot delete this experience (wrong user or id)" });
      return;
    }

    res.status(200).json({ message: "Experience deleted", deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete experience" });
  }
};