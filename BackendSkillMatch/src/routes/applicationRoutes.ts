import { addApplication, deleteApplication, getAllApplications,  getApplicationsByJobTitle, updateApplicationStatus } from '@app/controllers/applicationController'
import { protect } from '@app/middlewares/auth/protect'
import { admin_employerGuard, admin_job_seekerGuard, adminGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.post("/", protect, admin_job_seekerGuard, addApplication)
router.get("/title/:title", protect, admin_employerGuard, getApplicationsByJobTitle)
router.put("/:id", protect, admin_employerGuard, updateApplicationStatus)
router.delete("/:id", protect, adminGuard, deleteApplication)
router.get("/", protect, admin_employerGuard, getAllApplications)
export default router