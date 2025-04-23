import { addCV, deleteCV, getCVsByUserId, updateCV } from '@app/controllers/cvController'
import { protect } from '@app/middlewares/auth/protect'
import { adminGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.post("/", protect, addCV)
router.get("/:user_id", protect, getCVsByUserId)
router.put("/:id", protect, updateCV)
router.delete("/:id", protect, deleteCV)

export default router