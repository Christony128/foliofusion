import express from 'express';
import pool from '../config/db.ts';
import type { AuthRequest } from '../types/index.ts';

type Response = express.Response;

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to view profile" });
    }

    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
export const postProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to create profile" });
    }

    const userId = req.user.id;
    const { name, title, bio, profile_image } = req.body;

    if (!name || !title) {
      return res.status(400).json({ error: "Name and title are required" });
    }
    const existing = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    const result = await pool.query(
      "INSERT INTO profiles (user_id, name, title, bio, profile_image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, name, title, bio || null, profile_image || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create profile" });
  }
};
export const putProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to update profile" });
    }

    const userId = req.user.id;
    const { name, title, bio, profile_image } = req.body;

    if (!name || !title) {
      return res.status(400).json({ error: "Name and title are required" });
    }

    const result = await pool.query(
      "UPDATE profiles SET name=$1, title=$2, bio=$3, profile_image=$4 WHERE user_id=$5 RETURNING *",
      [name, title, bio || null, profile_image || null, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const deleteProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Must be signed in to delete profile" });
    }

    const userId = req.user.id;
    const result = await pool.query(
      "DELETE FROM profiles WHERE user_id=$1 RETURNING *",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted", deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete profile" });
  }
};
