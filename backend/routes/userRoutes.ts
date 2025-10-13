import express from 'express';

import asyncHandler from 'express-async-handler';
import {registerUser,loginUser,getMe} from '../controllers/userController.ts';
import {protect} from '../middleware/authMiddleware.ts'
const router=express.Router();
router.post('/',asyncHandler(registerUser));
router.post('/login',asyncHandler(loginUser));
router.get('/me',protect,asyncHandler(getMe));
export default router;