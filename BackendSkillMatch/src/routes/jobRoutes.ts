import { createJob, deleteJob, getAllJobs, getJobById, getJobByTitle, updateJob } from '@app/controllers/jobController'
import { protect } from '@app/middlewares/auth/protect'
import { admin_employerGuard, adminGuard, employerGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.post("/", protect, admin_employerGuard, createJob)
router.get("/", getAllJobs)
router.get("/:job_id", protect, getJobById)
router.get("/title/:title", protect, getJobByTitle)
router.put("/:job_id", protect, admin_employerGuard, updateJob)
router.delete("/:job_id", protect, adminGuard, deleteJob)

export default router