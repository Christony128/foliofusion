import express from 'express'
import {protect} from '../middleware/authMiddleware.ts'
import asyncHandler from 'express-async-handler'
import {getMySocials, getSocials, postSocials,putSocials,deleteSocials} from '../controllers/socialsController.ts'
const router=express.Router()
//socials
router.get('/socials',protect,asyncHandler(getMySocials))
router.get('/socials/:id',asyncHandler(getSocials))
router.post('/socials',protect,asyncHandler(postSocials))
router.put('/socials/:id',protect,asyncHandler(putSocials))
router.delete('/socials/:id',protect,asyncHandler(deleteSocials))
//skills
router.get('/skills',protect,asyncHandler(getSocials))
router.get('/skills/:id',asyncHandler(getSocials))
router.post('/skills',protect,asyncHandler(getSocials))
router.put('/skills/:id',protect,asyncHandler(getSocials))
router.delete('/skills/:id',protect,asyncHandler(getSocials))
//projects
router.get('/projects',protect,asyncHandler(getSocials))
router.get('/projects/:id',asyncHandler(getSocials))
router.post('/projects',protect,asyncHandler(getSocials))
router.put('/projects/:id',protect,asyncHandler(getSocials))
router.delete('/projects/:id',protect,asyncHandler(getSocials))
//profiles
router.get('/profiles',protect,asyncHandler(getSocials))
router.get('/profiles/:id',asyncHandler(getSocials))
router.post('/profiles',protect,asyncHandler(getSocials))
router.put('/profiles/:id',protect,asyncHandler(getSocials))
router.delete('/profiles/:id',protect,asyncHandler(getSocials))
//experience
router.get('/experience',protect,asyncHandler(getSocials))
router.get('/experience/:id',asyncHandler(getSocials))
router.post('/experience',protect,asyncHandler(getSocials))
router.put('/experience/:id',protect,asyncHandler(getSocials))
router.delete('/experience/:id',protect,asyncHandler(getSocials))
//education
router.get('/education',protect,asyncHandler(getSocials))
router.get('/education/:id',asyncHandler(getSocials))
router.post('/education',protect,asyncHandler(getSocials))
router.put('/education/:id',protect,asyncHandler(getSocials))
router.delete('/education/:id',protect,asyncHandler(getSocials))
//achievements
router.get('/achievements',protect,asyncHandler(getSocials))
router.get('/achievements/:id',asyncHandler(getSocials))
router.post('/achievements',protect,asyncHandler(getSocials))
router.put('/achievements/:id',protect,asyncHandler(getSocials))
router.delete('/achievements/:id',protect,asyncHandler(getSocials))


export default router
