import express from "express";
import pool from "../config/db.ts";
import type { AuthRequest } from "../types/index.ts";

type Response = express.Response;

export const getMyProjects = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to view projects" });
      return;
    }

    const userId = req.user.id;
    const result = await pool.query("SELECT * FROM projects WHERE user_id=$1", [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get projects" });
  }
};
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM projects WHERE user_id=$1", [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get projects" });
  }
};
export const postProjects = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to add projects" });
      return;
    }

    const userId = req.user.id;
    const { title, description, project_url, repo_url, tech_stack } = req.body;
    console.log(req.body);

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO projects (user_id, title, description, project_url, repo_url, tech_stack) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [req.user.id, title, description, project_url, repo_url, tech_stack]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add project" });
  }
};
export const putProjects = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to update projects" });
      return;
    }

    const { id } = req.params;
    const { title, description, project_url, repo_url, tech_stack } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const result = await pool.query(
      `UPDATE projects
       SET title=$1, description=$2, project_url=$3, repo_url=$4, tech_stack=$5
       WHERE id=$6 AND user_id=$7
       RETURNING *`,
      [title, description, project_url, repo_url, tech_stack, id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot edit this project" });
      return;
    }

    res.status(200).json({ message: "Project updated", project: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
};
export const deleteProjects = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Must be signed in to delete projects" });
      return;
    }

    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM projects WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cannot delete this project" });
      return;
    }

    res.status(200).json({ message: "Project deleted", project: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
