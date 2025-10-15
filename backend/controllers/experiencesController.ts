import express from 'express';
import pool from '../config/db.ts';
import type { AuthRequest } from '../types/index.ts';

type Response = express.Response;

// Get all experiences of logged-in user
export const getMyExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to view experiences" });
    }

    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM experience WHERE user_id=$1 ORDER BY start_date DESC", [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get experiences" });
  }
};

// Get experiences of a specific user by user id
export const getExperience = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM experience WHERE user_id=$1 ORDER BY start_date DESC", [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user experiences" });
  }
};

// Add a new experience
export const postExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to add experience" });
    }

    const userId = req.user.id;
    const { company_name, role, start_date, end_date, description } = req.body;

    if (!company_name || !role || !start_date) {
      return res.status(400).json({ error: "Company name, role, and start date are required" });
    }

    const result = await pool.query(
      "INSERT INTO experience (user_id, company_name, role, start_date, end_date, description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [userId, company_name, role, start_date, end_date || null, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add experience" });
  }
};

// Update an existing experience
export const putExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to update experience" });
    }

    const userId = req.user.id;
    const { id } = req.params;
    const { company_name, role, start_date, end_date, description } = req.body;

    if (!company_name || !role || !start_date) {
      return res.status(400).json({ error: "Company name, role, and start date are required" });
    }

    const result = await pool.query(
      "UPDATE experience SET company_name=$1, role=$2, start_date=$3, end_date=$4, description=$5 WHERE id=$6 AND user_id=$7 RETURNING *",
      [company_name, role, start_date, end_date || null, description || null, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cannot edit this experience (wrong user or id)" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update experience" });
  }
};

// Delete an experience
export const deleteExperience = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to delete experience" });
    }

    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM experience WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cannot delete this experience (wrong user or id)" });
    }

    res.status(200).json({ message: "Experience deleted", deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete experience" });
  }
};
