import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import express from "express";
import pool from "../config/db.ts";
import type { AuthRequest } from "../types/index.ts";
type Response = express.Response;
export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        if (!process.env.JWT_SECRET) {
          res.status(400);
          throw new Error("jwt secret doesnt exist");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "string") {
          res.status(400);
          throw new Error("Invalid token payload");
        }
        const user = await pool.query(
          "select id,username from users where id=$1",
          [decoded.id]
        );
        req.user = user.rows[0];
        console.log("Token:", token);
        console.log("Decoded:", decoded);
        console.log("User from DB:", user.rows[0]);
        next();
      } catch (err) {
        console.log(err);
        res.status(401);
        throw new Error("Not authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
