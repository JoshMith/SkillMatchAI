import { deleteInterview, getApplicationsByCompanyId, getInterviewsByUserId, scheduleInterview, updateInterview } from '@app/controllers/interviewController'
import { protect } from '@app/middlewares/auth/protect'
import { admin_employerGuard, admin_job_seekerGuard, adminGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.post("/", protect, admin_employerGuard, scheduleInterview)
router.get("/:user_id", protect, admin_job_seekerGuard, getInterviewsByUserId)
router.get("/company-applications/:company_id", protect, admin_employerGuard, getApplicationsByCompanyId)
router.put("/:id", protect, admin_employerGuard, updateInterview)
router.delete("/:id", protect, adminGuard, deleteInterview)

export default router