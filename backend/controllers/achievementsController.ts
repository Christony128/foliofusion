import express from 'express';
import pool from '../config/db.ts';
import type { AuthRequest } from '../types/index.ts';

type Response = express.Response;

export const getMyAchievements = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to view achievements" });
      return;
    }

    const result = await pool.query("SELECT * FROM achievements WHERE user_id=$1", [req.user.id]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
};

export const getAchievements = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM achievements WHERE user_id=$1", [userId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user achievements" });
  }
};

export const postAchievements = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to add achievements" });
      return;
    }

    const { title, description, date } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO achievements (user_id, title, description, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, title, description || null, date || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add achievement" });
  }
};

export const putAchievements = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to update achievements" });
      return;
    }

    const { id } = req.params;
    const { title, description, date } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const result = await pool.query(
      "UPDATE achievements SET title=$1, description=$2, date=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [title, description || null, date || null, id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot edit this achievement" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update achievement" });
  }
};

export const deleteAchievements = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to delete achievements" });
      return;
    }

    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM achievements WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot delete this achievement" });
      return;
    }

    res.status(200).json({ message: "Achievement deleted", deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete achievement" });
  }
};