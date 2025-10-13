import express from 'express';
type Request=express.Request;
export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}