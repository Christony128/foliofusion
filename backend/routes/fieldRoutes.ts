import express from 'express'
import {protect} from '../middleware/authMiddleware.ts'
import asyncHandler from 'express-async-handler'
import {getMySocials, getSocials, postSocials,putSocials,deleteSocials} from '../controllers/socialsController.ts'
import {getMySkills, getSkills, postSkills,putSkills,deleteSkills} from '../controllers/skillsController.ts'
import {getMyProjects, getProjects, postProjects,putProjects,deleteProjects} from '../controllers/projectsController.ts'
import {getMyExperience, getExperience, postExperience,putExperience,deleteExperience} from '../controllers/experiencesController.ts'
import {getMyEducation, getEducation, postEducation,putEducation,deleteEducation} from '../controllers/educationController.ts'
import {getMyAchievements, getAchievements, postAchievements,putAchievements,deleteAchievements} from '../controllers/achievementsController.ts'
const router=express.Router()
//socials
router.get('/socials',protect,asyncHandler(getMySocials))
router.get('/socials/:id',asyncHandler(getSocials))
router.post('/socials',protect,asyncHandler(postSocials))
router.put('/socials/:id',protect,asyncHandler(putSocials))
router.delete('/socials/:id',protect,asyncHandler(deleteSocials))
//skills
router.get('/skills',protect,asyncHandler(getMySkills))
router.get('/skills/:id',asyncHandler(getSkills))
router.post('/skills',protect,asyncHandler(postSkills))
router.put('/skills/:id',protect,asyncHandler(putSkills))
router.delete('/skills/:id',protect,asyncHandler(deleteSkills))
//projects
router.get('/projects',protect,asyncHandler(getMyProjects))
router.get('/projects/:id',asyncHandler(getProjects))
router.post('/projects',protect,asyncHandler(postProjects))
router.put('/projects/:id',protect,asyncHandler(putProjects))
router.delete('/projects/:id',protect,asyncHandler(deleteProjects))
//experience
router.get('/experience',protect,asyncHandler(getMyExperience))
router.get('/experience/:id',asyncHandler(getExperience))
router.post('/experience',protect,asyncHandler(postExperience))
router.put('/experience/:id',protect,asyncHandler(putExperience))
router.delete('/experience/:id',protect,asyncHandler(deleteExperience))
//education
router.get('/education',protect,asyncHandler(getMyEducation))
router.get('/education/:id',asyncHandler(getEducation))
router.post('/education',protect,asyncHandler(postEducation))
router.put('/education/:id',protect,asyncHandler(putEducation))
router.delete('/education/:id',protect,asyncHandler(deleteEducation))
//achievements
router.get('/achievements',protect,asyncHandler(getMyAchievements))
router.get('/achievements/:id',asyncHandler(getAchievements))
router.post('/achievements',protect,asyncHandler(postAchievements))
router.put('/achievements/:id',protect,asyncHandler(putAchievements))
router.delete('/achievements/:id',protect,asyncHandler(deleteAchievements))


export default router
