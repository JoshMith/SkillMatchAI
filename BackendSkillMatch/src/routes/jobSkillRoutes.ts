import { addJobSkill, deleteJobSkill, getJobsBySkillName, getJobSkillsByJobName, updateJobSkill } from '@app/controllers/jobSkillController'
import { protect } from '@app/middlewares/auth/protect'
import { adminGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.post("/", protect, addJobSkill)
router.put("/:id", protect, adminGuard, updateJobSkill)
router.delete("/:id", protect, adminGuard, deleteJobSkill)
router.get("/job-skills/:job_name", protect, getJobSkillsByJobName)
router.get("/skill-jobs/:skill_name", protect, getJobsBySkillName)

export default router