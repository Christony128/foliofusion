import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.ts";
import dotenv from "dotenv";
import type { AuthRequest } from "../types/index.ts";

dotenv.config();

type Response = express.Response;

export const findUser = async (req: AuthRequest, res: Response) => {
  try {
    const username = req.params.username;
    const result = await pool.query("select * from users where username = $1", [
      username,
    ]);
    if (result.rows.length === 0)
      res.status(404).json({ message: "User not found" });
    else {
      res.status(200).json(result.rows[0]);
    }
    return;
  } catch (err) {
    res.status(500).json("User doesnt exist");
  }
};
export const registerUser = async (req: AuthRequest, res: Response) => {
  try {
    const { username, password, email, biodata } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({ message: "Please add all required fields" });
      return;
    }

    const usernameExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (usernameExists.rows.length) {
      res
        .status(400)
        .json({ message: "User with this username already exists" });
      return;
    }

    const emailExists = await pool.query(
      "SELECT id,username,email,biodata,theme FROM users WHERE email = $1",
      [email]
    );
    if (emailExists.rows.length) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, password, email, biodata,theme) VALUES ($1, $2, $3, $4, $5) RETURNING id, username",
      [username, hashedPassword, email, biodata || null, "1"]
    );

    const id = newUser.rows[0].id;
    const token = generateToken(id);

    res.status(201).json({
      username: username,
      id: id,
      email: email,
      biodata: biodata,
      token: token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: AuthRequest, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Please add all required fields" });
      return;
    }

    const userExists = await pool.query(
      "SELECT id,username,password,email,biodata,theme FROM users WHERE username = $1",
      [username]
    );
    if (!userExists.rows.length) {
      res.status(400).json({ message: "Invalid user details" });
      return;
    }

    const passwordCheck = await bcrypt.compare(
      password,
      userExists.rows[0].password
    );
    if (!passwordCheck) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const user = userExists.rows[0];
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      biodata: user.biodata,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ]);

    if (!result.rows.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateHasResume = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ Error: "Invalid token" });
      return;
    }

    await pool.query("UPDATE users SET hasresume = true WHERE id = $1", [
      req.user.id,
    ]);
    res.json({ message: "Resume flag updated to true" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return;
    const userId = req.user.id;
    const { email, biodata } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await pool.query(
      `UPDATE users SET email=$1, biodata =$2 WHERE id = $3  RETURNING id, username, email, biodata`,
      [email, biodata, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const generateToken = (id: number): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT Secret not found");
    throw new Error("Server error");
  }
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};
