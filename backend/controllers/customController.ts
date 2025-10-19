import express from "express";
import pool from "../config/db.ts";
import type { AuthRequest } from "../types";

type Response = express.Response;

export const getMyCustoms = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await pool.query(
      "SELECT * FROM custom_sections WHERE user_id = $1;",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get custom sections error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addCustom = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { title, content } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const result = await pool.query(
      "INSERT INTO custom_sections (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, title, content || { text: "" }]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Add custom section error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCustom = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM custom_sections WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Custom section not found" });
      return;
    }

    res.json({ message: "Custom section deleted successfully" });
  } catch (error) {
    console.error("Delete custom section error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const findCustoms = async (req: AuthRequest, res: Response) => {
  const userid = req.params.userid;
  try {
    const result = await pool.query(
      "select * from custom_sections where user_id=$1",
      [userid]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal Network Error occured" });
    return;
  }
};
