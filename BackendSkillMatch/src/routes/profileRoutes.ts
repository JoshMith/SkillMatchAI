import { deleteEmployerProfile, deleteJobSeekerProfile, getEmployerProfile, getJobSeekerProfile, upsertEmployerProfile, upsertJobSeekerProfile } from '@app/controllers/profileController'
import { protect } from '@app/middlewares/auth/protect'
import { admin_employerGuard, admin_job_seekerGuard, adminGuard, employerGuard, jobseekerGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.post("/employer", protect, admin_employerGuard, upsertEmployerProfile)
router.post("/jobseeker", protect, admin_job_seekerGuard, upsertJobSeekerProfile)
router.get("/jobseeker/:user_id", protect,  getJobSeekerProfile)
router.get("/employer/:user_id", protect,  getEmployerProfile)
router.delete("/employer/:user_id", protect, admin_employerGuard, deleteEmployerProfile)
router.delete("/jobseeker/:user_id", protect, admin_job_seekerGuard, deleteJobSeekerProfile)

export default router