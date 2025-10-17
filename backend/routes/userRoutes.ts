import express from 'express';

import asyncHandler from 'express-async-handler';
import {registerUser,loginUser,getMe,updateHasResume,findUser} from '../controllers/userController.ts';
import {protect} from '../middleware/authMiddleware.ts'
const router=express.Router();
router.post('/',asyncHandler(registerUser));
router.post('/login',asyncHandler(loginUser));
router.get('/me',protect,asyncHandler(getMe));
router.get('/:username',asyncHandler(findUser));
router.put('/updateHasResume',protect,asyncHandler(updateHasResume))
export default router;