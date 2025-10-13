import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.ts';
import dotenv from 'dotenv';
import type {AuthRequest} from '../types/index.ts'

dotenv.config();

type Response = express.Response;

export const registerUser = async (req: AuthRequest, res: Response) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            res.status(400).json({ message: "Please add all required fields" });
            return;
        }

        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userExists.rows.length) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
            [username, hashedPassword]
        );
        
        const id = newUser.rows[0].id;
        const token = generateToken(id);
        
        res.status(201).json({
            username: username,
            id: id,
            token: token
        });
        
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginUser = async (req: AuthRequest, res: Response) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            res.status(400).json({ message: "Please add all required fields" });
            return;
        }
        
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (!userExists.rows.length) {
            res.status(400).json({ message: "Invalid user details" });
            return;
        }
        
        const passwordCheck = await bcrypt.compare(password, userExists.rows[0].password);
        if (!passwordCheck) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        
        const user = userExists.rows[0];
        res.status(200).json({ 
            id: user.id, 
            username: user.username, 
            token: generateToken(user.id) 
        });
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }

        const result = await pool.query(
            "SELECT id, username FROM users WHERE id = $1", 
            [req.user.id]
        );
        
        if (!result.rows.length) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const { id, username} = result.rows[0];
        res.status(200).json({ id, username });
        
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const generateToken = (id: number): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT Secret not found");
        throw new Error("Server error");
    }

    return jwt.sign({ id }, secret, { expiresIn: '30d' });
}