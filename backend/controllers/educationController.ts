import express from 'express';
import pool from '../config/db.ts';
import type { AuthRequest } from '../types/index.ts';

type Response = express.Response;

export const getMyEducation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to view education" });
      return;
    }

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
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to add education" });
      return;
    }

    const { institution, degree, start_year, end_year} = req.body;
    if (!institution || !degree || !start_year) {
      res.status(400).json({ error: "institution, degree and start_year are required" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO education (user_id, institution, degree, start_year, end_year) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [req.user.id, institution, degree, start_year , end_year || null,]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const putEducation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to upyear education" });
      return;
    }

    const { id } = req.params;
    const { institution, degree,start_year, end_year } = req.body;

    if (!institution || !degree ||  !start_year) {
      res.status(400).json({ error: "institution, degree and start_year are required" });
      return;
    }

    const result = await pool.query(
      "UPyear education SET institution=$1, degree=$2, start_year=$3, end_year=$4 WHERE id=$5 AND user_id=$6 RETURNING *",
      [institution, degree, start_year, end_year || null, id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot edit this education" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upyear education" });
  }
};

export const deleteEducation = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to delete education" });
      return;
    }

    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM education WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot delete this education" });
      return;
    }

    res.status(200).json({ message: "Education deleted", deleted: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete education" });
  }
};