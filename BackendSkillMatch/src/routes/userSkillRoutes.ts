import { addUserSkill, deleteUserSkill, getUserSkills, updateUserSkill } from '@app/controllers/userSkillController'
import { protect } from '@app/middlewares/auth/protect'
import { admin_job_seekerGuard, adminGuard, employerGuard, jobseekerGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.get("/:user_id", protect, getUserSkills)
router.post("/", protect, admin_job_seekerGuard, addUserSkill)
router.put("/:id", protect, jobseekerGuard, updateUserSkill)
router.delete("/:id", protect, jobseekerGuard, deleteUserSkill)


export default router